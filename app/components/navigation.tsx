'use client';
import { DialogTrigger, ModalOverlay, Modal, Dialog, Heading, Button} from 'react-aria-components';

export default function Navigation() {
    return (
        <div className="masthead-rule flex justify-between items-center gap-5 p-5 w-full">
            <div>
                <a className="masthead-wordmark" href="">Understory</a>
                <p className="masthead-tagline">temperate forest field guide</p>
            </div>

            
            <DialogTrigger>
                <Button className="menu-button flex justify-center p-2">
                    <svg className="w-10 stroke-canopy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </Button>

                <ModalOverlay className="fixed inset-0 z-50 bg-surface">
                    <Modal className="w-full h-full">
                        <Dialog>
                            <div className="masthead-rule flex justify-between items-center gap-5 p-5 bg-page">
                                <Heading>
                                    <a className="masthead-wordmark" href="">Understory</a>
                                    <p className="masthead-tagline">temperate forest field guide</p>
                                </Heading>

                                <Button className="menu-button p-2 bg-canopy" slot="close">
                                    <svg className="w-10 stroke-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </Button>
                            </div>
                        </Dialog>
                    </Modal>
                </ModalOverlay>
            </DialogTrigger>  
        </div>
    );
}