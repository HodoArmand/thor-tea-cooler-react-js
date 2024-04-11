import React, { useEffect } from 'react'

import Header from "./Header/Header"
import Footer from "./Footer/Footer"

import SVGInjectInstance from '@iconfu/svg-inject';
import Modal from './Modal/Modal';

function Layout({ children }) {

    useEffect(() => {
        SVGInjectInstance(document.querySelectorAll("img.injectable"));
    }
    );

    return (
        <>
            <Header />
            <main className='h-fit w-full'>
                {children}
            </main>
            <Footer />
            <Modal />
        </>
    )
}

export default Layout
