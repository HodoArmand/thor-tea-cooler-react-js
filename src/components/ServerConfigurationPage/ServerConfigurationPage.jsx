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

// TODO: add page title changes

function ServerConfigurationPage() {

    useDarkMode("config-body");
    useAppGuard();

    const api = useContext(ApiContext);
    const modal = useContext(ModalContext);

    const [isApiRequesting, setIsApiRequesting] = useState();

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => serverConfig.get(), []);

    const [debugMode, setDebugMode] = useState(false);
    const [port, setPort] = useState(80);
    const [apiKeyLength, setApiKeyLength] = useState(50);
    const [apiThrottleIntervalMs, setApiThrottleIntervalMs] = useState(1000);
    const [maxStoredUsers, setMaxStoredUsers] = useState(20);
    const [maxApiKeysPerUser, setMaxApiKeysPerUser] = useState(3);
    const [maxApiKeysTotal, setMaxApiKeysTotal] = useState(60);
    const [selfHostMode, setSelfHostMode] = useState(false);


    const serverConfig = {
        get: () => {
            setIsApiRequesting(true);
            axios.get('getServerConfig')
                .then(response => {
                    response = api.formatResponse(response);
                    let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                    if (response.statusCode === 200 && response.status === "ok") {
                        let newConfig = JSON.parse(response.msg);
                        setDebugMode(newConfig.debugMode);
                        setPort(newConfig.port);
                        setApiKeyLength(newConfig.apiKeyLength);
                        setApiThrottleIntervalMs(newConfig.apiThrottleIntervalMs);
                        setMaxStoredUsers(newConfig.maxStoredUsers);
                        setMaxApiKeysPerUser(newConfig.maxApiKeysPerUser);
                        setMaxApiKeysTotal(newConfig.maxApiKeysTotal);
                        setSelfHostMode(newConfig.selfHostMode);
                        console.log("-0- getServerConfig: " + response.msg);
                        setIsLoaded(true);
                    }
                    else {
                        console.log("-1- getServerConfig: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                        modal.setTitle('Error');
                        modal.setDesc('Server configuration failed to load: ' + response.msg + ' ' + api.formatFieldErrorsToHtmlList(response.fieldErrors));
                        modal.setIsOpen(true);
                    }
                })
                .catch(error => {
                    error = api.formatResponse(error);
                    let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                    console.log("-1- getServerConfig error: " + error.msg + '\nField Errors:\n' + fieldErrors);
                    modal.setTitle('Error');
                    modal.setDesc('Server configuration failed to load: ' + error.msg + ' ' + api.formatFieldErrorsToHtmlList(error.fieldErrors));
                    modal.setIsOpen(true);
                }).finally(() => {
                    setIsApiRequesting(false);
                });
        },
        set: () => {
            setIsApiRequesting(true);
            let requestData = new URLSearchParams({
                debugMode: debugMode,
                oneWireIoPin: port,
                relayIoPin1: apiKeyLength,
                relayIoPin2: apiThrottleIntervalMs,
                temperatureSensorOffsetCelsius: maxStoredUsers,
                temperatureTargetDefault: maxApiKeysPerUser,
            });
            axios.put('setServerConfig', requestData)
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
    }

    return (
        <ConfigurationLayout>
            <div id="configPageContentContainer"
                className="container w-full sm:w-fit flex flex-row justify-center content-start px-2 sm:px-10 py-2 sm:py-5 sm:m-5 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm sm:rounded-lg shadow-md">
                <div id="configPageContentLayout" className="w-fit h-full flex flex-col space-y-2 pt-2">
                    <h2>Server configuration</h2>
                    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 p-5">
                        <StyledToggleInput imgSrc={SvgLibrary.bug} imgAlt='🐞' labelText='Debug mode' inputName='debugMode' setFormValue={setDebugMode} formValue={debugMode} />
                        <StyledNumberInput imgSrc={SvgLibrary.hierarchy} imgAlt="🖧" label="HTTP Port" inputName="port" setFormValue={setPort} defaultNumericValue={port} min={0} max={65535} step="1.0" />
                        <StyledNumberInput imgSrc={SvgLibrary.key} imgAlt="🔑" label="API key length" inputName="apiKeyLength" setFormValue={setApiKeyLength} defaultNumericValue={apiKeyLength} min={10} max={254} step="1.0" />
                        <StyledNumberInput imgSrc={SvgLibrary.key} imgAlt="🔑" label="API throttle interval" inputName="apiThrottleIntervalMs" setFormValue={setApiThrottleIntervalMs} defaultNumericValue={apiThrottleIntervalMs} min={0} step="1.0" />
                        <StyledNumberInput imgSrc={SvgLibrary.userGroup} imgAlt="👥" label="Max stored users" inputName="maxStoredUsers" setFormValue={setMaxStoredUsers} defaultNumericValue={maxStoredUsers} min={1} step="1.0" />
                        <StyledNumberInput imgSrc={SvgLibrary.key} imgAlt="🔑" label="Max API keys per user" inputName="maxApiKeysPerUser" setFormValue={setMaxApiKeysPerUser} defaultNumericValue={maxApiKeysPerUser} min={1} step="1.0" />
                        <StyledNumberInput imgSrc={SvgLibrary.key} imgAlt="🔑" label="Max API keys total" inputName="maxApiKeysTotal" setFormValue={setMaxApiKeysTotal} defaultNumericValue={maxApiKeysTotal} min={1} step="1.0" />
                        <StyledToggleInput imgSrc={SvgLibrary.hierarchy} imgAlt='🖧' labelText='Self Host mode' inputName='selfHostMode' setFormValue={setSelfHostMode} formValue={selfHostMode} />
                    </div>
                    <button id="saveServerConfigurationButton" type="button" onClick={() => serverConfig.set()} className="button-save w-full sm:w-1/2 self-center !mt-5 disabled:control-disabled" disabled={isApiRequesting}>
                        <div className={(isApiRequesting ? '!hidden' : '') + " flex flew-row gap-2"}><img src={SvgLibrary.floppy} alt="💾" className="injectable icon-md" />Save</div>
                        <div className={isApiRequesting ? '' : '!hidden'}><img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." /></div>
                    </button>
                </div>
            </div>
            <ConfigPageContentContainerLoader isLoaded={{ isLoaded, title: 'Server configuration' }} />
        </ConfigurationLayout>
    )
}

export default ServerConfigurationPage
