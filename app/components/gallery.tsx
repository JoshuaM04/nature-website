import { galleryData } from '../utilities/data';

interface GalleryProps {
    activeHabitat: string;
}

export default function GalleryCard({ activeHabitat }: GalleryProps) {
    const visible = activeHabitat === 'ALL' ? galleryData : galleryData.filter((item) => item.labels.includes(activeHabitat.toLowerCase()));

    if (visible.length === 0) {
        return <p className="blurb">No species recorded in this habitat.</p>
    }

    return (
        <div className="gallery-component">
          {
            visible.map((item) => (
                <div key={item.title} className="species-card flex flex-col gap-5 border relative">
                    <div className="specimen-tag absolute top-5 left-5 pt-1 pb-1 pl-3 pr-3">
                        {item.number}
                    </div>

                    <img className="w-full" src={item.image} alt={item.image} />

                    <p className="plate-name absolute z-1 left-5 bottom-2">
                        {item.title}
                    </p>

                    <p className="plate-stamp absolute z-1 right-5 bottom-2">
                        {item.stamp}
                    </p>

                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent to-20%"></div>
                </div>
            ))
          }  
        </div>
    );
}