import type { GalleryItem } from '../components/gallery';

const ENDPOINT = 'https://commons.wikimedia.org/w/api.php';

/* Wikimedia asks that clients identify themselves and where to complain. */
const agent = 'UnderstoryFieldGuide/1.0 (https://github.com/JoshuaM04/nature-website)';

const candidates = 25;
const perBiome = 3;
const thumbnailWidth = 1200;
const threeYears = 3 * 365 * 24 * 60 * 60 * 1000;

interface Metadata {
    value: string;
}

interface Page {
    title: string;
    imageinfo?: Array<{
        timestamp: string;
        thumburl?: string;
        descriptionurl: string;
        extmetadata?: Record<string, Metadata | undefined>;
    }>;
}

/* Commons keeps human-reviewed categories of its quality images, which is a
   far better filter than a keyword: searching "ocean" turns up warships and
   a bench, while the category holds photographs of the sea. Every ground
   named here was checked to have files sitting in it directly. */
const biomes = [
    { label: 'ocean', category: 'Quality images of oceans and seas' },
    { label: 'coast', category: 'Quality images of coasts' },
    { label: 'mountains', category: 'Quality images of mountains' },
    { label: 'valley', category: 'Quality images of valleys' },
    { label: 'canyon', category: 'Quality images of canyons' },
    { label: 'river', category: 'Quality images of rivers' },
    { label: 'lake', category: 'Quality images of lakes' },
    { label: 'waterfall', category: 'Quality images of waterfalls' },
    { label: 'forest', category: 'Quality images of forests' },
    { label: 'desert', category: 'Quality images of dunes' },
    { label: 'glacier', category: 'Quality images of glaciers' },
    { label: 'volcano', category: 'Quality images of volcanism' }
];

function strip(value: string | undefined) {
    return String(value ?? '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}

function clip(text: string, limit: number) {
    return text.length <= limit ? text : `${text.slice(0, limit - 1).trimEnd()}\u2026`;
}

function read(page: Page, field: string) {
    return strip(page.imageinfo?.[0]?.extmetadata?.[field]?.value);
}

function photographer(page: Page) {
    return clip(read(page, 'Artist') || 'Unknown', 18);
}

function plateName(page: Page) {
    const named = read(page, 'ObjectName');
    const filename = page.title.replace(/^File:/, '').replace(/\.[a-z0-9]+$/i, '').replace(/_/g, ' ');

    return clip(named || filename, 32) || 'Untitled';
}

/* The stamp carries the credit the licence asks for: who took it, and under
   what terms. The plate links to the Commons page, where both are set out in
   full alongside the photographer's other work. */
function plateStamp(page: Page) {
    return `${photographer(page)}, ${read(page, 'LicenseShortName') || 'See source'}`;
}

export function normalizePage(page: Page, label: string, index: number): GalleryItem {
    const info = page.imageinfo![0];

    return {
        title: plateName(page),
        number: `PL. ${String(index + 1).padStart(2, '0')}`,
        image: info.thumburl ?? '',
        stamp: plateStamp(page),
        href: info.descriptionurl,
        labels: [label]
    };
}

/* Sorted by creation time rather than by when a file joined the category. The
   two drift apart badly: the newest additions to the lake category include
   photographs uploaded a decade ago. */
async function search(category: string): Promise<Array<Page>> {
    const query = new URLSearchParams({
        action: 'query',
        format: 'json',
        generator: 'search',
        gsrsearch: `incategory:"${category.replace(/ /g, '_')}"`,
        gsrnamespace: '6',
        gsrlimit: String(candidates),
        gsrsort: 'create_timestamp_desc',
        prop: 'imageinfo',
        iiprop: 'url|timestamp|extmetadata',
        iiurlwidth: String(thumbnailWidth)
    });

    const response = await fetch(`${ENDPOINT}?${query}`, {
        headers: { 'Accept': 'application/json', 'User-Agent': agent },
        /* Six hours. Photographs date far more slowly than news does. */
        next: { revalidate: 21600 }
    });

    if (!response.ok) {
        throw new Error(`Commons responded ${response.status}`);
    }

    const body = await response.json();

    return Object.values(body?.query?.pages ?? {});
}

function shot(page: Page) {
    const info = page.imageinfo?.[0];

    return info && info.thumburl && info.descriptionurl
        ? Date.parse(info.timestamp)
        : Number.NaN;
}

/* A single photographer can hold most of a category's recent entries, often
   as a run of near-identical frames. Sorting a plate by somebody new to the
   front keeps the wall varied, and the stem of a title catches the runs: three
   shots of the same Komodo sunset differ only in the serial on the end. */
function stem(page: Page) {
    return plateName(page).toLowerCase().replace(/[^a-z ]/g, '').replace(/s+/g, ' ').trim().slice(0, 18);
}

function ordered(pages: Array<Page>) {
    const credited = new Set<string>();
    const fresh: Array<Page> = [];
    const spare: Array<Page> = [];

    for (const page of pages) {
        const artist = photographer(page);

        (credited.has(artist) ? spare : fresh).push(page);
        credited.add(artist);
    }

    return [...fresh, ...spare];
}

export async function fetchPlates(): Promise<Array<GalleryItem>> {
    const cutoff = Date.now() - threeYears;
    const searches = await Promise.allSettled(biomes.map((biome) => search(biome.category)));

    const plates: Array<GalleryItem> = [];
    const files = new Set<string>();
    const stems = new Set<string>();

    searches.forEach((result, index) => {
        const biome = biomes[index];

        if (result.status === 'rejected') {
            console.error(`Could not read ${biome.label} plates`, result.reason);
            return;
        }

        /* Nothing older than three years reaches the page. */
        const recent = result.value.filter((page) => shot(page) >= cutoff);

        let kept = 0;

        for (const page of ordered(recent)) {
            if (kept === perBiome) {
                break;
            }

            /* Both guards are shared across grounds, so one river running
               through a forest cannot be plated twice. */
            if (files.has(page.title) || stems.has(stem(page))) {
                continue;
            }

            files.add(page.title);
            stems.add(stem(page));
            plates.push(normalizePage(page, biome.label, plates.length));
            kept = kept + 1;
        }
    });

    return plates;
}

/* Built from the grounds that actually returned plates, so the filter never
   offers one with nothing standing on it. */
export function biomesFrom(plates: Array<GalleryItem>) {
    const present = new Set(plates.flatMap((plate) => plate.labels));

    return ['ALL', ...biomes
        .map((biome) => biome.label)
        .filter((label) => present.has(label))
        .map((label) => label.toUpperCase())];
}
