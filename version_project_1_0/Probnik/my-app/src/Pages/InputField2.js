import {Button} from "react-bootstrap";
import React from "react";
//import './InputField.css';

const InputField2 = ({ hidden, value, setValue, onSubmit, loading, placeholder, buttonTitle = 'Поиск'}) => {
    return <div hidden = {hidden}>
        <input className="u-border-1 u-border-grey-30 u-input-field-2 u-input-rectangle u-input-2" value={value} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
        <Button className="button1" disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
    </div>
}

export default InputField2