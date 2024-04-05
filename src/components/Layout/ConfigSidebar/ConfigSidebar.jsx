import { useState } from 'react'

import SvgLibrary from '../../../common/SvgLibrary';

import ConfigNavLink from './ConfigNavLink'

function ConfigSidebar() {

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    return (
        <aside id="configSidebar" className={isSideBarOpen ? 'w-64' : 'w-32'}>
            <ConfigNavLink link='/userConfiguration' text="User" icon={SvgLibrary.user} iconAlt="👥" isSideBarOpen={isSideBarOpen} />
            <ConfigNavLink link='/configuration' text="Network" icon={SvgLibrary.wifi} iconAlt="🖧" isSideBarOpen={isSideBarOpen} />
            <ConfigNavLink link='/hardwareConfiguration' text="Hardware" icon={SvgLibrary.cpu} iconAlt="🖳" isSideBarOpen={isSideBarOpen} />
            <ConfigNavLink link='/serverConfiguration' text="Server" icon={SvgLibrary.server} iconAlt="☁" isSideBarOpen={isSideBarOpen} />
            <div id="configSideBarClose" className={"flex w-full pt-2 border-t-2 border-green-700/50 " + (!isSideBarOpen && '!hidden')}>
                <button type="button" onClick={() => setIsSideBarOpen(false)}>
                    <img src={SvgLibrary.chevronRight} alt="<" className="injectable icon-md flex-none rotate-180" />
                    <span className="font-medium">Close</span>
                </button>
            </div>
            <div id="configSideBarOpen" className={"hidden sm:flex w-full justify-center pt-2 border-t-2 border-green-700/50 " + (isSideBarOpen && '!hidden')}>
                <button type="button" onClick={() => setIsSideBarOpen(true)}>
                    <img src={SvgLibrary.chevronRight} alt=">" className="injectable icon-md flex-none" />
                </button>
            </div>
        </aside>
    )
}

export default ConfigSidebar
