export interface Cue {
    start: number;
    end: number;
    /* A cue carrying an identifier opens a chapter, and the identifier is its
       title. Everything else is an ordinary line of the transcript. */
    chapter?: string;
    speaker?: string;
    text: string;
}

export function timecode(seconds: number) {
    const whole = Math.max(0, Math.floor(seconds));

    return `${String(Math.floor(whole / 60)).padStart(2, '0')}:${String(whole % 60).padStart(2, '0')}`;
}

function toSeconds(stamp: string) {
    const parts = stamp.trim().replace(',', '.').split(':').map(Number);

    if (parts.some(Number.isNaN)) {
        return Number.NaN;
    }

    /* WebVTT allows the hour to be left off. */
    const [hours, minutes, seconds] = parts.length === 3 ? parts : [0, ...parts];

    return hours * 3600 + minutes * 60 + seconds;
}

/* WebVTT marks who is speaking with a voice span. A line without one is
   non-speech audio, which in a field recording is most of them. */
function readVoice(line: string) {
    const spoken = line.match(/^<v\s+([^>]+)>([\s\S]*?)(?:<\/v>)?$/i);

    return spoken
        ? { speaker: spoken[1].trim(), text: spoken[2].trim() }
        : { speaker: undefined, text: line };
}

export function parseCues(vtt: string): Array<Cue> {
    return vtt
        .replace(/^\uFEFF/, '')
        .replace(/\r\n/g, '\n')
        .split(/\n{2,}/)
        .map((block) => block.trim())
        .filter((block) => block && !/^WEBVTT/i.test(block) && !/^NOTE\b/i.test(block))
        .flatMap((block) => {
            const lines = block.split('\n');
            const timing = lines.findIndex((line) => line.includes('-->'));

            if (timing < 0) {
                return [];
            }

            const [opens, closes] = lines[timing].split('-->');
            const start = toSeconds(opens);
            const end = toSeconds((closes ?? '').trim().split(/\s+/)[0] ?? '');
            const { speaker, text } = readVoice(lines.slice(timing + 1).join(' ').trim());

            if (Number.isNaN(start) || !text) {
                return [];
            }

            const identifier = lines.slice(0, timing).join(' ').trim();

            return [{
                start,
                end: Number.isNaN(end) ? start : end,
                chapter: identifier || undefined,
                speaker,
                text
            }];
        });
}

export function chaptersFrom(cues: Array<Cue>) {
    return cues
        .filter((cue) => cue.chapter)
        .map((cue) => ({ at: cue.start, label: cue.chapter as string }));
}

export function runtime(seconds: number) {
    const whole = Math.round(seconds);

    if (whole < 60) {
        return `${whole} s`;
    }

    return `${Math.floor(whole / 60)} min ${String(whole % 60).padStart(2, '0')} s`;
}
