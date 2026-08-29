import { data } from '../utilities/data';

interface CardProps {
    activeHabitat: string;
}

export default function Card({activeHabitat}: CardProps) {
    const visible = 
        activeHabitat === "ALL"
        ? data
        : data.filter((item) => item.labels.includes(activeHabitat.toLowerCase()));

    if (visible.length === 0) {
        return <p className="blurb">No species recorded in this habitat.</p>
    }

    return (
        <div className="card-component">
            {
                visible.map((item) => (
                    <div key={item.title} className="species-card flex flex-col gap-5 border p-5">
                        <section className="img-container -ml-5 -mr-5 -mt-5 relative">
                            <img className="w-full" src={item.image} alt={item.image} />

                            
                            <div className="specimen-tag absolute top-5 left-5 pt-1 pb-1 pl-3 pr-3">
                                {item.number}
                            </div>
                            <div className="status-badge absolute top-5 right-5 pt-1 pb-1 pl-3 pr-3">
                                {item.status}
                            </div>
                        </section>

                        <section className="flex flex-col gap-5">
                            <div className="flex flex-col">
                                <span className="common-name">{item.title}</span>
                                <span className="scientific-name">{item.subtitle}</span>
                            </div>

                            <div className="blurb">
                                {item.body}
                            </div>

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
                        </section>
                    </div>
                ))
            }
        </div>
    );
}