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
        <div className="gallery-component flex flex-col gap-5">
          {
            visible.map((item) => (
                <div key={item.title} className="species-card flex flex-col gap-5 border relative">
                    <div className="specimen-tag absolute top-5 left-5 pt-1 pb-1 pl-3 pr-3">
                        {item.number}
                    </div>

                    <img className="w-full" src={item.image} alt={item.image} />

                    <p className="plate-name absolute left-5 bottom-0">
                        {item.title}
                    </p>

                    <p className="plate-stamp absolute right-5 bottom-0">
                        {item.stamp}
                    </p>
                </div>
            ))
          }  
        </div>
    );
}