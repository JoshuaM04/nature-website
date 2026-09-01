export interface CardItem {
    title: string;
    subtitle: string;
    number: string;
    status: string;
    image?: string;
    href?: string;
    body: string;
    labels: Array<string>;
    range: string;
}

interface CardProps {
    items: Array<CardItem>;
    activeLabel: string;
    emptyMessage?: string;
}

export default function Card({items, activeLabel, emptyMessage = "No species recorded in this habitat."}: CardProps) {
    const visible = 
        activeLabel === "ALL"
        ? items
        : items.filter((item) => item.labels.includes(activeLabel.toLowerCase()));

    if (visible.length === 0) {
        return <p className="blurb">{emptyMessage}</p>
    }

    return (
        <div className="card-component">
            {
                visible.map((item) => (
                    <article key={item.title} className="species-card flex flex-col gap-5 border p-5">
                        <section className="img-container plate-frame -ml-5 -mr-5 -mt-5 relative">
                            {
                                item.image
                                ? <img className="w-full aspect-[4/3] object-cover" src={item.image} alt={item.title} />
                                : (
                                    <div className="plate-placeholder flex justify-center items-center w-full aspect-[4/3]">
                                        No plate
                                    </div>
                                )
                            }

                            
                            <div className="specimen-tag absolute top-5 left-5 pt-1 pb-1 pl-3 pr-3">
                                {item.number}
                            </div>
                            <div className="status-badge absolute top-5 right-5 pt-1 pb-1 pl-3 pr-3">
                                {item.status}
                            </div>
                        </section>

                        <section className="flex flex-col justify-between gap-5 h-full">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col">
                                    {
                                        item.href
                                        ? (
                                            <a
                                                className="common-name"
                                                href={item.href}
                                                target="_blank"
                                                rel="noreferrer">
                                                {item.title}
                                            </a>
                                        )
                                        : <span className="common-name">{item.title}</span>
                                    }
                                    <span className="scientific-name">{item.subtitle}</span>
                                </div>

                                <div className="blurb">
                                    {item.body}
                                </div>
                            </div>

                            <div className="flex flex-col gap-5"> 
                                <div className="flex flex-wrap gap-2">
                                    {
                                        item.labels.map((label, labelIndex) => (
                                            <div key={labelIndex} className="habitat-chip pt-1 pb-1 pl-3 pr-3">
                                                {label}
                                            </div>
                                        ))
                                    }
                                </div>

                                <hr className="card-divider" />
                                
                                <div className="size-text">{item.range}</div>
                            </div>
                        </section>
                    </article>
                ))
            }
        </div>
    );
}
