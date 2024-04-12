import React, { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = props => {

    const [type, setType] = useState('info')
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [confirmButtontext, setConfirmButtontext] = useState('');
    const [callbackFunction, setCallbackFunction] = useState(null);

    const modalData = { type, setType, isOpen, setIsOpen, title, setTitle, desc, setDesc, confirmButtontext, setConfirmButtontext, callbackFunction, setCallbackFunction };

    return (
        <ModalContext.Provider value={modalData}>
            {props.children}
        </ModalContext.Provider>
    );
};

export { ModalContext as default, ModalProvider };