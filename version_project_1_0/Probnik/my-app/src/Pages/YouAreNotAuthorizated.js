import React from "react";
import {Button} from "react-bootstrap";

const YouAreNotAuthorizated = ({SetVizual}) => {

    return(

        <div hidden={SetVizual}>
                <label><big>Вы не авторизовались на сайте. Неавторизованные пользователи не могут делать ставки!</big></label>
        </div>

    );

}
export default YouAreNotAuthorizated