'use client';
import { useState } from 'react';

export default function Filter() {
    const buttons = ['ALL', 'CANOPY', 'UNDERSTORY', 'FOREST FLOOR'];
    const [activeButton, setActiveButton] = useState('');

    return (
        <div className="flex gap-5 overflow-x-auto">
            {
                buttons.map((item, index) => (
                   <button 
                   onClick={() => setActiveButton(item)}
                   className={`filter-chips pt-2 pb-2 pl-4 pr-4 ${activeButton === item ? 'filter-chips-active' : ''}`}
                    key={index}>
                        {item}
                    </button>
                ))
            }
        </div>
    );
}