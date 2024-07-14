import React from "react";
import {Button} from "react-bootstrap";

const AddStavkaForm = ({SetVizual, onAdd, SetSumma, SetMatch, Summa, Match}) => {

    return(

        <div hidden={SetVizual}>
            <div>
                <label >Сумма</label>
                <input className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-text-palette-4-base u-input-1" id="exampleInputLogin" aria-describedby="LoginHelp" value={Summa} onChange={(event => SetSumma(event.target.value))}/>

                <label >Матч</label>
                <input className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-text-palette-4-base u-input-1" id="exampleInputPassword" value={Match} onChange={(event => SetMatch(event.target.value))}/>
            </div>
            <div>
                <br/>
            </div>
            <button className="u-btn-2" type="submit" onClick={onAdd}>Поставить</button>
        </div>

    );

}
export default AddStavkaForm