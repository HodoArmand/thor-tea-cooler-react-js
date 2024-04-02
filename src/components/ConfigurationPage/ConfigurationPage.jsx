import Layout from "../Layout/Layout"
import useDarkMode from '../../common/useDarkMode'

function ConfigurationPage() {

    useDarkMode("config-body");

    return (
        <Layout>
            Config
        </Layout>
    )
}

export default ConfigurationPage
