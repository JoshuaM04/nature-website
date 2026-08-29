export default function Navigation() {
    return (
        <div className="flex justify-between items-center gap-5 border-b-2 w-screen pb-5 pl-5 pr-5">
            <div>
                <a className="masthead-wordmark" href="">Understory</a>
                <p className="tagline">temperate forest field guide</p>
            </div>

            
            <button className="nav-button flex justify-center border border-rule">
                <svg className="w-15 stroke-canopy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>    
        </div>
    )
}