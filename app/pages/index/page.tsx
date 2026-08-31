'use client';
import Image from "next/image";
import Filter from '../../components/filter';
import Card from '../../components/card';
import { useState} from 'react';

export default function Index() {
    const habitats = ['ALL', 'CANOPY', 'UNDERSTORY', 'FOREST FLOOR'];
    const [activeHabitat, setActiveHabitat] = useState('ALL');

  return (
    <div className="index flex flex-col gap-5 pl-5 pr-5 w-full">
        <header className="flex flex-col gap-5">
            <ul className="eyebrow flex gap-5">
                <li>12 specimens</li>
                <li>.</li>
                <li>revised aug 2026</li>
            </ul>
            
            <h1 className="page-title">What lives beneath the canopy</h1>
            
            <p className="intro-paragraph">Twelve species of the eastern decidous woodland, described for identification in the field.</p>
        </header>

        <main className="flex flex-col gap-5 w-full">
            <Filter 
                habitats={habitats}
                activeHabitat={activeHabitat}
                setActiveHabitat={setActiveHabitat}

            />

            <hr className="filter-bar-rule -ml-5 -mr-5" />

            <Card
                activeHabitat={activeHabitat}
            />
        </main>
    </div>
  );
}
