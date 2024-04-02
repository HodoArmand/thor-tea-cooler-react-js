import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import useReactPath from './common/useReactPath'

import "preline/preline";

import IndexPage from "./components/IndexPage/IndexPage"
import LoginPage from "./components/LoginPage/LoginPage"
import ConfigurationPage from "./components/ConfigurationPage/ConfigurationPage"
import HardwareConfigurationPage from "./components/HardwareConfigurationPage/HardwareConfigurationPage"
import UserConfigurationPage from "./components/UserConfigurationPage/UserConfigurationPage"
import ServerConfigurationPage from "./components/ServerConfigurationPage/ServerConfigurationPage"

import DarkModeContext from "./common/DarkModeContext"

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
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeLight, setDarkModeDark }}>
                        <IndexPage />
                    </DarkModeContext.Provider>}>
                </Route>
                <Route path="/index" element={
                    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeLight, setDarkModeDark }}>
                        <IndexPage />
                    </DarkModeContext.Provider>}>
                </Route>
                <Route path="/login" element={
                    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeLight, setDarkModeDark }}>
                        <LoginPage />
                    </DarkModeContext.Provider>}>
                </Route>
                <Route path="/configuration" element={
                    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeLight, setDarkModeDark }}>
                        <ConfigurationPage />
                    </DarkModeContext.Provider>}>
                </Route>
                <Route path="/userConfigurationPage" element={
                    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, setDarkModeLight, setDarkModeDark }}>
                        <UserConfigurationPage />
                    </DarkModeContext.Provider>}>
                </Route>
                <Route path="/hardwareConfigurationPage" element={
                    <DarkModeContext.Provider value={darkMode}>
                        <HardwareConfigurationPage />
                    </DarkModeContext.Provider>}>
                </Route>
                <Route path="/serverConfigurationPage" element={
                    <DarkModeContext.Provider value={darkMode}>
                        <ServerConfigurationPage />
                    </DarkModeContext.Provider>}>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);