import { useEffect, useState, useContext } from "react";
import axios from "axios";

import ConfigurationLayout from "../Layout/ConfigurationLayout"
import useDarkMode from '../../common/useDarkMode'
import SvgLibrary from "../../common/SvgLibrary";
import useAppGuard from "../../common/useAppGuard"
import ApiContext from "../../common/ApiContext";
import ConfigPageContentContainerLoader from "../Layout/ConfigPageContentContainerLoader";
import ModalContext from "../Layout/Modal/ModalContext";
import StyledToggleInput from "../Layout/StyledToggleInput";
import useTitle from '../../common/useTitle'
import StyledTextInput from "../Layout/StyledTextInput";

function ConfigurationPage() {

    useDarkMode("config-body");
    useTitle('TTC | 🖧 Configuration');
    useAppGuard();

    const api = useContext(ApiContext);
    const modal = useContext(ModalContext);

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => networkConfig.get(), []);

    const [isApiRequesting, setIsApiRequesting] = useState();

    const [ip, setIp] = useState(api.ttcIp);
    const [ipChanged, setIpChanged] = useState(0);      //  0: reset, 1: ok 2: not ok 3: loading
    const [debugMode, setDebugMode] = useState(false);
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');

    function handleIpChange(value) {
        setIpChanged(0);
        setIp(value);
    }

    function handleTestIp() {
        setIpChanged(3);
        setIsApiRequesting(true);
        api.setTtcIp(ip);
        axios.get('isTtc')
            .then(response => {
                response = api.formatResponse(response);
                let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                if (response.statusCode === 200 && response.status === "yes") {
                    api.setTtcIp(ip);
                    setIpChanged(1);
                }
                else {
                    api.setTtcIp('unset');
                    setIpChanged(2);
                    console.log("-1- isTtc: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                    modal.setTitle('Error');
                    modal.setDesc('TTC IP test failed: ' + response.msg + ' ' + fieldErrors);
                    modal.setIsOpen(true);
                    modal.setType('info')
                }
            })
            .catch(error => {
                error = error.message;
                api.ttcIp = 'unset';
                setIpChanged(2);
                console.log("-1- isTtc: " + error);
                modal.setTitle('Error');
                modal.setDesc('No TTC device found on this address.');
                modal.setIsOpen(true);
                modal.setType('info')
            }).finally(() => {
                setIsApiRequesting(false);
            });;
    }


    const networkConfig = {
        get: () => {
            setIsApiRequesting(true);
            axios.get('getNetworkConfig')
                .then(response => {
                    response = api.formatResponse(response);
                    let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                    if (response.statusCode === 200 && response.status === "ok") {
                        let newNetworkConfig = JSON.parse(response.msg);
                        setDebugMode(newNetworkConfig.debugMode);
                        setSsid(newNetworkConfig.ssid);
                        setPassword(newNetworkConfig.password);
                        console.log("-0- getNetworkConfig: " + response.msg);
                        setIsLoaded(true);
                    }
                    else {
                        console.log("-1- getNetworkConfig: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                        modal.setTitle('Error');
                        modal.setDesc('Network configuration failed to load: ' + response.msg + ' ' + api.formatFieldErrorsToHtmlList(response.fieldErrors));
                        modal.setIsOpen(true);
                        modal.setType('info')
                    }
                })
                .catch(error => {
                    error = api.formatResponse(error);
                    let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                    console.log("-1- getNetworkConfig error: " + error.msg + '\nField Errors:\n' + fieldErrors);
                    modal.setTitle('Error');
                    modal.setDesc('Network configuration failed to load: ' + error.msg + ' ' + api.formatFieldErrorsToHtmlList(error.fieldErrors));
                    modal.setIsOpen(true);
                    modal.setType('info')
                }).finally(() => {
                    setIsApiRequesting(false);
                });
        },
        set: () => {
            setIsApiRequesting(true);
            let requestData = new URLSearchParams({
                debugMode: debugMode,
                ssid: ssid,
                password: password,
            });
            axios.put('setNetworkConfig', requestData)
                .then(response => {
                    response = api.formatResponse(response);
                    let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                    if (response.statusCode === 201 && response.status === "ok") {
                        console.log("-0- setNetworkConfig: " + response.msg);
                        modal.setTitle('Info');
                        modal.setDesc('Network configuration successfully saved.');
                        modal.setIsOpen(true);
                        modal.setType('info')
                    }
                    else {
                        console.log("-1- setNetworkConfig: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                        modal.setTitle('Error');
                        modal.setDesc('Network configuration failed to save: ' + response.msg + ' ' + api.formatFieldErrorsToHtmlList(response.fieldErrors));
                        modal.setIsOpen(true);
                        modal.setType('info')
                    }
                })
                .catch(error => {
                    error = api.formatResponse(error);
                    let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                    console.log("-1- setNetworkConfig error: " + error.msg + '\nField Errors:\n' + fieldErrors);
                    modal.setTitle('Error');
                    modal.setDesc('Network configuration failed to save: ' + error.msg + ' ' + api.formatFieldErrorsToHtmlList(error.fieldErrors));
                    modal.setIsOpen(true);
                    modal.setType('info')
                }).finally(() => {
                    setIsApiRequesting(false);
                });
        },
    }

    return (
        <ConfigurationLayout>
            <div id="configPageContentContainer"
                className={(isLoaded ? '' : 'hidden') + " container w-full sm:w-fit flex flex-row justify-center content-start px-2 sm:px-10 py-5 sm:m-5 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm sm:rounded-lg shadow-md dark:text-gray-100"}>
                <div id="configPageContentLayout" className="w-fit h-full flex flex-col space-y-2 pt-2">
                    <h2 className="dark:text-gray-50">Client Network configuration</h2>
                    <div id="input-group-ip" className="flex flex-col">
                        <label htmlFor="ttcIp" className="block input-label-top">TTC Address</label>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <input type="text" id="ttcIp" name="ttcIp" onInput={(e) => handleIpChange(e.target.value)} value={ip}
                                className="py-3 px-4 block w-full sm:w-4/6 text-input"
                            />
                            <button id="ttcIpTestButton" type="button" onClick={() => { handleTestIp() }} disabled={(ipChanged === 3)}
                                className="button-ttcIp-test">
                                <span className={(ipChanged === 3) ? '!hidden' : ''}>Test</span>
                                <span className={(ipChanged !== 1) ? '!hidden ' : ' '}>
                                    <img id="ttcIpOk" src={SvgLibrary.check} className="injectable ml-1 icon-md text-emerald-700 dark:text-emerald-600" alt="OK" />
                                </span>
                                <span className={(ipChanged !== 2) ? '!hidden ' : ' '}>
                                    <img id="ttcIpNotOk" src={SvgLibrary.navMenuOpened} className="injectable ml-1 icon-md text-rose-700 dark:text-rose-600" alt="X" />
                                </span>
                                <span className={(ipChanged !== 3) ? '!hidden ' : ' '}>
                                    <img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." />
                                </span>
                            </button>
                        </div>
                    </div>
                    <h2 className="dark:text-gray-50">Device Network configuration</h2>
                    <StyledToggleInput imgSrc={SvgLibrary.bug} imgAlt='🐞' labelText='Debug mode' inputName='debugMode' setFormValue={setDebugMode} formValue={debugMode} />
                    <StyledTextInput imgSrc={SvgLibrary.wifi} imgAlt='🖧' labelText='Network SSID' inputName='ssid' formValue={ssid} setFormValue={setSsid} autoComplete={false} />
                    <StyledTextInput imgSrc={SvgLibrary.key} imgAlt="🔑" labelText='Network password' inputName='password' formValue={password} setFormValue={setPassword} password={true} autoComplete={false} minLength='0' />
                    <button id="saveTtcNetworkConfigButton" type="button" onClick={() => networkConfig.set()} className={(isApiRequesting ? '!hidden' : '') + " button-save !mt-5 disabled:control-disabled"} disabled={ssid.length === 0 || password.length === 0}>
                        <img src={SvgLibrary.floppy} alt="💾" className="injectable icon-md" />
                        <span>Save</span>
                    </button>
                    <button id="saveTtcNetworkConfigButtonLoader" type="button" disabled
                        className={(isApiRequesting ? '' : '!hidden') + " button-save !mt-5"}>
                        <img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." />
                    </button>
                </div>
            </div>

            <ConfigPageContentContainerLoader isLoaded={{ isLoaded, title: 'Client Network configuration' }} />
        </ConfigurationLayout>
    )
}

export default ConfigurationPage;
