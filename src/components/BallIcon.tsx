import React from 'react';

export const BallIcon: React.FC<{ color: string; name: string; size?: number }> = ({ color, name, size = 30 }) => {
    let ballColor = color;
    if (name === "Bowling") {
        ballColor = "red";
    }

    return (
        <svg width={size} height={size} style={{ marginRight: '8px', verticalAlign: 'middle' }} viewBox="0 0 20 20">
            <defs>
                <clipPath id="ballClip">
                    <circle cx="10" cy="10" r="8" />
                </clipPath>
            </defs>
            <circle cx="10" cy="10" r="8" fill={ballColor} />

            {name === "Basketball" && (
                <g stroke="black" strokeWidth="0.8" fill="none" clipPath="url(#ballClip)">
                    <path d="M2 10 L18 10" />
                    <path d="M10 2 L10 18" />
                    <path d="M2 3 Q 10 12 18 3" />
                    <path d="M2 17 Q 10 8 18 17" />
                </g>
            )}

            {name === "Baseball" && (
                <g stroke="red" strokeWidth="0.8" fill="none" clipPath="url(#ballClip)">
                    <path d="M4 4 Q 10 10 16 4" />
                    <path d="M4 16 Q 10 10 16 16" />
                </g>
            )}

            {name === "Soccer" && (
                <g fill="black" clipPath="url(#ballClip)">
                    <path transform="translate(1.3,1), scale(1.14)" d="M2.7424 2.50881L3.2384 3.01441M1.4784 10.5792C2.2176 11.3184 3.2 11.2032 4.1216 11.2256M2.4448 4.69761C0.873601 5.82081 0.492801 8.10241 0.550401 8.08961M4.4416 4.86401C4.2784 6.05761 4.7104 7.36961 5.6064 8.76801M5.264 1.44321C5.7664 0.940811 6.7552 0.588811 8.0576 0.390411M6.368 13.5488C6.208 13.9712 6.2496 14.5568 6.3424 15.1808M6.5408 2.75521C7.4432 2.85761 9.0752 2.99201 10.368 3.72481M9.0752 12.1856C10.0672 12.7392 11.152 12.976 12.4672 12.7616M11.3792 6.33601C10.6048 7.40481 9.6704 8.40001 8.5888 9.33121M12.1376 2.55041C11.7824 1.88801 11.1904 1.35041 10.5408 0.841611M14.208 4.94081C14.528 4.95041 14.8384 5.08161 15.136 5.39201M13.7344 6.97601C14.24 7.92641 14.3136 9.27361 14.3872 10.624" stroke="black" strokeWidth="0.2" fill="none" />
                    <path transform="translate(1.3,1), scale(1.14)" d="M2.8032 2.56C3.5808 2.0704 4.3968 1.5904 5.5424 1.2032C5.9936 1.5776 6.352 2.1856 6.7328 2.7776C5.8112 3.6576 4.9344 4.5184 4.416 5.1968C3.5392 5.1168 3.104 5.1904 2.048 5.0048C2.0576 4.224 2.3168 3.408 2.8032 2.56ZM12.096 2.432C12.9632 3.2256 13.8144 4.0256 14.4128 4.9536C14.2368 5.792 14.0768 6.7232 13.8368 7.2064C13.088 7.0944 12.1216 6.8064 11.2128 6.5664C10.7712 5.424 10.4736 4.5664 10.1248 3.6096C10.7968 3.1104 11.4592 2.6624 12.096 2.432ZM1.6224 12.1376C0.767357 10.814 0.344674 9.25747 0.412797 7.6832L0.601597 7.6608C0.774397 8.7552 0.998397 9.8176 1.5968 10.6304C1.4816 11.2032 1.5904 11.664 1.76 12.096L1.6224 12.1376ZM5.4528 8.5376C6.6208 8.7296 7.7472 8.9216 8.8448 9.1136C9.184 10.1792 9.2288 11.248 9.344 12.3136C8.5024 13.0112 7.344 13.232 6.3232 13.6576C5.1328 12.8896 4.6496 12.032 3.968 11.2C4.3584 10.3008 4.7904 9.4048 5.4528 8.5376ZM15.0944 10.7072C14.5216 12.2134 13.4851 13.4987 12.1344 14.3776L11.7632 14.3616C12.032 13.9552 12.128 13.4112 12.1408 12.8C12.8832 12.4448 13.6256 11.3184 14.368 10.3296C14.6432 10.4256 14.8768 10.56 15.0944 10.7072ZM7.776 15.5936C6.671 15.5601 5.58661 15.286 4.5984 14.7904C5.2352 15.0272 5.7728 15.248 6.3328 15.056C6.5024 15.296 6.896 15.4848 7.776 15.5936Z" fill="black" />
                </g>
            )}

            {name === "Pool" && (
                <g clipPath="url(#ballClip)">
                    <rect x="2" width="16" y="1.7" height="3" fill="white"></rect>
                    <rect x="2" width="16" y="15.3" height="3" fill="white"></rect>
                    <circle cx="10" cy="10" r="4" fill="white" />
                    <text x="9.8" y="12" fontSize="6" textAnchor="middle" fill="black" fontWeight="bold" fontFamily="Arial">10</text>
                </g>
            )}

            {name === "Bowling" && (
                <g fill="black">
                    <circle cx="8" cy="6" r="1" fill="#5f0000" />
                    <circle cx="12" cy="6" r="1" fill="#5f0000" />
                    <circle cx="10" cy="9" r="1" fill="#5f0000" />
                </g>
            )}

            {name.startsWith("Beach Ball") && (
                <g clipPath="url(#ballClip)">
                    <path d="M 10 10 L 10 0 A 10 10 0 0 1 18 4 Z M 10 10 Z" fill="#fc4949" />
                    <path transform="rotate(120,10,10)" d="M 10 10 L 10 0 A 10 10 0 0 1 18 4 Z M 10 10 Z" fill="#f5d442" />
                    <path transform="rotate(240,10,10)" d="M 10 10 L 10 0 A 10 10 0 0 1 18 4 Z M 10 10 Z" fill="#1b9fc0" />

                    <circle cx="10" cy="10" r="2" fill="white" />
                </g>
            )}

            {name === "Tennis" && (
                <g clipPath="url(#ballClip)">
                    <path d="M 4 17 Q 8 10 4 3" fill="none" stroke="white" strokeWidth="1" />
                    <path d="M 16 17 Q 12 10 16 3" fill="none" stroke="white" strokeWidth="1" />
                </g>
            )}
        </svg>
    );
};
