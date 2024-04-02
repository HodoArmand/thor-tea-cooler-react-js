import React, { useEffect, useRef } from 'react'

import Layout from "../Layout/Layout"

function IndexPage() {

    const bodyTag = useRef(document.getElementsByTagName("body")[0]);

    useEffect(() => {
        bodyTag.current.className = "index-body";
    }, []);

    return (
        <Layout>
            Index Page
        </Layout>
    )
}

export default IndexPage
