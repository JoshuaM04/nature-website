import { indexData } from './data';

export interface Status {
    code: string;
    name: string;
    description: string;
}

/* The IUCN scale, kept in one place so the about page and a field note cannot
   describe the same code differently. */
export const statuses: Array<Status> = [
    { code: 'LC', name: 'Least concern', description: 'Populations stable across the range.' },
    { code: 'NT', name: 'Near threatened', description: 'Declining, and likely to qualify for a higher category soon.' },
    { code: 'VU', name: 'Vulnerable', description: 'Facing a high risk of extinction in the wild.' },
    { code: 'EN', name: 'Endangered', description: 'Facing a very high risk of extinction in the wild.' },
    { code: 'CR', name: 'Critically endangered', description: 'Facing an extremely high risk of extinction.' }
];

export function statusByCode(code: string) {
    return statuses.find((status) => status.code === code.toUpperCase());
}

export function countAtStatus(code: string) {
    return indexData.filter((species) => species.status === code).length;
}

/* A field note names the species it was recorded of, and the species records
   carry its status, so the badge on a note is read off the record rather than
   written onto the note. A subject the guide has no record of gets none. */
export function statusForSpecies(name: string) {
    const species = indexData.find(
        (record) => record.title.toLowerCase() === name.trim().toLowerCase()
    );

    return species ? statusByCode(species.status) : undefined;
}
