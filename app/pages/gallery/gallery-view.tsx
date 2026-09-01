'use client';
import Filter from '../../components/filter';
import GalleryCard from '../../components/gallery';
import type { GalleryItem } from '../../components/gallery';
import { useState } from 'react';

interface GalleryViewProps {
    plates: Array<GalleryItem>;
    biomes: Array<string>;
}

export default function GalleryView({plates, biomes}: GalleryViewProps) {
    const [activeBiome, setActiveBiome] = useState('ALL');

    return (
        <main className="flex flex-col items-center gap-5 w-full">
            <Filter
                habitats={biomes}
                activeHabitat={activeBiome}
                setActiveHabitat={setActiveBiome}
            />
            
            <hr className="filter-bar-rule -ml-5 -mr-5" />

            <GalleryCard
                items={plates}
                activeBiome={activeBiome}
                emptyMessage="No plates recorded on this ground."
            />
        </main>
    );
}
