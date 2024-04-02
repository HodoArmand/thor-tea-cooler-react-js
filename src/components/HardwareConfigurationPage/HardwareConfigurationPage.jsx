import { useRef, useEffect } from 'react'

import Layout from "../Layout/Layout"

function HardwareConfigurationPage() {

    const bodyTag = useRef(document.getElementsByTagName("body")[0]);

    useEffect(() => {
        bodyTag.current.className = "config-body";
    }, []);

    return (
        <Layout>
            HW Config
        </Layout>
    )
}

export default HardwareConfigurationPage
