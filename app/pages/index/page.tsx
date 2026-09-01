import IndexView from './index-view';
import { fetchStories, topicsFrom } from '../../utilities/inaturalist';

export default async function Index() {
    const stories = await fetchStories();

  return (
    <div className="index flex flex-col gap-5 pl-5 pr-5 w-full">
        <header className="flex flex-col gap-5">
            <ul className="eyebrow flex gap-5">
                <li>From iNaturalist</li>
                <li>.</li>
                <li>{stories.length} stories</li>
            </ul>
            
            <h1 className="page-title">Latest from the field</h1>
            
            <p className="intro-paragraph">Journal posts published by the iNaturalist community, newest first.</p>
        </header>

        <IndexView
            stories={stories}
            topics={topicsFrom(stories)}
        />
    </div>
  );
}
