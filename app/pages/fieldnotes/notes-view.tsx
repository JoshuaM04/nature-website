'use client';
import Field from '../../components/field';
import type { FieldCard } from '../../components/field';
import { Select, SelectValue, Button, Popover, ListBox, ListBoxItem, Label } from 'react-aria-components';
import { useState } from 'react';

interface NotesViewProps {
    items: Array<FieldCard>;
    features: Array<{ code: string; label: string }>;
}

export default function NotesView({items, features}: NotesViewProps) {
    const [sort, setSort] = useState('newest');

    /* The notes are filed in order, so the number is the record of when each
       one was made. */
    const ordered = [...items].sort((a, b) => (
        sort === 'newest' ? b.number.localeCompare(a.number) : a.number.localeCompare(b.number)
    ));

    return (
        <main className="flex flex-col gap-8">
            <div className="masthead-rule-light flex justify-between items-center gap-5 px-5 pb-5 -mx-5">
                <ul className="flex flex-wrap gap-2">
                    {
                        features.map((feature) => (
                            <li
                                key={feature.code}
                                title={feature.label}
                                className="feature-badge flex items-center gap-2 py-2 px-4">
                                <span className="feature-dot" />
                                {feature.code}
                            </li>
                        ))
                    }
                </ul>

                <Select selectedKey={sort} onSelectionChange={(key) => setSort(String(key))}>
                    <Label className="sr-only">Sort</Label>

                    <Button className="flex items-center gap-3 border border-rule bg-page px-4 py-2
                                        font-mono text-[11px] uppercase tracking-[.08em] text-muted
                                        data-[focus-visible]:outline data-[focus-visible]:outline-2
                                        data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-moss">
                        <SelectValue />
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M1 1l4 4 4-4" />
                        </svg>
                    </Button>

                    <Popover className="w-(--trigger-width) border border-rule bg-surface">
                        <ListBox className="outline-none">
                            <ListBoxItem
                                id="newest"
                                className="cursor-default px-4 py-2 font-mono text-[11px] uppercase tracking-[.08em]
                                        text-muted outline-none
                                        data-[hovered]:bg-hairline
                                        data-[selected]:bg-canopy data-[selected]:text-page">
                                Newest first
                            </ListBoxItem>

                            <ListBoxItem
                                id="oldest"
                                className="cursor-default px-4 py-2 font-mono text-[11px] uppercase tracking-[.08em]
                                        text-muted outline-none
                                        data-[hovered]:bg-hairline
                                        data-[selected]:bg-canopy data-[selected]:text-page">
                                Oldest first
                            </ListBoxItem>
                        </ListBox>
                    </Popover>
                </Select>
            </div>

            <Field items={ordered} />
        </main>
    );
}
