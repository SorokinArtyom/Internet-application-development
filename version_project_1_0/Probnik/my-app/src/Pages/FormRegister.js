import React from "react";
import {Button} from "react-bootstrap";

const FormRegister = ({SetVizual, onAuth, onRegister, setLogin, setEmail, setPassword1, setPassword2, login, Email, password, passwordRepeat}) => {

    return(

        <div hidden={SetVizual}>
            <div>
                <label >Логин</label>
                <input className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-text-palette-4-base u-input-1" id="exampleInputLogin" aria-describedby="LoginHelp" value={login} onChange={(event => setLogin(event.target.value))} />
                {/*<div id="LoginHelp" >Мы никогда не передадим ваш логин никому другому.</div>*/}
            </div>
            <div >
                <label >Почта</label>
                <input className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-text-palette-4-base u-input-1" id="exampleInputEmail" value={Email} onChange={(event => setEmail(event.target.value))}/>
            </div>
            <div >
                <label >Пароль</label>
                <input className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-text-palette-4-base u-input-1" type="password" id="exampleInputPassword1" value={password} onChange={(event => setPassword1(event.target.value))}/>
            </div>
            <div >
                <label >Повторите пароль</label>
                <input className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-text-palette-4-base u-input-1" type="password" id="exampleInputPassword2" value={passwordRepeat} onChange={(event => setPassword2(event.target.value))}/>
            </div>
            <div>
                <br/>
            </div>
            <button className="u-btn-2" type="submit" onClick={onAuth}>Войти</button>
            <button className="u-btn-2" type="submit" onClick={onRegister}>Создать</button>
        </div>

    );

}
export default FormRegister