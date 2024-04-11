import React, { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = props => {

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const modalData = { isOpen, setIsOpen, title, setTitle, desc, setDesc };

    return (
        <ModalContext.Provider value={modalData}>
            {props.children}
        </ModalContext.Provider>
    );
};

export { ModalContext as default, ModalProvider };