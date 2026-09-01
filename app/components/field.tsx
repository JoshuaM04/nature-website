import Link from 'next/link';

export interface FieldCard {
    slug: string;
    title: string;
    subtitle: string;
    number: string;
    image: string;
    body: string;
    labels: Array<string>;
    length: string;
    status?: { code: string; name: string };
}

interface FieldProps {
    items: Array<FieldCard>;
}

export default function Field({items}: FieldProps) {
    if (items.length === 0) {
        return <p className="blurb">No recordings filed yet.</p>
    }

    return (
        <div className="card-component">
            {
                items.map((item) => (
                    <Link key={item.slug} href={`/pages/fieldnotes/${item.slug}`} className="species-card flex flex-col gap-5 border p-5">
                        <section className="img-container plate-frame -ml-5 -mr-5 -mt-5 relative">
                            <img className="w-full aspect-[4/3] object-cover" src={item.image} alt={item.title} />

                            <div className="specimen-tag absolute top-5 left-5 pt-1 pb-1 pl-3 pr-3">
                                {item.number}
                            </div>

                            {
                                item.status && (
                                    <div className="status-badge absolute top-5 right-5 pt-1 pb-1 pl-3 pr-3" title={item.status.name}>
                                        {item.status.code}
                                    </div>
                                )
                            }
                        </section>

                        <section className="flex flex-col justify-between gap-5 h-full">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col">
                                    <span className="common-name">{item.title}</span>
                                    <span className="scientific-name">{item.subtitle}</span>
                                </div>

                                <div className="blurb">
                                    {item.body}
                                </div>
                            </div>

                            <div className="flex justify-between items-end gap-5">
                                <div className="flex flex-wrap gap-2">
                                    {
                                        item.labels.map((label, labelIndex) => (
                                            <div key={labelIndex} className="habitat-chip pt-1 pb-1 pl-3 pr-3">
                                                {label}
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="eyebrow">{item.length}</div>
                            </div>
                        </section>
                    </Link>
                ))
            }
        </div>
    );
}
