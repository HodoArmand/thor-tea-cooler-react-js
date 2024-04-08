import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import useReactPath from './common/useReactPath'

import "preline/preline";

import IndexPage from "./components/IndexPage/IndexPage"
import LoginPage from "./components/LoginPage/LoginPage"
import NetworkConfigurationPage from "./components/NetworkConfigurationPage/NetworkConfigurationPage"
import HardwareConfigurationPage from "./components/HardwareConfigurationPage/HardwareConfigurationPage"
import UserConfigurationPage from "./components/UserConfigurationPage/UserConfigurationPage"
import ServerConfigurationPage from "./components/ServerConfigurationPage/ServerConfigurationPage"

import DarkModeContext from "./common/DarkModeContext"
import { ApiProvider } from "./common/ApiContext";
import { AuthProvider } from "./common/AuthContext";
import ErrorBoundary from "./common/ErrorBoundary";
import { HardwareStateProvider } from "./components/IndexPage/HardwareStateContext";

const App = () => {

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setDarkMode(localStorage.getItem('ttcDarkMode'));
    }, []);

    useEffect(() => {
        localStorage.setItem('ttcDarkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const path = useReactPath();
    useEffect(() => {
        window.HSStaticMethods.autoInit();
    }, [path]);

    function toggleDarkMode() {
        setDarkMode(!darkMode);
    }

    function setDarkModeLight() {
        setDarkMode(false);
    }

    function setDarkModeDark() {
        setDarkMode(true);
    }

    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <ApiProvider>
                            <AuthProvider>
                                <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeLight, setDarkModeDark }}>
                                    <HardwareStateProvider>
                                        <IndexPage />
                                    </HardwareStateProvider>
                                </DarkModeContext.Provider>
                            </AuthProvider>
                        </ApiProvider>
                    }>

                    </Route>
                    <Route path="/index" element={
                        <ApiProvider>
                            <AuthProvider>
                                <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeLight, setDarkModeDark }}>
                                    <HardwareStateProvider>
                                        <IndexPage />
                                    </HardwareStateProvider>
                                </DarkModeContext.Provider>
                            </AuthProvider>
                        </ApiProvider>
                    }>
                    </Route>
                    <Route path="/login" element={
                        <ApiProvider>
                            <AuthProvider>
                                <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeLight, setDarkModeDark }}>
                                    <LoginPage />
                                </DarkModeContext.Provider>
                            </AuthProvider>
                        </ApiProvider>
                    }>
                    </Route>
                    <Route path="/networkConfiguration" element={
                        <ApiProvider>
                            <AuthProvider>
                                <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeLight, setDarkModeDark }}>
                                    <NetworkConfigurationPage />
                                </DarkModeContext.Provider>
                            </AuthProvider>
                        </ApiProvider>
                    }>
                    </Route>
                    <Route path="/userConfiguration" element={
                        <ApiProvider>
                            <AuthProvider>
                                <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeLight, setDarkModeDark }}>
                                    <UserConfigurationPage />
                                </DarkModeContext.Provider>
                            </AuthProvider>
                        </ApiProvider>
                    }>
                    </Route>
                    <Route path="/hardwareConfiguration" element={
                        <ApiProvider>
                            <AuthProvider>
                                <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeLight, setDarkModeDark }}>
                                    <HardwareConfigurationPage />
                                </DarkModeContext.Provider>
                            </AuthProvider>
                        </ApiProvider>
                    }>
                    </Route>
                    <Route path="/serverConfiguration" element={
                        <ApiProvider>
                            <AuthProvider>
                                <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeLight, setDarkModeDark }}>
                                    <ServerConfigurationPage />
                                </DarkModeContext.Provider>
                            </AuthProvider>
                        </ApiProvider>
                    }>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    )
}

const container = document.getElementsByTagName("body")[0];
const root = createRoot(container);
root.render(<App />);