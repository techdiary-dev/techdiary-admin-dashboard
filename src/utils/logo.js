import React from 'react';

const Logo = ({ fillColor, strokeColor }) => {
    return (
        <svg width="141" height="23">
            <defs>
                <clipPath id="logo-dark_svg__a">
                    <path d="M0 0h141v23H0z"></path>
                </clipPath>
            </defs>
            <g data-name="Artboard \u2013 1" clipPath="url(#logo-dark_svg__a)">
                <text
                    data-name="Logo"
                    transform="translate(31 20)"
                    fill={fillColor}
                    stroke="rgba(0,0,0,0)"
                    fontSize="18"
                    fontFamily="Space Mono, monospace"
                    fontWeight="700">
                    <tspan x="0" y="0">
                        TECH DIARY
                    </tspan>
                </text>
                <g
                    fill="none"
                    stroke={strokeColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2">
                    <path data-name="Path 11" d="M17 9h1a4 4 0 010 8h-1"></path>
                    <path
                        data-name="Path 12"
                        d="M1 9h16v9a4 4 0 01-4 4H5a4 4 0 01-4-4z"></path>
                    <path data-name="Line 7" d="M5 2v3"></path>
                    <path data-name="Line 8" d="M9 2v3"></path>
                    <path data-name="Line 9" d="M13 2v3"></path>
                </g>
            </g>
        </svg>
    );
};

export default Logo;
