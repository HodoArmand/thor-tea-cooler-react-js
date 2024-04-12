import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ConfigurationLayout from "../Layout/ConfigurationLayout"
import useDarkMode from '../../common/useDarkMode'
import SvgLibrary from "../../common/SvgLibrary";
import useAppGuard from "../../common/useAppGuard"
import ApiContext from "../../common/ApiContext";
import AuthContext from "../../common/AuthContext";
import ModalContext from "../Layout/Modal/ModalContext";
import useTitle from '../../common/useTitle'
import StyledTextInput from "../Layout/StyledTextInput";

function UserConfigurationPage() {

    useDarkMode("config-body");
    useTitle('TTC | 👤 Configuration');
    useAppGuard();

    const navigate = useNavigate();

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
    const [deletePassword, setDeletePassword] = useState('');
    const [deletePasswordConfirmed, setDeletePasswordConfirmed] = useState('');

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
                        modal.setType('info')
                        auth.setName(newName);
                        setNewName('');
                        setNewPassword('');
                        setNewPasswordConfirmed('');
                    }
                    else {
                        modal.setTitle('Error');
                        modal.setDesc('User edit failed: ' + response.msg + ' ' + fieldErrors);
                        modal.setIsOpen(true);
                        modal.setType('info')
                        console.log("-1- editUser: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                    }
                })
                .catch(error => {
                    error = api.formatResponse(error);
                    let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                    modal.setTitle('Error');
                    modal.setDesc('User edit failed: ' + error.msg + ' ' + api.formatFieldErrorsToHtmlList(error.fieldErrors));
                    modal.setIsOpen(true);
                    modal.setType('info')
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
                        modal.setType('info')
                        setCreateName('');
                        setCreatePassword('');
                        setCreatePasswordConfirmed('');
                    }
                    else {
                        console.log("-1- registerUser: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                        modal.setTitle('Error');
                        modal.setDesc('User register failed: ' + response.msg + ' ' + api.formatFieldErrorsToHtmlList(response.fieldErrors));
                        modal.setIsOpen(true);
                        modal.setType('info');
                    }
                })
                .catch(error => {
                    error = api.formatResponse(error);
                    let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                    console.log("-1- registerUser error: " + error.msg + '\nField Errors:\n' + fieldErrors);
                    modal.setTitle('Error');
                    modal.setDesc('User register failed: ' + error.msg + ' ' + api.formatFieldErrorsToHtmlList(error.fieldErrors));
                    modal.setIsOpen(true);
                    modal.setType('info')

                }).finally(() => {
                    setIsApiRequesting(false);
                });
        },
        delete: () => {
            setIsApiRequesting(true);
            let requestData = new URLSearchParams({
                password: deletePassword,
                password_confirmed: deletePasswordConfirmed,
            });
            axios.delete('deleteUser',
                {
                    headers: axios.defaults.headers,
                    data: requestData
                })
                .then(response => {
                    response = api.formatResponse(response);
                    let fieldErrors = response.fieldErrors ? response.fieldErrors.join('\n') : 'none';
                    if (response.statusCode === 201 && response.status === "ok") {
                        console.log("-0- deleteUser: " + response.msg);
                        modal.setTitle('Info');
                        modal.setDesc('User deleted successfully, will be redirected to login page in 5 seconds.');
                        modal.setIsOpen(true);
                        modal.setType('info');
                        setDeletePassword('');
                        setDeletePasswordConfirmed('');
                        const redirect = setTimeout(() => {
                            modal.setIsOpen(false);
                            navigate("/login");
                            clearTimeout(redirect);
                        }, 5000);
                    }
                    else {
                        console.log("-1- deleteUser: " + response.status + response.msg + '\nField Errors:\n' + fieldErrors);
                        modal.setTitle('Error');
                        modal.setDesc('User deletion failed: ' + response.msg + ' ' + api.formatFieldErrorsToHtmlList(response.fieldErrors));
                        modal.setIsOpen(true);
                        modal.setType('info');
                    }
                })
                .catch(error => {
                    error = api.formatResponse(error);
                    let fieldErrors = error.fieldErrors ? error.fieldErrors.join('\n') : 'none';
                    console.log("-1- deleteUser error: " + error.msg + '\nField Errors:\n' + fieldErrors);
                    modal.setTitle('Error');
                    modal.setDesc('User deletion failed: ' + error.msg + ' ' + api.formatFieldErrorsToHtmlList(error.fieldErrors));
                    modal.setIsOpen(true);
                    modal.setType('info');

                }).finally(() => {
                    setIsApiRequesting(false);
                });
        },
        openDeleteModal: () => {
            modal.setTitle('Confirm delete');
            modal.setType('callback');
            modal.setConfirmButtontext('Yes, delete.');
            modal.setCallbackFunction(() => user.delete);
            modal.setDesc('Are you sure you want to delete your account? This action is permanent and your account can not be restored later.');
            modal.setIsOpen(true);
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

    const handleDeletePasswordChange = (value) => {
        setDeletePassword(value);
        setDeletePasswordConfirmed('');
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
                        <StyledTextInput imgSrc={SvgLibrary.user} labelText='New name' inputName='name' formValue={newName} setFormValue={setNewName} autoComplete={false} minLength='3' maxLength='32' />
                        <StyledTextInput imgSrc={SvgLibrary.key} imgAlt="🔑" labelText='New password' inputName='password' formValue={newPassword} setFormValue={handleNewPassword} password={true} autoComplete={false} minLength='8' maxLength='32' />
                        <StyledTextInput imgSrc={SvgLibrary.key} imgAlt="🔑" labelText='Confirm new password' inputName='password_confirmed' formValue={newPasswordConfirmed} setFormValue={setNewPasswordConfirmed} password={true} autoComplete={false} minLength='8' maxLength='32' />
                    </div>
                    <button id="editUserButton" type="button" onClick={() => user.edit()} className="button-save w-full sm:w-1/2 self-center !mt-5 disabled:control-disabled" disabled={isApiRequesting}>
                        <div className={(isApiRequesting ? '!hidden' : '') + " flex flew-row gap-2"}><img src={SvgLibrary.floppy} alt="💾" className="injectable icon-md" />Save</div>
                        <div className={isApiRequesting ? '' : '!hidden'}><img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." /></div>
                    </button>
                    <h2 className="dark:text-gray-50">Delete Account</h2>
                    <div className="pt-5 px-5 pb-2 dark:text-gray-100">This action is permanent and restoring your account after deletion will not be possible!</div>
                    <div className="px-5 py-2">Confirm account deletion by entering your password below:</div>
                    <div className="w-full h-full flex flex-col items-center space-y-2 py-5">
                        <StyledTextInput imgSrc={SvgLibrary.key} imgAlt="🔑" labelText='Password' inputName='del_password' formValue={deletePassword} setFormValue={handleDeletePasswordChange} password={true} autoComplete={false} minLength='8' maxLength='32' />
                        <StyledTextInput imgSrc={SvgLibrary.key} imgAlt="🔑" labelText='Confirm password' inputName='del_password_confirmed' formValue={deletePasswordConfirmed} setFormValue={setDeletePasswordConfirmed} password={true} autoComplete={false} minLength='8' maxLength='32' />
                    </div>
                    <button id="deleteUserConfirmButton" type="button" className="button-delete w-full sm:w-1/2 self-center !mt-5 disabled:control-disabled" disabled={deletePassword.length < 8 || deletePasswordConfirmed.length < 8 || deletePassword !== deletePasswordConfirmed}
                        onClick={() => user.openDeleteModal()}
                    >
                        <img src={SvgLibrary.trashX} alt="🗑" className="injectable icon-md" />
                        <span>Delete</span>
                    </button>
                    <h2 className="dark:text-gray-50">New User</h2>
                    <div className="w-full h-full flex flex-col items-center space-y-2 p-5">
                        <StyledTextInput imgSrc={SvgLibrary.user} labelText='Name' inputName='reg_name' formValue={createName} setFormValue={setCreateName} autoComplete={false} minLength='3' maxLength='32' />
                        <StyledTextInput imgSrc={SvgLibrary.key} imgAlt="🔑" labelText='Password' inputName='reg_password' formValue={createPassword} setFormValue={handleCreatePasswordChange} password={true} autoComplete={false} minLength='8' maxLength='32' />
                        <StyledTextInput imgSrc={SvgLibrary.key} imgAlt="🔑" labelText='Confirm password' inputName='reg_password_confirmed' formValue={createPasswordConfirmed} setFormValue={setCreatePasswordConfirmed} password={true} autoComplete={false} minLength='8' maxLength='32' />
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
