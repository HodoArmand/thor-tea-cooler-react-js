import React, { createContext, useContext } from "react";

import axios from "axios";

import ApiContext from "./ApiContext";

const AuthContext = createContext();

const AuthProvider = props => {

    const api = useContext(ApiContext);

    class TtcApiAuth {
        get userName() {
            return this._userName;
        }

        set userName(value) {
            this._userName = value;
        }

        get apiKey() {
            return this._apiKey;
        }

        set apiKey(value) {
            this._apiKey = value;
        }

        setName(value) {
            this.userName = value;
            localStorage.setItem("ttcUserName", value);
        }
        setApiKey(value) {
            this._apiKey = value;
            localStorage.setItem("ttcApiKey", value);
            axios.defaults.headers.common['Authorization'] = "Bearer " + value;
        }

        async guard() {
            if (this.apikey === 'unset') { return false };

            try {
                let res = await axios.get('getHardwareState');
                return res.data ? true : false;
            }
            catch {
                return false;
            }
        }

        login = (name_, password_) => {

            let requestData = new URLSearchParams({
                name: name_,
                password: password_,
            });

            return axios.post('login', requestData)
                .then(response => {
                    response = api.formatResponse(response);
                    let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                    if (response.statusCode === 201 && response.status === "ok") {
                        this.setName(name_)
                        this.setApiKey(response.msg);
                        return true;
                    }
                    else {
                        console.log("-1- login: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                        return false;
                    }
                })
                .catch(error => {
                    error = api.formatResponse(error);
                    let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                    console.log("-1- login error: " + error.msg + '\nField Errors:\n' + fieldErrors);
                    return false;
                });
        };

        logout = () => {
            return axios.post('logout')
                .then(response => {
                    response = api.formatResponse(response);
                    let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                    if (response.statusCode === 201 && response.status === "ok") {
                        this.setName('unset');
                        this.setApiKey('unset');
                        return true;
                    }
                    else {
                        //  403 or 500
                        console.log("-1- logout: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                        return false;
                    }
                })
                .catch(error => {
                    console.log("-1- logout: " + error);
                    return false;
                });
        };

        constructor() {
            this.apiKey = localStorage.getItem("ttcApiKey") ?? "unset";
            if (this.apiKey != "unset") {
                axios.defaults.headers.common['Authorization'] = "Bearer " + this.apiKey;
            }
            let storedUserName = localStorage.getItem("ttcUserName");
            this.userName = storedUserName ? storedUserName : "unset";
        }
    }

    const auth = new TtcApiAuth();

    return (
        <AuthContext.Provider value={auth}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext as default, AuthProvider };