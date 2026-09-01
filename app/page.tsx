import Link from 'next/link';
import { Band, Hero, SectionHead } from './components/band';

const sections = [
    {
        label: 'Index',
        title: 'What the woodland is doing',
        body: 'The newest journal posts from the iNaturalist community, filed by the subject they take up.',
        href: '/pages/index',
        image: '/species-cards/wood-thrush.jpg'
    },
    {
        label: 'Gallery',
        title: 'Every plate at the size it was shot',
        body: 'Openly licensed photographs of ocean, mountain, river, forest and the rest, credited to the photographer.',
        href: '/pages/gallery',
        image: '/gallery-cards/hemlock-bark.jpg'
    },
    {
        label: 'Field notes',
        title: 'Recordings, captioned by hand',
        body: 'Short clips from the field, each with the transcript read back out of its own captions.',
        href: '/pages/fieldnotes',
        image: '/gallery-cards/cold-seep.jpg'
    }
];

export default function Home() {
    return (
        <div className="flex flex-col w-full">
            <Hero
                eyebrow={['Ocean to new rock']}
                title="What lives out there"
                intro="A field guide to the ground the living world occupies, from open water to new rock, and to the people who photograph it."
                action={{ label: 'Start with the index', href: '/pages/index' }}
            />

            <Band tone="cream">
                <div className="flex flex-col gap-12">
                    <SectionHead
                        eyebrow="The guide"
                        title="Three ways in"
                        intro="Nothing here is a survey. It is enough to recognise what is in front of you, and to know where it sits."
                    />

                    <div className="card-component">
                        {
                            sections.map((section) => (
                                <Link key={section.label} href={section.href} className="species-card flex flex-col gap-5 border p-5">
                                    <div className="img-container plate-frame -ml-5 -mr-5 -mt-5">
                                        <img className="w-full aspect-[4/3] object-cover" src={section.image} alt={section.title} />
                                    </div>

                                    <div className="flex flex-col gap-3 grow">
                                        <p className="card-label">{section.label}</p>
                                        <h3 className="card-title">{section.title}</h3>
                                        <p className="body-text grow">{section.body}</p>
                                        <p className="read-more">Read more &rarr;</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </Band>

            <Band tone="green" tight>
                <div className="centred-block flex flex-col items-center gap-5">
                    <h2 className="display-title text-3xl">You cannot protect what you cannot name</h2>

                    <p className="lead-text">
                        The guide is organised by habitat rather than by taxonomy, because that is how the
                        woodland actually works.
                    </p>

                    <Link href="/pages/about" className="button button-light mt-2">
                        About this guide
                    </Link>
                </div>
            </Band>
        </div>
    );
}
