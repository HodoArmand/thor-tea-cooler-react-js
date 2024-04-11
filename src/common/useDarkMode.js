import { useContext, useRef, useEffect } from 'react';

import DarkModeContext from '../common/DarkModeContext'

const useDarkMode = (bodyClass) => {
    const { darkMode } = useContext(DarkModeContext);

    const appBodyTag = useRef(document.getElementById("App"));
    const domBodyTag = useRef(document.getElementsByTagName("body")[0]);

    useEffect(() => {
        domBodyTag.current.className = darkMode ? 'dark' : '';
        appBodyTag.current.className = bodyClass;
    }, [darkMode]);

}

export default useDarkMode;