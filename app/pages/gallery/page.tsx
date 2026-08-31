'use client';
import Filter from '../../components/filter';
import { useState} from 'react';

export default function Gallery() {
    const habitats = ['ALL', 'CANOPY', 'UNDERSTORY', 'FOREST FLOOR'];
    const [activeHabitat, setActiveHabitat] = useState('ALL');

    return (
        <div className="gallery flex flex-col gap-5 pl-5 pr-5 w-full">
            <header className="flex flex-col gap-5">
                <ul className="eyebrow flex gap-5">
                    <li>Plates</li>
                    <li>.</li>
                    <li>48 photographs</li>
                </ul>
                
                <h1 className="page-title">Gallery</h1>
                
                <p className="intro-paragraph">Every plate at the proportions it was shot.</p>   
            </header>

            <main>
                <Filter
                    habitats={habitats}
                    activeHabitat={activeHabitat}
                    setActiveHabitat={setActiveHabitat}
                />
            </main>
        </div>
    );
}