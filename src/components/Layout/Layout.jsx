import React, { useEffect } from 'react'

import Header from "./Header/Header"
import Footer from "./Footer/Footer"

import SVGInjectInstance from '@iconfu/svg-inject';

function Layout({ children }) {

    useEffect(() => {
        SVGInjectInstance(document.querySelectorAll("img.injectable"));
        // console.log("SVGs injected");
    }
    );

    return (
        <>
            <Header />
            <main className='h-fit w-full'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
