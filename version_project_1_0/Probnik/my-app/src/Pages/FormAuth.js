import React from "react";
import {Button} from "react-bootstrap";

const FormAuth = ({SetVizual, onAuth, onRegister, setLogin, setPassword, login, password}) => {

    return(

        <div hidden={SetVizual}>
            <div>
                <label >Логин</label>
                <input className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-text-palette-4-base u-input-1" id="exampleInputLogin" aria-describedby="LoginHelp" value={login} onChange={(event => setLogin(event.target.value))}/>
                {/*<div id="LoginHelp" >Мы никогда не передадим ваш логин никому другому.</div>*/}
            </div>
            <div >
                <label >Пароль</label>
                <input className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-text-palette-4-base u-input-1" type="password" id="exampleInputPassword" value={password} onChange={(event => setPassword(event.target.value))}/>
            </div>
            <div>
                <br/>
            </div>
            <button className="u-btn-2" type="submit" onClick={onAuth}>Войти</button>
            <button className="u-btn-2" type="submit" onClick={onRegister}>Создать аккаунт</button>
        </div>

    );

}
export default FormAuth