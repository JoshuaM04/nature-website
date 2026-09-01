import NotesView from './notes-view';
import { notes, readDuration } from '../../utilities/fieldnotes';
import { runtime } from '../../utilities/captions';

export default async function FieldNotes() {
    const lengths = await Promise.all(notes.map((note) => readDuration(note)));

    const items = notes.map((note, index) => ({
        slug: note.slug,
        title: note.title,
        subtitle: note.subtitle,
        number: note.number,
        image: note.image,
        body: note.body,
        labels: note.labels,
        length: lengths[index] > 0 ? runtime(lengths[index]) : note.time
    }));

    return (
        <div className="shell flex flex-col gap-8 px-5 w-full">
            <header className="flex flex-col gap-5">
                <ul className="eyebrow flex gap-5">
                    <li>Recordings</li>
                    <li>.</li>
                    <li>{items.length} {items.length === 1 ? 'clip' : 'clips'}</li>
                </ul>

                <h1 className="page-title">Field Notes</h1>

                <p className="intro-paragraph reading-column">
                    Short recordings made in the field, each captioned by hand. The transcript on every note is
                    read back out of those captions, so the two cannot disagree.
                </p>
            </header>

            <NotesView items={items} features={['cc', 'sub', 'ch', 'ad']} />
        </div>
    );
}
