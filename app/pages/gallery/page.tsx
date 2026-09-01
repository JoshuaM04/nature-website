import GalleryView from './gallery-view';
import { fetchPlates, biomesFrom } from '../../utilities/commons';

export default async function Gallery() {
    const plates = await fetchPlates();

    return (
        <div className="gallery shell flex flex-col gap-8 px-5 w-full">
            <header className="flex flex-col gap-5">
                <ul className="eyebrow flex gap-5">
                    <li>Plates</li>
                    <li>.</li>
                    <li>{plates.length} photographs</li>
                </ul>
                
                <h1 className="page-title">Gallery</h1>
                
                <p className="intro-paragraph">Every plate at the proportions it was shot, openly licensed, credited to the photographer, and none of it older than three years.</p>   
            </header>

            <GalleryView
                plates={plates}
                biomes={biomesFrom(plates)}
            />
        </div>
    );
}
