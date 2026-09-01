import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fieldData } from './data';
import { parseCues } from './captions';

export interface FieldNote {
    slug: string;
    title: string;
    subtitle: string;
    number: string;
    image: string;
    body: string;
    labels: Array<string>;
    time: string;
    video: string;
    fallback?: string;
    captions: string;
}

export const notes = fieldData as Array<FieldNote>;

export function noteBySlug(slug: string) {
    return notes.find((note) => note.slug === slug);
}

/* The captions are the only record of what is on the tape, so the transcript
   is read back out of them rather than kept beside them. The two cannot drift
   apart because there is only ever one of them. */
export async function readCues(note: FieldNote) {
    try {
        const file = path.join(process.cwd(), 'public', note.captions.replace(/^\//, ''));

        return parseCues(await readFile(file, 'utf8'));
    } catch (error) {
        console.error(`Could not read captions for ${note.slug}`, error);
        return [];
    }
}

/* The stated length of a clip drifts from the clip itself the moment either is
   edited, so it is read out of the file. An MP4 keeps its duration and the
   timescale to divide it by in the mvhd atom inside moov. */
function findAtom(file: Buffer, name: string, from: number, to: number) {
    let at = from;

    while (at + 8 <= to) {
        const size = file.readUInt32BE(at);

        if (file.toString('latin1', at + 4, at + 8) === name) {
            return { start: at + 8, end: at + (size || to - at) };
        }

        if (size < 8) {
            break;
        }

        at = at + size;
    }

    return undefined;
}

export async function readDuration(note: FieldNote) {
    try {
        const file = await readFile(path.join(process.cwd(), 'public', note.video.replace(/^\//, '')));
        const moov = findAtom(file, 'moov', 0, file.length);
        const mvhd = moov && findAtom(file, 'mvhd', moov.start, moov.end);

        if (!mvhd) {
            return 0;
        }

        const version = file.readUInt8(mvhd.start);
        const timescale = file.readUInt32BE(mvhd.start + (version === 1 ? 20 : 12));
        const ticks = version === 1
            ? Number(file.readBigUInt64BE(mvhd.start + 24))
            : file.readUInt32BE(mvhd.start + 16);

        return timescale > 0 ? ticks / timescale : 0;
    } catch (error) {
        console.error(`Could not read the length of ${note.slug}`, error);
        return 0;
    }
}
