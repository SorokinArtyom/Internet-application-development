import {Button} from "react-bootstrap";
import React from "react";


const LogoBtn = ({onSubmit, loading= 'Поиск'}) => {
    return
        {/*<Button  style="display: none" disabled={loading} onClick={onSubmit}></Button>*/}
        <Button className="button1" onClick={onSubmit}></Button>

}

export default LogoBtn