import { useState, useContext } from "react";
import axios from "axios";

import ConfigurationLayout from "../Layout/ConfigurationLayout"
import useDarkMode from '../../common/useDarkMode'
import SvgLibrary from "../../common/SvgLibrary";
import useAppGuard from "../../common/useAppGuard"
import ApiContext from "../../common/ApiContext";
import AuthContext from "../../common/AuthContext";
import ModalContext from "../Layout/Modal/ModalContext";

function UserConfigurationPage() {

    useDarkMode("config-body");
    useAppGuard();

    const api = useContext(ApiContext);
    const auth = useContext(AuthContext);
    const modal = useContext(ModalContext);

    const [isApiRequesting, setIsApiRequesting] = useState();

    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmed, setNewPasswordConfirmed] = useState('');

    const [createName, setCreateName] = useState('');
    const [createPassword, setCreatePassword] = useState('');
    const [createPasswordConfirmed, setCreatePasswordConfirmed] = useState('');

    const user = {
        edit: () => {
            setIsApiRequesting(true);
            let requestData = new URLSearchParams({
                name: newName,
                password: newPassword,
                password_confirmed: newPasswordConfirmed,
            });
            axios.put('editUser', requestData)
                .then(response => {
                    response = api.formatResponse(response);
                    let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                    if (response.statusCode === 201 && response.status === "ok") {
                        console.log("-0- editUser: " + response.msg);
                        modal.setTitle('Info');
                        modal.setDesc('User ' + newName + ' successfully edited.');
                        modal.setIsOpen(true);
                        auth.setName(newName);
                        setNewName('');
                        setNewPassword('');
                        setNewPasswordConfirmed('');
                    }
                    else {
                        modal.setTitle('Error');
                        modal.setDesc('User edit failed: ' + response.msg + ' ' + fieldErrors);
                        modal.setIsOpen(true);
                        console.log("-1- editUser: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                    }
                })
                .catch(error => {
                    error = api.formatResponse(error);
                    let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                    modal.setTitle('Error');
                    modal.setDesc('User edit failed: ' + error.msg + ' ' + api.formatFieldErrorsToHtmlList(error.fieldErrors));
                    modal.setIsOpen(true);
                    console.log("-1- editUser error: " + error.msg + '\nField Errors:\n' + fieldErrors);
                }).finally(() => {
                    setIsApiRequesting(false);
                });
        },
        create: () => {
            setIsApiRequesting(true);
            let requestData = new URLSearchParams({
                name: createName,
                password: createPassword,
                password_confirmed: createPasswordConfirmed,
            });
            axios.post('registerUser', requestData)
                .then(response => {
                    response = api.formatResponse(response);
                    let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                    if (response.statusCode === 201 && response.status === "ok") {
                        console.log("-0- registerUser: " + response.msg);
                        modal.setTitle('Info');
                        modal.setDesc('User ' + createName + ' successfully created.');
                        modal.setIsOpen(true);
                        setCreateName('');
                        setCreatePassword('');
                        setCreatePasswordConfirmed('');
                    }
                    else {
                        console.log("-1- registerUser: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                        modal.setTitle('Error');
                        modal.setDesc('User register failed: ' + response.msg + ' ' + api.formatFieldErrorsToHtmlList(response.fieldErrors));
                        modal.setIsOpen(true);
                    }
                })
                .catch(error => {
                    error = api.formatResponse(error);
                    let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                    console.log("-1- registerUser error: " + error.msg + '\nField Errors:\n' + fieldErrors);
                    modal.setTitle('Error');
                    modal.setDesc('User register failed: ' + error.msg + ' ' + api.formatFieldErrorsToHtmlList(error.fieldErrors));
                    modal.setIsOpen(true);

                }).finally(() => {
                    setIsApiRequesting(false);
                });
        },
    };

    const handleNewPassword = (value) => {
        setNewPassword(value);
        setNewPasswordConfirmed('');
    }

    const handleCreatePasswordChange = (value) => {
        setCreatePassword(value);
        setCreatePasswordConfirmed('');
    }

    return (
        <ConfigurationLayout>
            <div id="configPageContentContainer"
                className="container w-full sm:w-fit flex flex-row justify-center content-start px-2 sm:px-10 py-5 sm:m-5 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm sm:rounded-lg shadow-md">
                <div id="configPageContentLayout" className="w-fit h-full flex flex-col space-y-2 pt-2">
                    <h2 className="dark:text-gray-50">User profile</h2>
                    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 p-5">
                        <div>
                            <div className="block input-label-top">
                                <img src={SvgLibrary.user} alt="" className="injectable inline-block icon-md mr-1" />
                                <span>Name</span>
                            </div>
                            <div id="info-name" className="py-3 px-4 block w-full text-input italic">{auth.userName}</div>
                        </div>
                        <div id="input-group-name">
                            <label htmlFor="name" className="block input-label-top">
                                <img src={SvgLibrary.user} alt="" className="injectable inline-block icon-md mr-1" />
                                <span>New name</span>
                            </label>
                            <input type="text" autoComplete="new-password" id="name" name="name" minLength="1" maxLength="128" value={newName} onChange={(e) => setNewName(e.target.value)}
                                className="requestData py-3 px-4 block w-full text-input" />
                        </div>
                        <div id="input-group-password">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="block input-label-top">
                                    <img src={SvgLibrary.key} alt="🔑" className="injectable inline-block icon-md mr-1" />
                                    <span>New password</span>
                                </label>
                            </div>
                            <input type="password" autoComplete="new-password" id="password" name="password" minLength="1" maxLength="128" value={newPassword} onChange={(e) => handleNewPassword(e.target.value)}
                                className="requestData py-3 px-4 block w-full text-input" />
                        </div>
                        <div id="input-group-password_confirmed">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password_confirmed" className="block input-label-top">
                                    <img src={SvgLibrary.key} alt="🔑" className="injectable inline-block icon-md mr-1" />
                                    <span>Confirm new password</span>
                                </label>
                            </div>
                            <input type="password" autoComplete="new-password" id="password_confirmed" name="password_confirmed" minLength="1" maxLength="128" value={newPasswordConfirmed} onChange={(e) => setNewPasswordConfirmed(e.target.value)}
                                className="requestData py-3 px-4 block w-full text-input" />
                        </div>
                    </div>
                    <button id="editUserButton" type="button" onClick={() => user.edit()} className="button-save w-full sm:w-1/2 self-center !mt-5 disabled:control-disabled" disabled={isApiRequesting}>
                        <div className={(isApiRequesting ? '!hidden' : '') + " flex flew-row gap-2"}><img src={SvgLibrary.floppy} alt="💾" className="injectable icon-md" />Save</div>
                        <div className={isApiRequesting ? '' : '!hidden'}><img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." /></div>
                    </button>
                    <h2 className="dark:text-gray-50">Delete Account</h2>
                    <div className="p-5 dark:text-gray-100">This action is permanent and restoring your account after deletion will not be possible!</div>
                    <button id="deleteUserConfirmButton" type="button" className="button-delete w-full sm:w-1/2 self-center !mt-5 disabled:control-disabled"
                        onClick={() => console.log("ttcClient.ui.openModal('deleteConfirm','Confirm delete','Are you sure you want to delete your account? This action is permanent and your account can not be restored later.')")}
                    >
                        <img src={SvgLibrary.trashX} alt="🗑" className="injectable icon-md" />
                        <span>Delete</span>
                    </button>

                    <h2 className="dark:text-gray-50">New User</h2>
                    <div className="w-full h-full flex flex-col items-center space-y-2 p-5">
                        <div id="input-group-register-name" className="w-full sm:w-2/3 md:w-1/2">
                            <label htmlFor="reg_name" className="block input-label-top">
                                <img src={SvgLibrary.user} alt="" className="injectable inline-block icon-md mr-1" />
                                <span>Name</span>
                            </label>
                            <input type="text" autoComplete="new-password" id="reg_name" name="name" minLength="1" maxLength="128" value={createName} onChange={(e) => setCreateName(e.target.value)}
                                className="requestData py-3 px-4 block w-full text-input" />
                        </div>
                        <div id="input-group-register-password" className="w-full sm:w-2/3 md:w-1/2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="reg_password" className="block input-label-top">
                                    <img src={SvgLibrary.key} alt="🔑" className="injectable inline-block icon-md mr-1" />
                                    <span>Password</span>
                                </label>
                            </div>
                            <input type="password" autoComplete="new-password" id="reg_password" name="password" minLength="1" maxLength="128" value={createPassword} onChange={(e) => handleCreatePasswordChange(e.target.value)}
                                className="requestData py-3 px-4 block w-full text-input" />
                        </div>
                        <div id="input-group-register-password-confirm" className="w-full sm:w-2/3 md:w-1/2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="reg_password_confirmed" className="block input-label-top">
                                    <img src={SvgLibrary.key} alt="🔑" className="injectable inline-block icon-md mr-1" />
                                    <span>Confirm password</span>
                                </label>
                            </div>
                            <input type="password" autoComplete="new-password" id="reg_password_confirmed" name="password_confirmed" minLength="1" maxLength="128" value={createPasswordConfirmed} onChange={(e) => setCreatePasswordConfirmed(e.target.value)}
                                className="requestData py-3 px-4 block w-full text-input" />
                        </div>
                    </div>
                    <button id="createUserButton" type="button" onClick={() => user.create()} className="button-save w-full sm:w-1/2 self-center !mt-5 disabled:control-disabled" disabled={isApiRequesting}>
                        <div className={(isApiRequesting ? '!hidden' : '') + " flex flew-row gap-2"}><img src={SvgLibrary.userPlus} alt="+" className="injectable icon-md" />Register</div>
                        <div className={isApiRequesting ? '' : '!hidden'}><img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." /></div>
                    </button>
                </div>
            </div>
        </ConfigurationLayout >
    )
}

export default UserConfigurationPage
