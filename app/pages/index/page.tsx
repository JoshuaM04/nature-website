import IndexView from './index-view';
import { Band, Hero } from '../../components/band';
import { fetchStories, topicsFrom } from '../../utilities/inaturalist';

export default async function Index() {
    const stories = await fetchStories();

    return (
        <div className="index flex flex-col w-full">
            <Hero
                eyebrow={['From iNaturalist', '.', `${stories.length} stories`]}
                title="Latest from the field"
                intro="Journal posts published by the iNaturalist community, newest first, filed by the subject they take up."
            />

            <Band tone="cream">
                <IndexView
                    stories={stories}
                    topics={topicsFrom(stories)}
                />
            </Band>
        </div>
    );
}
