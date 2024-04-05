import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

import SVGInjectInstance from '@iconfu/svg-inject';

import ApiContext from '../../common/ApiContext';
import AuthContext from '../../common/AuthContext';
import useDarkMode from '../../common/useDarkMode'

import DarkModeToggle from '../../components/Layout/Header/DarkModeToggle'

import SvgLibrary from '../../common/SvgLibrary';

function LoginPage() {

    useDarkMode("login-body");

    const navigate = useNavigate();

    useEffect(() => {
        SVGInjectInstance(document.querySelectorAll("img.injectable"));
    }
    );

    const api = useContext(ApiContext);
    const auth = useContext(AuthContext);

    const [ipChanged, setIpChanged] = useState(0);      //  0: reset, 1: ok 2: not ok 3: loading
    const [ip, setIp] = useState(api.ttcIp);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    function handleIpChange(value) {
        setIpChanged(0);
        setIp(value);
    }

    //  TODO: add modals for err msgs
    function handleTestIp() {
        setIpChanged(3);
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
                }
            })
            .catch(error => {
                error = error.message;
                api.ttcIp = 'unset';
                setIpChanged(2);
                console.log("-1- isTtc: " + error);
            });
    }

    //  TODO: modal
    async function handleLogin() {
        const loggedIn = await auth.login(name, password);
        if (loggedIn) {
            navigate('/');
        }
        else {
            console.log("Unsuccessful Login.");
        }
    }

    return (
        <main className="h-full w-full p-6 flex flex-row items-center">
            <div id="loginCard" className="loginCard relative">
                <div id="darkModeSwitchControls" className="absolute top-5 right-5 sm:right-7 sm:top-7">
                    <DarkModeToggle />
                </div>
                <img id="loginCardLogo" src={SvgLibrary.TtcLogo} className="injectable icon-5xl mb-2 opacity-100 dark:opacity-80" alt="TTC" />
                <div id="loginCardTitle" className="text-center">
                    <h1 className="block text-2xl font-bold text-green-800 dark:text-gray-50">Login</h1>
                </div>
                <form id="loginCardForm" className="block mt-5 w-full grid gap-y-4">
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
                    <div id="input-group-name">
                        <label htmlFor="name" className="block input-label-top">Username</label>
                        <input type="text" id="name" name="name" minLength="3" maxLength="32" value={name} onChange={(e) => setName(e.target.value)}
                            className="py-3 px-4 block w-full text-input" />
                    </div>
                    <div id="input-group-password">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="block input-label-top">Password</label>
                        </div>
                        <input type="password" id="password" name="password" minLength="8" maxLength="32" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="py-3 px-4 block w-full text-input" />
                    </div>
                    <button id="loginButtonLoader" type="button"
                        className={"button-login " + ((ipChanged !== 3) && ' !hidden ')} disabled>
                        <img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." />
                    </button>
                    <button id="loginButton" type="button" onClick={() => handleLogin()} disabled={name.length === 0 || password.length === 0 || ipChanged !== 1} className={"button-login " + ((name.length === 0 || password.length === 0 || ipChanged !== 1) && 'disabled:control-disabled ') + ((ipChanged === 3) && ' !hidden ')}>
                        Login
                    </button>

                </form>
            </div >
        </main >
    )
}

export default LoginPage
