/* The small sprig the reference sets above a centred heading. It is drawn in
   the colour it inherits, so it reads on cream and on green alike. */
export default function Flourish() {
    return (
        <svg
            className="w-16 opacity-70"
            viewBox="0 0 96 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            aria-hidden="true">
            <path d="M2 12h30" />
            <path d="M64 12h30" />
            <path d="M48 3c-4 3-6 6-6 9" />
            <path d="M48 3c4 3 6 6 6 9" />
            <path d="M48 3v9" />
            <path d="M42 12h12" />
        </svg>
    );
}
