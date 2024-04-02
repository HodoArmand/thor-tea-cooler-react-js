import Layout from "../Layout/Layout"
import useDarkMode from '../../common/useDarkMode'

function IndexPage() {

    useDarkMode("index-body");

    return (
        <Layout>
            Index Page
        </Layout>
    )
}

export default IndexPage
