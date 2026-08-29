import { data } from '../utilities/data';

export default function Card() {
    return (
        <div className="flex justify-center">
            {
                data.map((item, index) => (
                    <div key={index} className="card-component flex flex-col gap-5 border p-5">
                        <section className="img-container -ml-5 -mr-5 -mt-5 relative">
                            <img src={item.image} alt={item.image} />

                            
                            <div className="absolute top-5 left-5 text-white bg-night-rule pt-1 pb-1 pl-3 pr-3">
                                {item.number}
                            </div>
                            <div className="absolute top-5 right-5 bg-white border pt-1 pb-1 pl-3 pr-3">
                                {item.category}
                            </div>
                        </section>

                        <section className="flex flex-col gap-5">
                            <div className="flex flex-col">
                                <span>{item.title}</span>
                                <span className="italic">{item.subtitle}</span>
                            </div>

                            <div>
                                {item.body}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {
                                    item.labels.map((label, labelIndex) => (
                                        <div key={labelIndex} className="tagline uppercase border pt-1 pb-1 pl-3 pr-3">
                                            {label}
                                        </div>
                                    ))
                                }
                            </div>

                            <hr />

                            <div>{item.range}</div>
                        </section>
                    </div>
                ))
            }
        </div>
    );
}