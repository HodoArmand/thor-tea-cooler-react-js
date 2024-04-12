import { useState, useContext, useEffect } from "react";
import axios from "axios";

import ConfigurationLayout from "../Layout/ConfigurationLayout"
import useDarkMode from '../../common/useDarkMode'
import SvgLibrary from "../../common/SvgLibrary";
import useAppGuard from "../../common/useAppGuard"
import ApiContext from "../../common/ApiContext";
import ModalContext from "../Layout/Modal/ModalContext";
import StyledNumberInput from "../Layout/StyledNumberInput";
import ConfigPageContentContainerLoader from "../Layout/ConfigPageContentContainerLoader";
import StyledToggleInput from "../Layout/StyledToggleInput";

function HardwareConfigurationPage() {

    useDarkMode("config-body");
    useAppGuard();

    const api = useContext(ApiContext);
    const modal = useContext(ModalContext);

    const [isApiRequesting, setIsApiRequesting] = useState();

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => hardwareConfig.get(), []);

    const [debugMode, setDebugMode] = useState(false);
    const [oneWireIoPin, setOneWireIoPin] = useState(0);
    const [relayIoPin1, setRelayIoPin1] = useState(0);
    const [relayIoPin2, setRelayIoPin2] = useState(0);
    const [temperatureSensorOffsetCelsius, setTemperatureSensorOffsetCelsius] = useState(0.00);
    const [temperatureTargetDefault, setTemperatureTargetDefault] = useState(0.00);

    const hardwareConfig = {
        get: () => {
            setIsApiRequesting(true);
            axios.get('getHardwareConfig')
                .then(response => {
                    response = api.formatResponse(response);
                    let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                    if (response.statusCode === 200 && response.status === "ok") {
                        let newConfig = JSON.parse(response.msg);
                        setDebugMode(newConfig.debugMode);
                        setOneWireIoPin(newConfig.oneWireIoPin);
                        setRelayIoPin1(newConfig.relayIoPin1);
                        setRelayIoPin2(newConfig.relayIoPin2);
                        setTemperatureSensorOffsetCelsius(newConfig.temperatureSensorOffsetCelsius);
                        setTemperatureTargetDefault(newConfig.temperatureTargetDefault);
                        console.log("-0- getHardwareConfig: " + response.msg);
                        setIsLoaded(true);
                    }
                    else {
                        console.log("-1- getHardwareConfig: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                        modal.setTitle('Error');
                        modal.setDesc('Hardware configuration failed to load: ' + response.msg + ' ' + api.formatFieldErrorsToHtmlList(response.fieldErrors));
                        modal.setIsOpen(true);
                    }
                })
                .catch(error => {
                    error = api.formatResponse(error);
                    let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                    console.log("-1- getHardwareConfig error: " + error.msg + '\nField Errors:\n' + fieldErrors);
                    modal.setTitle('Error');
                    modal.setDesc('Hardware configuration failed to load: ' + error.msg + ' ' + api.formatFieldErrorsToHtmlList(error.fieldErrors));
                    modal.setIsOpen(true);
                }).finally(() => {
                    setIsApiRequesting(false);
                });
        },
        set: () => {
            setIsApiRequesting(true);
            let requestData = new URLSearchParams({
                debugMode: debugMode,
                oneWireIoPin: oneWireIoPin,
                relayIoPin1: relayIoPin1,
                relayIoPin2: relayIoPin2,
                temperatureSensorOffsetCelsius: temperatureSensorOffsetCelsius,
                temperatureTargetDefault: temperatureTargetDefault,
            });
            axios.put('setHardwareConfig', requestData)
                .then(response => {
                    response = api.formatResponse(response);
                    let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                    if (response.statusCode === 201 && response.status === "ok") {
                        console.log("-0- setHardwareConfig: " + response.msg);
                        modal.setTitle('Info');
                        modal.setDesc('Hardware configuration successfully saved.');
                        modal.setIsOpen(true);
                    }
                    else {
                        console.log("-1- setHardwareConfig: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                        modal.setTitle('Error');
                        modal.setDesc('Hardware configuration failed to save: ' + response.msg + ' ' + api.formatFieldErrorsToHtmlList(response.fieldErrors));
                        modal.setIsOpen(true);
                    }
                })
                .catch(error => {
                    error = api.formatResponse(error);
                    let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                    console.log("-1- setHardwareConfig error: " + error.msg + '\nField Errors:\n' + fieldErrors);
                    modal.setTitle('Error');
                    modal.setDesc('Hardware configuration failed to save: ' + error.msg + ' ' + api.formatFieldErrorsToHtmlList(error.fieldErrors));
                    modal.setIsOpen(true);
                }).finally(() => {
                    setIsApiRequesting(false);
                });
        },
        restartMcu: () => {
            setIsApiRequesting(true);
            axios.post('restartMcu')
                .then(response => {
                    response = api.formatResponse(response);
                    let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                    if (response.statusCode === 201 && response.status === "ok") {
                        console.log("-0- restartMcu: " + response.msg);
                        modal.setTitle('Info');
                        modal.setDesc("Microcontroller is restarting in 10 seconds.");
                        modal.setIsOpen(true);
                    }
                    else {
                        console.log("-1- restartMcu: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                        modal.setTitle('Error');
                        modal.setDesc('Microcontroller restart failed: ' + response.msg + ' ' + api.formatFieldErrorsToHtmlList(response.fieldErrors));
                        modal.setIsOpen(true);
                    }
                })
                .catch(error => {
                    error = api.formatResponse(error);
                    let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                    console.log("-1- restartMcu error: " + error.msg + '\nField Errors:\n' + fieldErrors);
                    modal.setTitle('Error');
                    modal.setDesc('Microcontroller restart failed: ' + error.msg + ' ' + api.formatFieldErrorsToHtmlList(error.fieldErrors));
                    modal.setIsOpen(true);
                }).finally(() => {
                    setIsApiRequesting(false);
                });
        },
    }

    return (
        <ConfigurationLayout>
            <div id="configPageContentContainer"
                className="container w-full sm:w-fit flex flex-row justify-center content-start px-2 sm:px-10 py-5 sm:m-5 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm sm:rounded-lg shadow-md">
                <div id="configPageContentLayout" className="w-fit h-full flex flex-col space-y-2 pt-2">
                    <h2>Hardware configuration</h2>
                    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 p-5">
                        <StyledToggleInput imgSrc={SvgLibrary.bug} imgAlt='🐞' labelText='Debug mode' inputName='debugMode' setFormValue={setDebugMode} formValue={debugMode} />
                        <StyledNumberInput imgSrc={SvgLibrary.temperature} imgAlt="🌡" label="OneWire IoPin" inputName="oneWireIoPin" setFormValue={setOneWireIoPin} defaultNumericValue={oneWireIoPin} min={0} max={39} step="1.0" />
                        <StyledNumberInput imgSrc={SvgLibrary.propeller} imgAlt="❊" label="Relay #1 IoPin" inputName="relayIoPin1" setFormValue={setRelayIoPin1} defaultNumericValue={relayIoPin1} min={0} max={39} step="1.0" />
                        <StyledNumberInput imgSrc={SvgLibrary.propeller} imgAlt="❊" label="Relay #2 IoPin" inputName="relayIoPin2" setFormValue={setRelayIoPin2} defaultNumericValue={relayIoPin2} min={0} max={39} step="1.0" />
                        <StyledNumberInput imgSrc={SvgLibrary.temperaturePlus} imgAlt="🌡" label="Sensor offset ℃" inputName="temperatureSensorOffsetCelsius" setFormValue={setTemperatureSensorOffsetCelsius} defaultNumericValue={temperatureSensorOffsetCelsius} min={-70.00} max={70.00} step=".10" />
                        <StyledNumberInput imgSrc={SvgLibrary.temperatureMinus} imgAlt="🌡" label="Target default ℃" inputName="temperatureTargetDefault" setFormValue={setTemperatureTargetDefault} defaultNumericValue={temperatureTargetDefault} min={20.00} max={75.00} step=".10" />
                    </div>
                    <button id="saveHardwareConfigurationButton" type="button" onClick={() => hardwareConfig.set()} className="button-save w-full sm:w-1/2 self-center !mt-5 disabled:control-disabled" disabled={isApiRequesting}>
                        <div className={(isApiRequesting ? '!hidden' : '') + " flex flew-row gap-2"}><img src={SvgLibrary.floppy} alt="💾" className="injectable icon-md" />Save</div>
                        <div className={isApiRequesting ? '' : '!hidden'}><img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." /></div>
                    </button>
                    <button id="restartMcuButton" type="button" onClick={() => hardwareConfig.restartMcu()} className="button-save w-full sm:w-1/2 self-center !mt-5 disabled:control-disabled" disabled={isApiRequesting}>
                        <div className={(isApiRequesting ? '!hidden' : '') + " flex flew-row gap-2"}><img src={SvgLibrary.power} alt="I/O" className="injectable icon-md" />Restart</div>
                        <div className={isApiRequesting ? '' : '!hidden'}><img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." /></div>
                    </button>
                </div>
            </div>
            <ConfigPageContentContainerLoader isLoaded={{ isLoaded, title: 'Hardware configuration' }} />
        </ConfigurationLayout>
    )
}

export default HardwareConfigurationPage
