'use client';
import { DialogTrigger, ModalOverlay, Modal, Dialog, Heading, Button} from 'react-aria-components';
import Footer from './footer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    let routes = [
        {
            number: '01',
            page: 'Index',
            route: '/pages/index'
        },
        {
            number: '02',
            page: 'Gallery',
            route: '/pages/gallery'
        },
        {
            number: '03',
            page: 'Field Notes',
            route: '/pages/fieldnotes'
        },
        {
            number: '04',
            page: 'About',
            route: '/pages/about'
        }
    ];

    /* Read from the address rather than from state, so the current page is
       still marked after a refresh or a link followed in from outside. */
    const pathname = usePathname();

    return (
        <div className="masthead-rule sticky top-0 z-40 bg-page w-full">
            <div className="shell flex justify-between items-center gap-5 p-5">
            <div>
                <Link className="masthead-wordmark" href="/">Understory</Link>
                <p className="masthead-tagline">a field guide to the living world</p>
            </div>

            <nav className="hidden md:flex items-center gap-8">
                {
                    routes.map((item, index) => (
                        <Link
                            href={item.route}
                            className={`nav-link ${pathname === item.route ? 'nav-link-active' : ''}`}
                            key={index}>
                            {item.page}
                        </Link>
                    ))
                }
            </nav>

            
            <DialogTrigger>
                <Button className="menu-button md:hidden flex justify-center p-2">
                    <svg className="w-10 stroke-canopy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </Button>

                <ModalOverlay className="fixed inset-0 z-50 bg-page">
                    <Modal className="w-full h-full">
                        <Dialog className="flex flex-col justify-between h-full">
                            <div>
                                <div className="masthead-rule flex justify-between items-center gap-5 p-5 bg-page">
                                    <Heading>
                                        <Link className="masthead-wordmark" href="/">Understory</Link>
                                        <p className="masthead-tagline">a field guide to the living world</p>
                                    </Heading>

                                    <Button className="menu-button p-2 bg-canopy" slot="close">
                                        <svg className="w-10 stroke-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </Button>
                                </div>

                                <div>
                                    {
                                        routes.map((item, index) => (
                                            <Link
                                                href={item.route}
                                                className={`${pathname === item.route ? 'row-label-active' : 'row-label-inactive'} filter-bar-rule flex justify-between items-center p-5 border-b`} key={index}>
                                                <div className="flex items-center gap-5">
                                                    <div className="row-index">{item.number}</div>
                                                    <div>{item.page}</div>
                                                </div>

                                                <div className={`${pathname === item.route ? 'masthead-tagline block text-moss' : 'hidden'}`}>
                                                    Current
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>

                            <Footer />
                        </Dialog>
                    </Modal>
                </ModalOverlay>
            </DialogTrigger>  
            </div>
        </div>
    );
}
