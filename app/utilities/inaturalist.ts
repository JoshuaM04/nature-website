import type { CardItem } from '../components/card';

const ENDPOINT = 'https://api.inaturalist.org/v1/posts';
const STORY_COUNT = 10;

/* iNaturalist returns a bare array here, not the { results } envelope
   the rest of its v1 endpoints use. */
interface Post {
    id: number;
    title: string;
    body: string | null;
    published_at: string;
    parent_type: string;
    user: { login: string } | null;
    parent: { name: string } | null;
}

/* Topics are matched against the headline only. Matching the body as well
   tags nearly every story with nearly every topic, which makes the filter
   useless. */
const topics = [
    { label: 'app', pattern: /\b(app|apps|iphone|android|mobile)\b/i },
    { label: 'identification', pattern: /\b(identif\w*|computer vision|geomodel|taxonom\w*|species)\b/i },
    { label: 'photography', pattern: /\b(photo\w*|camera|lens|sound|audio)\b/i },
    { label: 'projects', pattern: /\b(projects?|collections?)\b/i },
    { label: 'community', pattern: /\b(team|members?|community|profile|volunteers?|forum)\b/i },
    { label: 'guidelines', pattern: /\b(guidelines?|polic\w*|moderat\w*|suspensions?|licen\w*)\b/i }
];

const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
    '&mdash;': '\u2014',
    '&ndash;': '\u2013',
    '&hellip;': '\u2026'
};

export function stripMarkup(html: string) {
    return html
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&[a-z#0-9]+;/gi, (match) => entities[match.toLowerCase()] ?? ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export function excerpt(text: string, limit = 180) {
    if (text.length <= limit) {
        return text;
    }

    const clipped = text.slice(0, limit);
    const lastSpace = clipped.lastIndexOf(' ');

    return `${clipped.slice(0, lastSpace > 0 ? lastSpace : limit).replace(/[,.;:\u2014-]+$/, '')}\u2026`;
}

export function firstImage(html: string) {
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);

    return match && /^https?:\/\//i.test(match[1]) ? match[1] : undefined;
}

export function labelsFor(title: string) {
    const matched = topics.filter((topic) => topic.pattern.test(title)).map((topic) => topic.label);

    return matched.length > 0 ? matched : ['announcements'];
}

function publishedOn(timestamp: string) {
    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
        return 'Undated';
    }

    /* Formatted on the server and passed down as a string, so the client
       never recomputes it against a different timezone. */
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
    }).toUpperCase();
}

function storyLink(post: Post) {
    return post.parent_type === 'Site'
        ? `https://www.inaturalist.org/blog/${post.id}`
        : `https://www.inaturalist.org/posts/${post.id}`;
}

export function normalizePost(post: Post, index: number): CardItem {
    const body = stripMarkup(post.body ?? '');

    return {
        title: post.title,
        subtitle: post.parent?.name ?? (post.user ? `@${post.user.login}` : 'iNaturalist'),
        number: `NO. ${String(index + 1).padStart(2, '0')}`,
        status: 'NEWS',
        image: firstImage(post.body ?? ''),
        href: storyLink(post),
        body: excerpt(body) || 'No summary available for this story.',
        labels: labelsFor(post.title),
        range: publishedOn(post.published_at)
    };
}

/* Reads the newest journal posts from iNaturalist. Cached for an hour so a
   page view does not cost a round trip, and never allowed to take the page
   down with it when the API is unreachable. */
export async function fetchStories(): Promise<Array<CardItem>> {
    try {
        const response = await fetch(`${ENDPOINT}?per_page=${STORY_COUNT}`, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Understory field guide (https://github.com/nature-website)'
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.error(`iNaturalist responded ${response.status}`);
            return [];
        }

        const posts: Array<Post> = await response.json();

        return Array.isArray(posts) ? posts.map(normalizePost) : [];
    } catch (error) {
        console.error('Could not reach iNaturalist', error);
        return [];
    }
}

/* The chips are built from the topics actually present in the stories that
   came back, so the filter never offers an option that matches nothing. */
export function topicsFrom(stories: Array<CardItem>) {
    const present = new Set(stories.flatMap((story) => story.labels));

    return ['ALL', ...Array.from(present).sort().map((label) => label.toUpperCase())];
}
