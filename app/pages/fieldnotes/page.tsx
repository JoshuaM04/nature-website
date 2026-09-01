import NotesView from './notes-view';
import { Band, Hero } from '../../components/band';
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
        <div className="flex flex-col w-full">
            <Hero
                eyebrow={['Recordings', '.', `${items.length} ${items.length === 1 ? 'clip' : 'clips'}`]}
                title="Field notes"
                intro="Short recordings made in the field, each captioned by hand. The transcript on every note is read back out of those captions, so the two cannot disagree."
            />

            <Band tone="cream">
                <NotesView items={items} features={['cc', 'sub', 'ch', 'ad']} />
            </Band>
        </div>
    );
}
