import { Band, Hero, SectionHead } from '../../components/band';
import { fetchPlates } from '../../utilities/commons';
import { statuses, countAtStatus } from '../../utilities/conservation';

/* The grounds the guide covers, in the order water gives way to rock. Each
   carries the label the gallery files its plates under, so the counts beside
   them are the real ones rather than a number typed into the copy. */
const ecosystems = [
    {
        name: 'Ocean',
        label: 'ocean',
        image: '/gallery-cards/cold-seep.jpg',
        description: 'Open water and the light that reaches down through it. The largest habitat on the planet and the least photographed.'
    },
    {
        name: 'Coast',
        label: 'coast',
        image: '/gallery-cards/sheet-moss.jpg',
        description: 'Where the sea works on the land. Tidal, saline and rearranged by every storm that comes ashore.'
    },
    {
        name: 'River',
        label: 'river',
        image: '/gallery-cards/cold-seep.jpg',
        description: 'Moving fresh water, and the corridor it cuts. Rivers carry sediment, temperature and species between everything they touch.'
    },
    {
        name: 'Lake',
        label: 'lake',
        image: '/gallery-cards/leaf-litter.jpg',
        description: 'Still fresh water, layered by temperature. What lives at the surface and what lives at the bottom rarely meet.'
    },
    {
        name: 'Waterfall',
        label: 'waterfall',
        image: '/gallery-cards/cold-seep.jpg',
        description: 'Where a river falls. Constant spray keeps the rock either side wetter than anything around it.'
    },
    {
        name: 'Forest',
        label: 'forest',
        image: '/species-cards/wood-thrush.jpg',
        description: 'Read in layers: canopy, understory, floor and the deadwood between them. Most of its species never leave one of those layers.'
    },
    {
        name: 'Mountains',
        label: 'mountains',
        image: '/gallery-cards/hemlock-bark.jpg',
        description: 'Altitude stacks climates on top of each other. A day of walking uphill crosses what would be a continent of latitude.'
    },
    {
        name: 'Valley',
        label: 'valley',
        image: '/gallery-cards/leaf-litter.jpg',
        description: 'The shelter between ranges, where water collects and soil is deepest.'
    },
    {
        name: 'Canyon',
        label: 'canyon',
        image: '/gallery-cards/hemlock-bark.jpg',
        description: 'Rock cut open by water, exposing time. Shade and depth make a cooler, wetter world at the bottom.'
    },
    {
        name: 'Desert',
        label: 'desert',
        image: '/gallery-cards/barred-owl.jpg',
        description: 'Defined by what is missing. Life here is built around holding water rather than finding it.'
    },
    {
        name: 'Glacier',
        label: 'glacier',
        image: '/gallery-cards/hemlock-bark.jpg',
        description: 'Ice old enough to hold a record of the air it formed under, and shrinking almost everywhere it exists.'
    },
    {
        name: 'Volcano',
        label: 'volcano',
        image: '/species-cards/turkey-tail.jpg',
        description: 'Ground that is still being made. New rock is colonised in a sequence you can watch happen.'
    }
];


const pressures = [
    {
        name: 'Warming water',
        body: 'Oceans, lakes and rivers all hold less oxygen as they warm, and the species that need the most are the first to go. A stream that loses its shade warms past what trout and salamanders tolerate, and reefs bleach when the sea holds heat for weeks at a time.'
    },
    {
        name: 'Fragmentation',
        body: 'Habitat that is cut into pieces stops working long before it disappears. Animals that cannot cross the gap between two woods are two small populations rather than one large one, and small populations are the ones that wink out.'
    },
    {
        name: 'Retention',
        body: 'What is left standing matters as much as what is planted. Deadwood, unlogged margins along a watercourse and old growth all carry species that a tidy landscape loses first, and none of them can be put back quickly.'
    }
];

const conduct = [
    'No playback was used to draw animals into frame.',
    'Nests, dens and breeding pools are photographed at distance and never disclosed by location.',
    'Recordings were made from fixed positions, with the observer arriving before the subject.'
];

