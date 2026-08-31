import { fieldData } from '../utilities/data';

export default function Field() {
    return (
        <div className="card-component">
            {
                fieldData.map((item) => (
                    <article key={item.title} className="species-card flex flex-col gap-5 border p-5">
                        <section className="img-container -ml-5 -mr-5 -mt-5 relative">
                            <img className="w-full" src={item.image} alt={item.image} />

                            
                            <div className="specimen-tag absolute top-5 left-5 pt-1 pb-1 pl-3 pr-3">
                                {item.number}
                            </div>
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

                                <div className="eyebrow">{item.time}</div>
                            </div>
                        </section>
                    </article>
                ))
            }
        </div>
    );
}