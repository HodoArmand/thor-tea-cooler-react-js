import { useRef, useEffect } from 'react'

import Layout from "../Layout/Layout"

function ServerConfigurationPage() {

    const bodyTag = useRef(document.getElementsByTagName("body")[0]);

    useEffect(() => {
        bodyTag.current.className = "config-body";
    }, []);

    return (
        <Layout>
            ServerConfigurationPage
        </Layout>
    )
}

export default ServerConfigurationPage
