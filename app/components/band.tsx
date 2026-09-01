import Link from 'next/link';
import Flourish from './flourish';

interface BandProps {
    tone?: 'plain' | 'cream' | 'green';
    tight?: boolean;
    children: React.ReactNode;
}

/* Every page is stacked out of these. A band runs the full width of the window
   and keeps whatever it holds on the shared measure. */
export function Band({tone = 'plain', tight = false, children}: BandProps) {
    const ground = tone === 'green' ? 'band-green' : tone === 'cream' ? 'band-cream' : '';

    return (
        <section className={`band ${ground} ${tight ? 'band-tight' : ''}`}>
            <div className="band-inner">
                {children}
            </div>
        </section>
    );
}

interface HeroProps {
    eyebrow: Array<string>;
    title: string;
    intro: string;
    action?: { label: string; href: string };
    tone?: 'cream' | 'green';
}

/* The masthead of a page: a sprig, a small label, a serif title and a line of
   introduction, centred on their own measure. */
export function Hero({eyebrow, title, intro, action, tone = 'green'}: HeroProps) {
    return (
        <Band tone={tone}>
            <div className="centred-block flex flex-col items-center gap-5">
                <Flourish />

                <ul className="eyebrow flex justify-center gap-4">
                    {eyebrow.map((item) => <li key={item}>{item}</li>)}
                </ul>

                <h1 className="display-title">{title}</h1>

                <p className="lead-text">{intro}</p>

                {
                    action && (
                        <Link
                            href={action.href}
                            className={`button ${tone === 'green' ? 'button-light' : 'button-solid'} mt-2`}>
                            {action.label}
                        </Link>
                    )
                }
            </div>
        </Band>
    );
}

interface SectionHeadProps {
    eyebrow?: string;
    title: string;
    intro?: string;
    centred?: boolean;
}

export function SectionHead({eyebrow, title, intro, centred = true}: SectionHeadProps) {
    return (
        <header className={`flex flex-col gap-4 ${centred ? 'centred-block items-center' : ''}`}>
            {centred && <Flourish />}

            {eyebrow && <p className="eyebrow">{eyebrow}</p>}

            <h2 className="display-title">{title}</h2>

            {intro && <p className="lead-text">{intro}</p>}
        </header>
    );
}
