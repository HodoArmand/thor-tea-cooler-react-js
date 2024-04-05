import React, { createContext, useState, useContext } from "react";
import axios from 'axios';

import ApiContext from "../../common/ApiContext";

const HardwareStateContext = createContext();

const HardwareStateProvider = props => {

    const api = useContext(ApiContext);

    const [relay1, setRelay1] = useState(false);
    const [relay2, setRelay2] = useState(false);
    const [temperature, setTemperature] = useState(20);
    const [targetTemperature, setTargetTemperature] = useState(50);
    const [mode, setMode] = useState('unset');

    const [isApiRequesting, setIsApiRequesting] = useState(false);

    const get = () => {
        setIsApiRequesting(true);
        axios.get('getHardwareState')
            .then(response => {
                response = api.formatResponse(response);
                let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                if (response.statusCode === 200 && response.status === "ok") {
                    let newHardwareState = JSON.parse(response.msg);
                    setRelay1(newHardwareState.relay1);
                    setRelay2(newHardwareState.relay2);
                    setTemperature(newHardwareState.temperature);
                    setTargetTemperature(newHardwareState.targetTemperature);
                    setMode(newHardwareState.mode);
                    console.log("-0- getHardwareState: " + response.msg);
                }
                else {
                    console.log("-1- getHardwareState: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error => {
                error = api.formatResponse(error);
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- getHardwareState error: " + error.msg + '\nField Errors:\n' + fieldErrors);
            }).finally(() => {
                setIsApiRequesting(false);
            });
    }

    const setFromSse = (sseMsg) => {
        console.log(sseMsg);
    }

    const connectSse = () => {
        console.log('SSE connected');
    }

    const disconnectSse = () => {
        console.log('SSE discconnected');
    }

    const postTargetTemperature = (celsius) => {
        setIsApiRequesting(true);

        let requestData = new URLSearchParams({
            targetTemperature: celsius
        });

        axios.post('setTargetTemperature', requestData)
            .then(response => {
                response = api.formatResponse(response);
                let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                if (response.statusCode === 201 && response.status === "ok") {
                    setTargetTemperature(celsius);
                }
                else {
                    console.log("-1- setTargetTemperature: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error => {
                error = api.formatResponse(error);
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- setTargetTemperature error: " + error.msg + '\nField Errors:\n' + fieldErrors);
            }).finally(() => {
                setIsApiRequesting(false);
            });
    }

    const postMode = (_mode) => {
        setIsApiRequesting(true);

        axios.post(_mode)
            .then(response => {
                response = api.formatResponse(response);
                let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                if (response.statusCode === 201 && response.status === "ok") {
                    get();
                }
                else {
                    console.log("-1- postMode/" + _mode + ': ' + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error => {
                error = api.formatResponse(error);
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- postMode/" + _mode + ': ' + error.msg + '\nField Errors:\n' + fieldErrors);
            }).finally(() => {
                setIsApiRequesting(false);
            });
    }

    const switchRelay = (relayNumber) => {
        setIsApiRequesting(true);

        let requestData = new URLSearchParams({
            relay: relayNumber
        });

        axios.post('switchRelay', requestData)
            .then(response => {
                response = api.formatResponse(response);
                let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                if (response.statusCode === 201 && response.status === "ok") {
                    get();
                }
                else {
                    console.log("-1- switchRelay/" + relayNumber + ': ' + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                }
            })
            .catch(error => {
                error = api.formatResponse(error);
                let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                console.log("-1- switchRelay/" + relayNumber + ': ' + error.msg + '\nField Errors:\n' + fieldErrors);
            }).finally(() => {
                setIsApiRequesting(false);
            });
    }

    const hardwareState = {
        get,
        isApiRequesting, setIsApiRequesting,
        setFromSse,
        connectSse,
        disconnectSse,
        postTargetTemperature,
        postMode,
        switchRelay,
        relay1, setRelay1,
        relay2, setRelay2,
        temperature, setTemperature,
        targetTemperature, setTargetTemperature,
        mode, setMode
    };

    return (
        <HardwareStateContext.Provider value={hardwareState}>
            {props.children}
        </HardwareStateContext.Provider>
    );
};

export { HardwareStateContext as default, HardwareStateProvider };