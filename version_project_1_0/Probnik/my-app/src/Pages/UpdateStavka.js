import {Button} from "react-bootstrap";
import React from "react";
//import './InputField.css';

const UpdateStavka = ({ hidden,  onSubmit, loading, Sumvalue, setSumvalue, Timevalue, setTimevalue, Statusvalue, setStatusvalue, Id_Uservalue, setId_Uservalue, Time_Paymentvalue, setTime_Paymentvalue, buttonTitle = 'Изменить'}) => {
    return <div hidden = {hidden}>
        <label>Сумма                </label>
        <input className="u-border-1 u-border-grey-30 u-input-field-2 u-input-rectangle u-input-1" value={Sumvalue} onChange={(event => setSumvalue(event.target.value))}/>
        <label><p/>Время            </label>
        <input className="u-border-1 u-border-grey-30 u-input-field-2 u-input-rectangle u-input-1" value={Timevalue}  onChange={(event => setTimevalue(event.target.value))}/>
        <label><p/>Статус           </label>
        <input className="u-border-1 u-border-grey-30 u-input-field-2 u-input-rectangle u-input-1" value={Statusvalue}  onChange={(event => setStatusvalue(event.target.value))}/>
        <label><p/>Id_User          </label>
        <input className="u-border-1 u-border-grey-30 u-input-field-2 u-input-rectangle u-input-1" value={Id_Uservalue}  onChange={(event => setId_Uservalue(event.target.value))}/>
        <label><p/>Когда оплатил    </label>
        <input className="u-border-1 u-border-grey-30 u-input-field-2 u-input-rectangle u-input-1" value={Time_Paymentvalue}  onChange={(event => setTime_Paymentvalue(event.target.value))}/>

        <p/>
        <Button className="button1" disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
    </div>
}

export default UpdateStavka