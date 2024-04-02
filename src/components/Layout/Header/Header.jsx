import React from 'react'

import { Link } from 'react-router-dom'

import SvgLibrary from '../../../common/SvgLibrary'

import TtcNavLink from './TtcNavLink'
import LogoutButton from './LogoutButton'
import DarkModeToggle from './DarkModeToggle'

function Header() {
    return (
        <header className="app-header">
            <nav className="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <div className="flex items-center justify-between">
                    <Link className="flex flex-row items-center gap-x-2 text-xl font-semibold text-emerald-800 dark:text-green-50" to="/">
                        <img src={SvgLibrary.TtcLogo} className="icon-2xl" alt="TTC" />
                        <h1 className="hidden md:inline w-64 italic">Thor Tea Cooler</h1>
                        <h1 className="inline md:hidden w-32 italic">TTC</h1>
                    </Link>
                    <div id="mobileNavBarMenuToggleButton" className="sm:hidden">
                        <button type="button" className="hs-collapse-toggle p-2 nav-button"
                            data-hs-collapse="#navbar-image-and-text-1" aria-controls="navbar-image-and-text-1" aria-label="Toggle navigation">
                            <img className="hs-collapse-open:hidden icon-md injectable" src={SvgLibrary.navMenuBars} alt="≡" />
                            <img className="hs-collapse-open:block hidden icon-md injectable" src={SvgLibrary.navMenuOpened} alt="X" />
                        </button>
                    </div>
                </div>
                <div id="navbar-image-and-text-1" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5 sm:pr-2">
                        <TtcNavLink link="/" text="Tea Cooler" icon={SvgLibrary.mug} iconAlt="☕" />
                        <TtcNavLink link="/configuration" text="Configuration" icon={SvgLibrary.gear} iconAlt="⚙" />
                        <LogoutButton />
                        <DarkModeToggle />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
