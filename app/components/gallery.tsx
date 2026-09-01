export interface GalleryItem {
    title: string;
    number: string;
    image: string;
    stamp: string;
    href?: string;
    labels: Array<string>;
}

interface GalleryProps {
    items: Array<GalleryItem>;
    activeBiome: string;
    emptyMessage?: string;
}

const plate = "species-card @container flex flex-col gap-5 border relative";

export default function GalleryCard({ items, activeBiome, emptyMessage = "No species recorded in this habitat." }: GalleryProps) {
    const visible = activeBiome === 'ALL' ? items : items.filter((item) => item.labels.includes(activeBiome.toLowerCase()));

    if (visible.length === 0) {
        return <p className="blurb">{emptyMessage}</p>
    }

    return (
        <div className="gallery-component">
          {
            visible.map((item) => {
                const face = (
                    <>
                        <div className="specimen-tag absolute top-5 left-5 pt-1 pb-1 pl-3 pr-3">
                            {item.number}
                        </div>

                        <img className="w-full" src={item.image} alt={item.title} />

                        <div className="absolute z-1 left-5 right-5 bottom-2 flex flex-col gap-1 @md:flex-row @md:items-end @md:justify-between @md:gap-5">
                            <p className="plate-name">
                                {item.title}
                            </p>

                            <p className="plate-stamp @md:text-right">
                                {item.stamp}
                            </p>
                        </div>

                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent to-20%"></div>
                    </>
                );

                return item.href
                    ? (
                        <a
                            key={item.number}
                            className={plate}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer">
                            {face}
                        </a>
                    )
                    : <div key={item.number} className={plate}>{face}</div>;
            })
          }  
        </div>
    );
}
