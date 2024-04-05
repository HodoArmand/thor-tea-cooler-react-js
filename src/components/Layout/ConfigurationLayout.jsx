import React, { useEffect } from 'react'

import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import ConfigSidebar from './ConfigSidebar/ConfigSidebar';

import SVGInjectInstance from '@iconfu/svg-inject';

function ConfigurationLayout({ children }) {

    useEffect(() => {
        SVGInjectInstance(document.querySelectorAll("img.injectable"));
    }
    );

    return (
        <>
            <Header />
            <main className="h-full w-full flex-auto flex flex-col sm:flex-row">
                <ConfigSidebar />
                <section id="configPageContent" className="w-full h-full sm:h-fit flex flex-row justify-center content-center">
                    {children}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default ConfigurationLayout
