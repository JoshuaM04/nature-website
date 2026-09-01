import GalleryView from './gallery-view';
import { Band, Hero } from '../../components/band';
import { fetchPlates, biomesFrom } from '../../utilities/commons';

export default async function Gallery() {
    const plates = await fetchPlates();

    return (
        <div className="gallery flex flex-col w-full">
            <Hero
                eyebrow={['Plates', '.', `${plates.length} photographs`]}
                title="Every plate at the size it was shot"
                intro="Openly licensed photographs of the ground the guide covers, credited to the photographer and none of it older than three years."
            />

            <Band tone="cream">
                <GalleryView
                    plates={plates}
                    biomes={biomesFrom(plates)}
                />
            </Band>
        </div>
    );
}
