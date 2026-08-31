'use client';
import Field from '../../components/field';
import { Select, SelectValue, Button, Popover, ListBox, ListBoxItem, Label } from 'react-aria-components';
import { useState } from 'react';

export default function FieldNotes() {
    const features = ['CC', 'SUB', 'CH', 'AD'];
    const [sort, setSort] = useState('newest');

    return (
        <div className="flex flex-col gap-5 pl-5 pr-5 w-full">
            <header className="flex flex-col gap-5">
                <ul className="eyebrow flex gap-5">
                    <li>Recordings</li>
                    <li>.</li>
                    <li>5 clips</li>
                </ul>
                
                <h1 className="page-title">Field Notes</h1>
                
                <p className="intro-paragraph">Short recordings made in the field, each captioned by hand.</p>   
            </header>

            <main>
                <div className="masthead-rule-light flex justify-between gap-5 pl-5 pr-5 pb-5 -ml-5 -mr-5">
                    <div className="eyebrow flex gap-2">
                        {
                            features.map((item, index) => (
                                <div className="flex justify-center items-center border border-rule pl-3 pr-3" key={index}>{item}</div>
                            ))
                        }
                    </div>
                
                    <Select selectedKey={sort} onSelectionChange={(k) => setSort(String(k))}>
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
            </main>

            <Field />
        </div>
    );
}