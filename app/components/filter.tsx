'use client';
import Card from './card';
import { useState } from 'react';

interface FilterProps {
    habitats: Array<string>;
    activeHabitat: string;
    setActiveHabitat: Function;
}

export default function Filter({habitats, activeHabitat, setActiveHabitat}: FilterProps) {

    return (
        <div className="masthead-rule-light filter-component flex flex-col gap-5 pl-5 pr-5 pb-5 -mx-5 self-stretch">
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
        </div>
    );
}