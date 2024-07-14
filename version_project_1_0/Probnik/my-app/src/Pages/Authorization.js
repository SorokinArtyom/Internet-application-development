import React from 'react';
import '../index.css';
import {Button} from "react-bootstrap";

const Authorization = ({ onSubmit, loading, onLogout, hidden}) => {
    return (
        <div className="LoginField" hidden = {hidden}>
            {/*<Button className="button1" disabled={loading} onClick={onSubmit}>Войти</Button>*/}
            <Button
                className="u-btn-Enter" disabled={loading} onClick={onSubmit}>
                Войти
            </Button>
            <Button
                className="u-btn-Exit" disabled={loading} onClick={onLogout}>
                Выйти
            </Button>
            {/*<Button className="button1" disabled={loading} onClick={onSubmit}>Выйти</Button>*/}
        </div>

    );
};
export default Authorization;