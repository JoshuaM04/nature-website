import Link from 'next/link';

const columns = [
    {
        heading: 'The guide',
        links: [
            { label: 'Index', href: '/pages/index' },
            { label: 'Gallery', href: '/pages/gallery' },
            { label: 'Field notes', href: '/pages/fieldnotes' }
        ]
    },
    {
        heading: 'About',
        links: [
            { label: 'About the guide', href: '/pages/about' },
            { label: 'Sources', href: '/pages/about' },
            { label: 'Licensing', href: '/pages/about' }
        ]
    }
];

export default function Footer() {
    return (
        <footer className="band band-green mt-auto">
            <div className="band-inner flex flex-col gap-10">
                <div className="flex flex-wrap justify-between gap-10">
                    <div className="flex flex-col gap-3 max-w-sm">
                        <h3 className="display-title text-2xl">Understory</h3>

                        <p className="lead-text text-sm">
                            A record of what lives in one patch of eastern deciduous woodland.
                        </p>
                    </div>

                    {
                        columns.map((column) => (
                            <nav key={column.heading} className="flex flex-col gap-3">
                                <h4 className="eyebrow">{column.heading}</h4>

                                <ul className="flex flex-col gap-2">
                                    {
                                        column.links.map((link) => (
                                            <li key={link.label}>
                                                <Link className="lead-text text-sm" href={link.href}>{link.label}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </nav>
                        ))
                    }
                </div>

                <p className="eyebrow">Every plate credited to its photographer and licence.</p>
            </div>
        </footer>
    );
}
