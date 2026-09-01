import { Band, Hero, SectionHead } from '../../components/band';
import { indexData } from '../../utilities/data';

/* The five layers the guide reads the woodland in. Each carries the label the
   species records are tagged with, so the counts beside them are the real ones
   rather than a number typed into the copy. */
const habitats = [
    {
        name: 'Canopy',
        label: 'canopy',
        image: '/gallery-cards/hemlock-bark.jpg',
        description: 'The upper twenty metres and above. Nesting birds, hemlock and beech crowns.'
    },
    {
        name: 'Understory',
        label: 'understory',
        image: '/species-cards/wood-thrush.jpg',
        description: 'Saplings and shrubs between two and ten metres, where most songbirds forage.'
    },
    {
        name: 'Forest floor',
        label: 'forest floor',
        image: '/gallery-cards/leaf-litter.jpg',
        description: 'Leaf litter, herbs and ferns. The densest layer by number of species.'
    },
    {
        name: 'Deadwood',
        label: 'deadwood',
        image: '/species-cards/turkey-tail.jpg',
        description: 'Standing snags and fallen trunks. Fungi, beetles and the birds that follow them.'
    },
    {
        name: 'Streamside',
        label: 'streamside',
        image: '/gallery-cards/cold-seep.jpg',
        description: 'Cold seeps and riffles. Amphibians depend on the shade the canopy provides.'
    }
];

const statuses = [
    { code: 'LC', name: 'Least concern', description: 'Populations stable across the range.' },
    { code: 'NT', name: 'Near threatened', description: 'Declining, and likely to qualify for a higher category soon.' },
    { code: 'VU', name: 'Vulnerable', description: 'Facing a high risk of extinction in the wild.' },
    { code: 'EN', name: 'Endangered', description: 'Facing a very high risk of extinction in the wild.' },
    { code: 'CR', name: 'Critically endangered', description: 'Facing an extremely high risk of extinction.' }
];

const pressures = [
    {
        name: 'Hemlock woolly adelgid',
        body: 'An introduced insect has been killing eastern hemlock across the range since the 1950s. Where hemlock goes the shade goes with it, and streams warm past what brook trout and salamanders tolerate. This guide records the condition of every hemlock it photographs.'
    },
    {
        name: 'Streamside buffers',
        body: 'Leaving an unlogged margin along a watercourse keeps the water cold, holds the bank together and gives amphibians a corridor between breeding pools. A buffer is often the difference between a stream that holds eft and one that does not.'
    },
    {
        name: 'Deadwood retention',
        body: 'A fallen trunk is habitat for decades. Retaining standing snags and downed wood rather than clearing them supports the fungi, beetles and cavity-nesting birds that a tidy woodland loses first.'
    }
];

const conduct = [
    'No playback was used to draw birds into frame.',
    'Nests, dens and breeding pools are photographed at distance and never disclosed by location.',
    'Recordings were made from fixed positions, with the observer arriving before the subject.'
];

export default function About() {
    const inHabitat = (label: string) => indexData.filter((species) => species.labels.includes(label)).length;
    const atStatus = (code: string) => indexData.filter((species) => species.status === code).length;
    const tally = (count: number) => (count === 0 ? 'none recorded' : `${count} species`);

    return (
        <div className="flex flex-col w-full">
            <Hero
                eyebrow={['Purpose', '.', `${indexData.length} entries`]}
                title="About this guide"
                intro="Understory is a record of what lives in one patch of eastern deciduous woodland, and an argument that you cannot protect what you cannot name."
            />

            <Band>
                <div className="centred-block flex flex-col items-center gap-8">
                    <SectionHead title="Why this guide exists" />

                    <div className="flex flex-col gap-5 text-left">

                    <p className="lead-text">
                        A short list is not a survey. It is a way in. Each entry gives you enough to recognise
                        the animal or plant in front of you: what it looks like, where in the forest it sits,
                        how large it gets and when in the year you are likely to meet it.
                    </p>

                    <p className="lead-text">
                        The guide is organised by habitat rather than by taxonomy, because that is how the
                        woodland actually works. A wood thrush is not a fact about birds; it is a fact about
                        the understory, the leaf litter it forages in, and the canopy that keeps both damp.
                        </p>
                    </div>
                </div>
            </Band>

            <Band tone="cream">
                <div className="flex flex-col gap-10">
                    <SectionHead
                        eyebrow="Habitat"
                        title="Five habitats"
                        intro="The woodland is read in layers, and most entries occupy more than one."
                    />

                    <ul className="data-column mx-auto flex flex-col w-full">
                        {
                            habitats.map((habitat) => (
                                <li key={habitat.label} className="data-row flex items-start gap-5 py-5">
                                    <img
                                        className="w-24 aspect-[4/3] object-cover shrink-0"
                                        src={habitat.image}
                                        alt={habitat.name}
                                    />

                                    <div className="flex flex-col gap-1 grow">
                                        <h3 className="card-title">{habitat.name}</h3>
                                        <p className="body-text">{habitat.description}</p>
                                    </div>

                                    <p className={inHabitat(habitat.label) > 0 ? 'count-note' : 'quiet-note'}>
                                        {tally(inHabitat(habitat.label))}
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
                        intro="Most of what you meet here is common. The scale is shown in full because status changes, and because common is not the same as safe."
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
                                        {tally(atStatus(status.code))}
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
                        title="Conservation in the woodland"
                        intro="Three pressures shape what survives here, and three responses are already in the ground."
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
                <div className="centred-block flex flex-col gap-8">
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