export default async function About() {
    /* The same read the gallery makes, so a ground with no plates behind it
       says so instead of claiming coverage the guide does not have. */
    const plates = await fetchPlates();

    const inEcosystem = (label: string) => plates.filter((plate) => plate.labels.includes(label)).length;

    /* The thumbnail is the first plate filed under that ground, so the picture
       beside a name is genuinely of it. The drawing is only the fallback for a
       ground the gallery came back empty on. */
    const plateFor = (label: string) => plates.find((plate) => plate.labels.includes(label))?.image;
    const atStatus = countAtStatus;
    const tally = (count: number, noun: string) => (count === 0 ? 'none recorded' : `${count} ${noun}`);

    return (
        <div className="flex flex-col w-full">
            <Hero
                eyebrow={['Purpose', '.', `${ecosystems.length} ecosystems`]}
                title="About this guide"
                intro="Understory is a record of the ground the living world occupies, and an argument that you cannot protect what you cannot name."
            />

            <Band>
                <div className="centred-block flex flex-col items-center gap-8">
                    <SectionHead title="Why this guide exists" />

                    <div className="flex flex-col gap-5 text-left">
                        <p className="lead-text">
                            A photograph is not a survey. It is a way in. Each plate gives you enough to
                            recognise the place in front of you: what it is made of, what water does to it,
                            and what that leaves room for.
                        </p>

                        <p className="lead-text">
                            The guide is organised by ecosystem rather than by taxonomy, because that is how
                            the living world actually works. A wood thrush is not a fact about birds; it is a
                            fact about the forest, the leaf litter it forages in, and the canopy that keeps
                            both damp.
                        </p>
                    </div>
                </div>
            </Band>

            <Band tone="cream">
                <div className="flex flex-col gap-10">
                    <SectionHead
                        eyebrow="Ground"
                        title="The ecosystems"
                        intro="From open water to new rock. Most places are more than one of these at once, and the interesting ones are where two of them meet."
                    />

                    <ul className="data-column mx-auto flex flex-col w-full">
                        {
                            ecosystems.map((ecosystem) => (
                                <li key={ecosystem.label} className="data-row flex items-start gap-5 py-5">
                                    <img
                                        className="w-24 aspect-[4/3] object-cover shrink-0"
                                        src={plateFor(ecosystem.label) ?? ecosystem.image}
                                        alt={ecosystem.name}
                                    />

                                    <div className="flex flex-col gap-1 grow">
                                        <h3 className="card-title">{ecosystem.name}</h3>
                                        <p className="body-text">{ecosystem.description}</p>
                                    </div>

                                    <p className={inEcosystem(ecosystem.label) > 0 ? 'count-note' : 'quiet-note'}>
                                        {tally(inEcosystem(ecosystem.label), 'plates')}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Band>

            <Band>
                <div className="flex flex-col gap-10">
                    <SectionHead
                        eyebrow="Status"
                        title="Reading conservation status"
                        intro="Most of what you meet is common. The scale is shown in full because status changes, and because common is not the same as safe."
                    />

                    <ul className="data-column mx-auto flex flex-col w-full">
                        {
                            statuses.map((status) => (
                                <li key={status.code} className="data-row flex items-start gap-5 py-5">
                                    <span className="status-badge pt-1 pb-1 pl-3 pr-3 shrink-0">{status.code}</span>

                                    <div className="flex flex-col gap-1 grow">
                                        <h3 className="card-title">{status.name}</h3>
                                        <p className="body-text">{status.description}</p>
                                    </div>

                                    <p className={atStatus(status.code) > 0 ? 'count-note' : 'quiet-note'}>
                                        {tally(atStatus(status.code), 'species')}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Band>

            <Band tone="cream">
                <div className="flex flex-col gap-10">
                    <SectionHead
                        eyebrow="Pressure"
                        title="What these places are losing"
                        intro="Three pressures cut across every ground in this guide, and none of them respect the boundaries between them."
                    />

                    <div className="card-component">
                        {
                            pressures.map((pressure) => (
                                <article key={pressure.name} className="species-card flex flex-col gap-4 border p-8">
                                    <h3 className="card-title">{pressure.name}</h3>
                                    <p className="body-text">{pressure.body}</p>
                                </article>
                            ))
                        }
                    </div>
                </div>
            </Band>

            <Band>
                <div className="centred-block flex flex-col items-center gap-8">
                    <SectionHead eyebrow="Conduct" title="Recording without disturbance" />

                    <ul className="flex flex-col gap-4 text-left">
                        {
                            conduct.map((rule) => (
                                <li key={rule} className="data-row body-text flex gap-4 pb-4">
                                    <span className="count-note pt-1">&mdash;</span>
                                    <span>{rule}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Band>

            <Band tone="green" tight>
                <div className="centred-block flex flex-col items-center gap-4">
                    <h2 className="display-title text-3xl">Attribution</h2>

                    <p className="lead-text">
                        Every plate in the gallery is credited to the photographer who made it and to the
                        licence it was released under, on the plate itself and again on the page it links out
                        to. Nothing is shown here that was not released for reuse.
                    </p>
                </div>
            </Band>
        </div>
    );
}
