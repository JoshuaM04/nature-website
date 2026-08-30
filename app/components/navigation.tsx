export default function Navigation() {
    return (
        <div className="masthead-rule flex justify-between items-center w-full gap-5 p-5">
            <div>
                <a className="masthead-wordmark" href="">Understory</a>
                <p className="masthead-tagline">temperate forest field guide</p>
            </div>

            
            <button className="menu-button flex justify-center p-2">
                <svg className="w-10 stroke-canopy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>    
        </div>
    )
}