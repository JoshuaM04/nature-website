import { notFound } from 'next/navigation';
import Link from 'next/link';
import NotePlayer from '../../../components/note-player';
import { Band } from '../../../components/band';
import Flourish from '../../../components/flourish';
import { notes, noteBySlug, readCues, readDuration } from '../../../utilities/fieldnotes';
import { chaptersFrom, runtime } from '../../../utilities/captions';

export function generateStaticParams() {
    return notes.map((note) => ({ slug: note.slug }));
}

export default async function FieldNote(props: PageProps<'/pages/fieldnotes/[slug]'>) {
    const { slug } = await props.params;
    const note = noteBySlug(slug);

    if (!note) {
        notFound();
    }

    const [cues, length] = await Promise.all([readCues(note), readDuration(note)]);
    const chapters = chaptersFrom(cues);

    const meta = [
        length > 0 ? runtime(length) : note.time,
        cues.length > 0 ? 'Captions EN' : 'No captions',
        `${chapters.length} ${chapters.length === 1 ? 'chapter' : 'chapters'}`
    ];

    return (
        <div className="flex flex-col w-full">
            <Band tone="green">
                <div className="centred-block flex flex-col items-center gap-5">
                    <Flourish />

                    <p className="eyebrow">{note.number} &middot; {note.subtitle}</p>

                    <h1 className="display-title">{note.title}</h1>

                    <ul className="flex flex-wrap justify-center gap-2">
                        {
                            meta.map((item) => (
                                <li key={item} className="meta-chip pt-2 pb-2 pl-3 pr-3">{item}</li>
                            ))
                        }
                    </ul>
                </div>
            </Band>

            <Band>
                <div className="reading-column mx-auto flex flex-col gap-10">
                    <NotePlayer
                        video={note.video}
                        fallback={note.fallback}
                        captions={note.captions}
                        title={note.title}
                        cues={cues}
                        chapters={chapters}
                    />

                    <Link href="/pages/fieldnotes" className="button button-quiet self-start">
                        All field notes
                    </Link>
                </div>
            </Band>
        </div>
    );
}
