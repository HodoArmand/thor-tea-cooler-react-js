import { useContext, useRef, useEffect } from 'react';

import DarkModeContext from '../common/DarkModeContext'

const useDarkMode = (bodyClass) => {
    const { darkMode } = useContext(DarkModeContext);

    const bodyTag = useRef(document.getElementsByTagName("body")[0]);

    useEffect(() => {
        bodyTag.current.className = `${bodyClass} ${darkMode ? 'dark' : ''}`;
    }, [darkMode]);

}

export default useDarkMode;