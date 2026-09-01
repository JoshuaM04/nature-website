'use client';
import Filter from '../../components/filter';
import Card from '../../components/card';
import type { CardItem } from '../../components/card';
import { useState } from 'react';

interface IndexViewProps {
    stories: Array<CardItem>;
    topics: Array<string>;
}

export default function IndexView({stories, topics}: IndexViewProps) {
    const [activeTopic, setActiveTopic] = useState('ALL');

    return (
        <main className="flex flex-col items-center gap-5 w-full">
            <Filter
                habitats={topics}
                activeHabitat={activeTopic}
                setActiveHabitat={setActiveTopic}
            />

            <Card
                items={stories}
                activeLabel={activeTopic}
                emptyMessage="No stories filed under this topic."
            />
        </main>
    );
}
