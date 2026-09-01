export default function About() {
    return (
        <div className="flex flex-col gap-5 pl-5 pr-5 w-full">
            <header className="masthead-rule-light flex flex-col gap-5 -mx-5 px-5 pb-5">
                <p className="eyebrow">purpose</p>
                
                <h1 className="page-title">About this guide</h1>
                
                <p className="intro-paragraph">
                    Understory is a record of what lives in various environments in nature and an argument
                    that you cannot protect what you cannot name.
                </p>
            </header>

            <section>
                <h2 className="page-title">Why this guide exists</h2>

                <p>
                    Twelve species is not a survey. It is a way in. Each entry
                    gives you enough to recognise the animal or plant in front of you: what it looks like,
                    where in the forest it sits, how large it gets and when in the year you are likely to 
                    meet it.

                    The guide is organized by habitat.
                </p>
            </section>
        </div>
    );
}