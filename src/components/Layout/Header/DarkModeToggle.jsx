
import SvgLibrary from '../../../common/SvgLibrary'

import { useContext } from 'react'
import DarkModeContext from '../../../common/DarkModeContext'


function DarkModeToggle() {

    const { setDarkModeLight, setDarkModeDark } = useContext(DarkModeContext);

    return (
        <>
            <button onClick={() => setDarkModeDark(true)}
                className="dark:hidden flex nav-text flex-row space-x-2"
            >
                <img src={SvgLibrary.moon} className="injectable icon-md" alt="☾" />
                <div className="sm:hidden">Light/Dark mode</div>
            </button>
            <button onClick={() => setDarkModeLight(false)}
                className="dark:flex hidden nav-text flex-row space-x-2"
            >
                <img src={SvgLibrary.sun} className="injectable icon-md" alt="☀" />
                <div className="sm:hidden">Light/Dark mode</div>
            </button>
        </>
    )
}

export default DarkModeToggle
