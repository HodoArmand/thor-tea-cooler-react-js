import axios from "axios";
import React, { createContext } from "react";

class TtcApiInterface {

    get ttcIp() {
        return this._ttcIp;
    }

    set ttcIp(value) {
        this._ttcIp = value;
    }

    setTtcIp(value) {
        this._ttcIp = value;
        localStorage.setItem('ttcIp', value);
        axios.defaults.baseURL = `http://${this._ttcIp}`;
    }

    formatResponse(response) {
        if (isNaN(response.status) || response.status < 200 || response.status >= 300) {
            let error = response;
            return {
                statusCode: error.response.status,
                status: error.response.data.status,
                msg: error.response.data.msg,
                fieldErrors: error.response.data.fieldErrors
            };
        }
        else {
            return {
                statusCode: response.status,
                status: response.data.status,
                msg: response.data.msg,
                fieldErrors: response.data.fieldErrors
            };
        }
    }

    formatFieldErrorsToHtmlList(fieldErrors) {
        return fieldErrors ? ('<ul>' +
            fieldErrors.map(
                (fieldError) => ('<li>' + fieldError + '</li>')
            ).join('')
            + '</ul>'
        )
            : '';
    }

    async guard() {
        if (this.ttcIp === 'unset') { return false };
        let res;
        try {
            res = await axios.get('isTtc');
        }
        catch (e) {
            return false;
        }
        return res.data.status === 'yes';
    }

    constructor() {
        this._ttcIp = localStorage.getItem("ttcIp") ?? "unset"

        axios.defaults.timeout = 5000;
        axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.baseURL = "http://" + this.ttcIp;
        axios.defaults.crossDomain = true;
    }
}

const ApiContext = createContext();

const ApiProvider = props => {

    const api = new TtcApiInterface();


    return (
        <ApiContext.Provider value={api}>
            {props.children}
        </ApiContext.Provider>
    );
};

export { ApiContext as default, ApiProvider };