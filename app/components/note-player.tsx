'use client';
import { useRef, useState } from 'react';
import type { Cue } from '../utilities/captions';
import { timecode } from '../utilities/captions';

interface NotePlayerProps {
    video: string;
    fallback?: string;
    captions: string;
    poster: string;
    title: string;
    cues: Array<Cue>;
    chapters: Array<{ at: number; label: string }>;
}

export default function NotePlayer({video, fallback, captions, poster, title, cues, chapters}: NotePlayerProps) {
    const player = useRef<HTMLVideoElement>(null);
    const [at, setAt] = useState(0);

    /* The transcript follows the tape rather than the other way round, so the
       line under the playhead is the one the reader is looking at. */
    const running = (cue: Cue) => at >= cue.start && at < Math.max(cue.end, cue.start + 0.5);

    const currentChapter = chapters.reduce(
        (found, chapter, index) => (at >= chapter.at ? index : found),
        -1
    );

    const seek = (seconds: number) => {
        const element = player.current;

        if (element) {
            element.currentTime = seconds;
            void element.play();
        }
    };

    return (
        <div className="flex flex-col gap-10">
            <video
                ref={player}
                className="w-full bg-night"
                poster={poster}
                controls
                preload="metadata"
                onTimeUpdate={(event) => setAt(event.currentTarget.currentTime)}>
                <source src={video} type="video/mp4" />
                {fallback && <source src={fallback} type="video/ogg" />}
                <track src={captions} kind="captions" srcLang="en" label="English captions" default />
                {title}
            </video>

            {
                chapters.length > 0 && (
                    <section className="flex flex-col gap-3">
                        <h2 className="eyebrow rule-above pt-3">Chapters</h2>

                        <ul className="flex flex-col">
                            {
                                chapters.map((chapter, index) => (
                                    <li key={chapter.at}>
                                        <button
                                            onClick={() => seek(chapter.at)}
                                            className="data-row flex justify-between items-baseline gap-5 py-3 w-full text-left">
                                            <span className="flex items-baseline gap-5">
                                                <span className="quiet-note">{timecode(chapter.at)}</span>
                                                <span className={index === currentChapter ? 'sub-heading' : 'body-text'}>
                                                    {chapter.label}
                                                </span>
                                            </span>

                                            <span className={`count-note ${index === currentChapter ? '' : 'invisible'}`}>
                                                Now
                                            </span>
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                )
            }

            {
                cues.length > 0 && (
                    <section className="border border-rule">
                        <header className="data-row flex justify-between items-baseline gap-5 p-5">
                            <h2 className="eyebrow">Transcript</h2>
                            <p className="quiet-note">EN captions</p>
                        </header>

                        <ul className="flex flex-col p-2">
                            {
                                cues.map((cue) => (
                                    <li key={`${cue.start}-${cue.text}`}>
                                        <button
                                            onClick={() => seek(cue.start)}
                                            className={`flex items-baseline gap-5 py-3 pr-3 pl-4 w-full text-left border-l-2 ${running(cue) ? 'border-canopy bg-surface' : 'border-transparent'}`}>
                                            <span className="quiet-note">{timecode(cue.start)}</span>

                                            <span className="body-text">
                                                {cue.speaker && <span className="eyebrow mr-2">{cue.speaker}</span>}
                                                {cue.text}
                                            </span>
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                )
            }
        </div>
    );
}
