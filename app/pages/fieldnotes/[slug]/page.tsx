import { notFound } from 'next/navigation';
import Link from 'next/link';
import NotePlayer from '../../../components/note-player';
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
        <div className="shell flex flex-col gap-10 px-5 w-full">
            <header className="flex flex-col gap-5">
                <p className="eyebrow">{note.number} {note.subtitle}</p>

                <h1 className="page-title">{note.title}</h1>

                <ul className="flex flex-wrap gap-2">
                    {
                        meta.map((item) => (
                            <li key={item} className="meta-chip pt-2 pb-2 pl-3 pr-3">{item}</li>
                        ))
                    }
                </ul>
            </header>

            <main className="reading-column flex flex-col gap-10">
                <NotePlayer
                    video={note.video}
                    fallback={note.fallback}
                    captions={note.captions}
                    poster={note.image}
                    title={note.title}
                    cues={cues}
                    chapters={chapters}
                />

                <p className="body-text">{note.note}</p>
            </main>

            <Link href="/pages/fieldnotes" className="eyebrow rule-above pt-5">
                All field notes
            </Link>
        </div>
    );
}
