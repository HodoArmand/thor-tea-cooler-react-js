import { useRef, useEffect } from 'react'

import Layout from "../Layout/Layout"

function UserConfigurationPage() {
    const bodyTag = useRef(document.getElementsByTagName("body")[0]);

    useEffect(() => {
        bodyTag.current.className = "config-body";
    }, []);

    return (
        <Layout>
            UserConfigurationPage
        </Layout>
    )
}

export default UserConfigurationPage
