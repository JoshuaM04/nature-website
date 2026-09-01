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
        <div className="shell flex flex-col gap-12 px-5 w-full">
            <header className="flex flex-col gap-5">
                <ul className="eyebrow flex gap-5">
                    <li>Purpose</li>
                    <li>.</li>
                    <li>{indexData.length} entries</li>
                </ul>

                <h1 className="page-title">About this guide</h1>

                <p className="intro-paragraph reading-column">
                    Understory is a record of what lives in one patch of eastern deciduous woodland, and an
                    argument that you cannot protect what you cannot name.
                </p>
            </header>

            <section className="reading-column flex flex-col gap-5">
                <h2 className="section-heading">Why this guide exists</h2>

                <p className="body-text">
                    A short list is not a survey. It is a way in. Each entry gives you enough to recognise the
                    animal or plant in front of you: what it looks like, where in the forest it sits, how large
                    it gets and when in the year you are likely to meet it.
                </p>

                <p className="body-text">
                    The guide is organised by habitat rather than by taxonomy, because that is how the woodland
                    actually works. A wood thrush is not a fact about birds; it is a fact about the understory,
                    the leaf litter it forages in, and the canopy that keeps both damp.
                </p>
            </section>

            <section className="flex flex-col gap-5">
                <h2 className="section-heading">Five habitats</h2>

                <p className="body-text reading-column">
                    The woodland is read in layers, and most entries occupy more than one.
                </p>

                <ul className="data-column flex flex-col">
                    {
                        habitats.map((habitat) => (
                            <li key={habitat.label} className="data-row flex items-start gap-5 py-5">
                                <img
                                    className="w-20 aspect-[4/3] object-cover shrink-0"
                                    src={habitat.image}
                                    alt={habitat.name}
                                />

                                <div className="flex flex-col gap-1 grow">
                                    <h3 className="sub-heading">{habitat.name}</h3>
                                    <p className="body-text">{habitat.description}</p>
                                </div>

                                <p className={inHabitat(habitat.label) > 0 ? 'count-note' : 'quiet-note'}>
                                    {tally(inHabitat(habitat.label))}
                                </p>
                            </li>
                        ))
                    }
                </ul>
            </section>

            <section className="flex flex-col gap-5">
                <h2 className="section-heading">Reading conservation status</h2>

                <p className="body-text reading-column">
                    Most of what you meet here is common. The scale is shown in full because status changes,
                    and because common is not the same as safe.
                </p>

                <ul className="data-column flex flex-col">
                    {
                        statuses.map((status) => (
                            <li key={status.code} className="data-row flex items-start gap-5 py-5">
                                <span className="status-badge pt-1 pb-1 pl-3 pr-3 shrink-0">{status.code}</span>

                                <div className="flex flex-col gap-1 grow">
                                    <h3 className="sub-heading">{status.name}</h3>
                                    <p className="body-text">{status.description}</p>
                                </div>

                                <p className={atStatus(status.code) > 0 ? 'count-note' : 'quiet-note'}>
                                    {tally(atStatus(status.code))}
                                </p>
                            </li>
                        ))
                    }
                </ul>
            </section>

            <section className="reading-column flex flex-col gap-5">
                <h2 className="section-heading">Conservation in the woodland</h2>

                <p className="body-text">
                    Three pressures shape what survives here, and three responses are already in the ground.
                </p>

                {
                    pressures.map((pressure) => (
                        <div key={pressure.name} className="flex flex-col gap-2">
                            <h3 className="sub-heading">{pressure.name}</h3>
                            <p className="body-text">{pressure.body}</p>
                        </div>
                    ))
                }
            </section>

            <section className="reading-column flex flex-col gap-5">
                <h2 className="section-heading">Recording without disturbance</h2>

                <ul className="flex flex-col gap-3">
                    {
                        conduct.map((rule) => (
                            <li key={rule} className="body-text flex gap-3">
                                <span className="count-note pt-2">&mdash;</span>
                                <span>{rule}</span>
                            </li>
                        ))
                    }
                </ul>
            </section>

            <section className="reading-column flex flex-col gap-5">
                <h2 className="section-heading">Attribution</h2>

                <p className="body-text">
                    Every plate in the gallery is credited to the photographer who made it and to the licence it
                    was released under, on the plate itself and again on the page it links out to. Nothing is
                    shown here that was not released for reuse.
                </p>
            </section>
        </div>
    );
}
