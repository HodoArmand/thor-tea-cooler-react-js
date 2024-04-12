
function StyledToggleInput({ imgSrc = '', imgAlt = '', labelText = '', inputName = '', setFormValue, formValue }) {

    return (
        <div id={"input-group" + inputName} key={inputName + '_inputgroup'}>
            <label htmlFor={inputName} className="block input-label-top">
                <img src={imgSrc} alt={imgAlt} className="injectable inline-block icon-md mr-1" />
                <span>{labelText}</span>
            </label>
            <div className="flex items-center space-x-2">
                <label className="text-sm" htmlFor={inputName}>Off</label>
                <input key={inputName + '_input'} type="checkbox" name={inputName} id={inputName} className="toggleCheckbox" onChange={() => setFormValue(i => !i)} checked={formValue} />
                <label className="text-sm" htmlFor={inputName}>On</label>
            </div>
        </div>
    )
}

export default StyledToggleInput
