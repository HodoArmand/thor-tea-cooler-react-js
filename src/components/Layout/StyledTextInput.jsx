function StyledTextInput({ imgSrc = '', imgAlt = '', labelText = '', inputName = '', setFormValue, formValue, autoComplete = false, password = false, minLength = 0, maxLength = 256 }) {
    return (
        <div id={"input-group-" + inputName}>
            <label htmlFor={inputName} className="block input-label-top">
                <img src={imgSrc} alt={imgAlt} className="injectable inline-block icon-md mr-1" />
                <span>{labelText}</span>
            </label>
            <input type={password ? 'password' : 'text'} autoComplete={autoComplete === false ? "new-password" : inputName} id={inputName} name={inputName} minLength={minLength} maxLength={maxLength} value={formValue} onChange={(e) => setFormValue(e.target.value)}
                className="requestData py-3 px-4 block w-full text-input" />
        </div>
    )
}

export default StyledTextInput;
