import { useContext, useEffect } from "react";

import Layout from "../Layout/Layout"
import useDarkMode from '../../common/useDarkMode'
import useAppGuard from "../../common/useAppGuard";

import HardwareStateContext from "./HardwareStateContext";

import TemperaturesCard from "./TemperaturesCard";
import OpModeCard from "./OpModeCard";
import ManualModeCard from "./ManualModeCard";
import useTitle from '../../common/useTitle'
import ApiContext from "../../common/ApiContext";

function IndexPage() {

    useDarkMode("index-body");
    useTitle('TTC | Tea Cooler');
    useAppGuard();

    const hardwareState = useContext(HardwareStateContext);
    const api = useContext(ApiContext);

    useEffect(() => {
        hardwareState.get();
        const sse = new EventSource('//' + api.ttcIp + '/events');

        sse.onopen = () => {
            console.log("Connected to SSE channel.");
        };
        sse.onmessage = (event) => {
            console.log(event);
        };
        sse.addEventListener('ping', e => {
            console.log(e);
        });
        sse.addEventListener('teaState', event => {
            const newHardwareState = JSON.parse(event.data);
            console.log("Tea state received trough SSE: " + event.data);
            hardwareState.setRelay1(newHardwareState.relay1);
            hardwareState.setRelay2(newHardwareState.relay2);
            hardwareState.setTemperature(newHardwareState.temperature);
            hardwareState.setTargetTemperature(newHardwareState.targetTemperature);
            hardwareState.setMode(newHardwareState.mode);
            hardwareState.addDataToTemperatureChart(newHardwareState.temperature, newHardwareState.targetTemperature);
        });
        sse.onerror = (error) => {
            if (error.target.readyState !== EventSource.OPEN) {
                console.log("SSE channel disconnected.");
            }
            else {
                console.error('EventSource failed:', error);
            }
        };

        function closeSse() {
            console.log('SSE connection temrinated.')
            sse.close();
        }

        return () => closeSse();

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
