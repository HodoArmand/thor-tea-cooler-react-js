import React from 'react'

import SvgLibrary from '../../../common/SvgLibrary'

function DarkModeToggle() {
    return (
        <>
            <a className="hs-dark-mode-active:hidden flex hs-dark-mode nav-text flex-row space-x-2"
                href="#!" data-hs-theme-click-value="dark">
                <img src={SvgLibrary.moon} className="injectable icon-md" alt="☾" />
                <div className="sm:hidden">Light/Dark mode</div>
            </a>
            <a className="hs-dark-mode-active:flex hidden hs-dark-mode nav-text flex-row space-x-2"
                href="#!" data-hs-theme-click-value="light">
                <img src={SvgLibrary.sun} className="injectable icon-md" alt="☀" />
                <div className="sm:hidden">Light/Dark mode</div>
            </a>
        </>
    )
}

export default DarkModeToggle
