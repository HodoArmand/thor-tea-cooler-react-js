
import Layout from "../Layout/Layout"
import useDarkMode from '../../common/useDarkMode'
import useAppGuard from "../../common/useAppGuard";

function IndexPage() {

    useDarkMode("index-body");

    useAppGuard();

    return (
        <Layout>
            Index Page
        </Layout>
    )
}

export default IndexPage
