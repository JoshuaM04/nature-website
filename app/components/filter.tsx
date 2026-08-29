'use client';
import Card from './card';
import { useState } from 'react';

export default function Filter() {
    const habitats = ['ALL', 'CANOPY', 'UNDERSTORY', 'FOREST FLOOR'];
    const [activeHabitat, setActiveHabitat] = useState('ALL');

    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-5 overflow-x-auto">
                {
                    habitats.map((item, index) => (
                       <button
                       onClick={() => setActiveHabitat(item)}
                       className={`filter-chips pt-2 pb-2 pl-4 pr-4 ${activeHabitat === item ? 'filter-chips-active' : ''}`}
                        key={index}>
                            {item}
                        </button>
                    ))
                }
            </div>
            
            <hr className="filter-bar-rule -ml-5 -mr-5" />

            <Card
                    activeHabitat={activeHabitat}
                />
        </div>
    );
}