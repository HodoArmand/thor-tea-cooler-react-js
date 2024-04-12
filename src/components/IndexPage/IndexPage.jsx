import { useContext, useEffect } from "react";

import Layout from "../Layout/Layout"
import useDarkMode from '../../common/useDarkMode'
import useAppGuard from "../../common/useAppGuard";

import HardwareStateContext from "./HardwareStateContext";

import TemperaturesCard from "./TemperaturesCard";
import OpModeCard from "./OpModeCard";
import ManualModeCard from "./ManualModeCard";
import useTitle from '../../common/useTitle'

function IndexPage() {

    useDarkMode("index-body");
    useTitle('TTC | Tea Cooler');
    useAppGuard();

    const hardwareState = useContext(HardwareStateContext);

    useEffect(() => {
        hardwareState.get();
    }, []);

    return (
        <Layout>
            <div id="hardwareCards" className="w-full py-10 px-2 md:px-4 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TemperaturesCard />
                <OpModeCard />
                <ManualModeCard />
            </div>
        </Layout>
    )
}

export default IndexPage;
