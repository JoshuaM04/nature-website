export default function WoodThrush() {
    return (
        <div className="p-5">
            <video width="500" height="500" controls>
                <source src="/woodthrush.mp4" type="video/mp4" />
                <source src="/woodthrush.mp4" type="video/ogg" />
                <track src="/woodthrushSubtitles.vtt" label="English captions" default />
            </video>
        </div>
    )
}