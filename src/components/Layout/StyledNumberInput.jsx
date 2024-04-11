import React, { useContext, useState, useEffect } from 'react'
import ApiContext from '../../common/ApiContext';

Number.prototype.between = function (number1, number2, isInclusive) {
    var min = Math.min(number1, number2),
        max = Math.max(number1, number2);

    return isInclusive ? this >= min && this <= max : this > min && this < max;
}

function StyledNumberInput({ imgSrc, imgAlt, label, inputName, defaultNumericValue = 0, min = Number.MIN_VALUE, max = Number.MAX_VALUE, step = "1.0", setFormValue }) {

    const api = useContext(ApiContext)

    const [inputValue, setInputValue] = useState(defaultNumericValue);

    useEffect(() => {
        setInputValue(defaultNumericValue);
    }, [defaultNumericValue]);

    function incrementValue() {
        let numericValue = Number(inputValue);
        const stepNumeric = Number(step);
        if ((numericValue + stepNumeric).between(20.00, 75.00, true)) {
            numericValue = (stepNumeric % 1.0 !== 0) ? api.formatFloat(numericValue + stepNumeric) : numericValue + stepNumeric;
            setInputValue(numericValue);
            setFormValue(numericValue);
        }
        else {
            setInputValue(max);
            setFormValue(max);
        }
    }

    function decrementValue() {
        let numericValue = Number(inputValue);
        const stepNumeric = Number(step);
        if ((numericValue - stepNumeric).between(20.00, 75.00, true)) {
            numericValue = (stepNumeric % 1.0 !== 0) ? api.formatFloat(numericValue - stepNumeric) : numericValue - stepNumeric;
            setInputValue(numericValue);
            setFormValue(numericValue);
        }
        else {
            setInputValue(min);
            setFormValue(min);
        }
    }

    const handleInputValue = (e) => {
        setInputValue(e.target.value);
        setFormValue(e.target.value);
    }

    return (
        <div id={"input-group-" + inputName} key={inputName + '_inputgroup'}>
            <label htmlFor={inputName} className="block input-label-top">
                <img src={imgSrc} alt={imgAlt} className="injectable inline-block icon-md mr-1" />
                <span>{label}</span>
            </label>
            <div className="flex flex-row h-12 w-full sm:w-2/3 rounded-lg relative bg-transparent mt-1">
                <button className="numberInputButton-l" onClick={() => decrementValue()}>-</button>
                <input id={inputName} type="number" className="numberInputField" name={inputName} value={inputValue || 0} onChange={handleInputValue} min={min} max={max} step={step} />
                <button className="numberInputButton-r" onClick={() => incrementValue()}>+</button>
            </div>
        </div>
    )
}

export default StyledNumberInput
