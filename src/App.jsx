import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexPage from "./components/IndexPage/IndexPage"
import LoginPage from "./components/LoginPage/LoginPage"
import ConfigurationPage from "./components/ConfigurationPage/ConfigurationPage"
import HardwareConfigurationPage from "./components/HardwareConfigurationPage/HardwareConfigurationPage"
import UserConfigurationPage from "./components/UserConfigurationPage/UserConfigurationPage"
import ServerConfigurationPage from "./components/ServerConfigurationPage/ServerConfigurationPage"


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/index" element={<IndexPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/configuration" element={<ConfigurationPage />} />
                <Route path="/userConfigurationPage" element={<UserConfigurationPage />} />
                <Route path="/hardwareConfigurationPage" element={<HardwareConfigurationPage />} />
                <Route path="/serverConfigurationPage" element={<ServerConfigurationPage />} />
            </Routes>
        </BrowserRouter>
    )
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);