import { useRef, useEffect } from 'react'

import Layout from "../Layout/Layout"

function ConfigurationPage() {

    const bodyTag = useRef(document.getElementsByTagName("body")[0]);

    useEffect(() => {
        bodyTag.current.className = "config-body";
    }, []);

    return (
        <Layout>
            Config
        </Layout>
    )
}

export default ConfigurationPage
