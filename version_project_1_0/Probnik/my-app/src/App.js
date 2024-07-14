import './App.css';
import React, {useEffect, useState, useReducer} from 'react';

import {Card, Col, Row, Button, Spinner} from "react-bootstrap";
import InputField from "./InputField";
// import './index.css';
// import '../public/nicepage.css';

import {BrowserRouter} from "react-router-dom";
import LogoBtn from "./LogoBtn";
import AppRouter from "./Components/AppRouter";
import Authorization from "./Pages/Authorization";
import FormAuth from "./Pages/FormAuth";
import FormRegister from "./Pages/FormRegister";
import AddStavkaForm from "./Pages/AddStavkaForm";
import YouAreNotAuthorizated from "./Pages/YouAreNotAuthorizated";
import UpdateStavka from "./Pages/UpdateStavka";
import InputField2 from "./Pages/InputField2";
import Block_match from "./Pages/Block_match";
import axios from "axios";
// import {type} from "@testing-library/user-event/dist/type";

// import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//
// import RatesList from "./RatesList";
// import {type} from "@testing-library/user-event/dist/type";



const App = () => {
    return (

        // <div>
        //     WORKING
        // </div>

        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
};

export default App;


function init(state) {
    console.log(state);
    return state;
}
function reducer(state, action) {
    switch (action.type) {
        case 'Summa':
            return{
                ...state,
                summ:action.payload
            }
        case 'Match':
            return{
                ...state,
                match_id:action.payload
            }

        case 'filter_value':
            return{
                ...state,
                filter_value:action.payload
            }
        case 'filter_loading':
            return {
                ...state,
                loading: action.loading
            };

        case 'status':
            return{
                ...state,
                status:action.payload
            }

        case 'time':
            return{
                ...state,
                time:action.payload
            }
        case 'time_payment':
            return{
                ...state,
                time_Payment:action.payload
            }

        case 'user_id':
            return {
                ...state,
                user_id:action.payload
            };

        case 'username':
            return{
                ...state,
                username:action.payload
            }
        case 'email':
            return{
                ...state,
                email:action.payload
            }
        case 'password':
            return{
                ...state,
                password:action.payload
            }
        case 'dopInfo':
            return{
                ...state,
                dopInfo:action.payload
            }
        case 'user_auth':
            return {
                ...state,
                id_user:action.payload
            };
        case 'stavki':
            return {
                ...state,
                stavki: action.payload
            };
        case 'team':
            return {
                ...state,
                team: action.payload
            };
        case 'search_team':
            return {
                ...state,
                searchValue: action.payload
            };
        case 'load':
            return {
                ...state,
                loading: action.loading
            };
        case 'load_back':
            return {
                ...state,
                loading: action.payload
            };
        case 'reset':
            return init(action.payload);

        default:
            return state;
    }
}


function TeamsPage() {
    // _s();
    // const [searchValue, setSearchValue] = useState('Faze');
    // const [loading, setLoading] = useState(false)
    // const [team, setTeam] = useState([])
    let today = new Date();
    today.setHours(today.getHours() + 3);
    console.log(today)
    // const requestURL = `http://127.0.0.1:8000/Stavki/Add`;
    // const body = {
    //     "user_id": 1,
    //     "summ": 1500,
    //     "time": today,
    //     "koeff": 1.71,
    //     "match_id": 12
    // };
    // function sendRequest(method, url) {
    //     let body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    //     const headers = {
    //         'Content-Type': 'application/json'
    //     };
    //     return fetch(url, {
    //         method: method,
    //         body: JSON.stringify(body),
    //         headers: headers
    //     }).then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         }
    //         return response.json().then(error => {
    //             const e = new Error('Что-то пошло не так');
    //             e.data = error;
    //             throw e;
    //         });
    //     });
    // }

    const getTeamByID = async (name = 'Faze') =>{
        //let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Faze';
        const res = await fetch(`http://127.0.0.1:8000/find/?search=${name}`)
            .then((response) => {
                return response.json();
            }).catch(() => {
                return {resultCount: 0, results: []};
            });

        // sendRequest('POST', requestURL, body)
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err))

        return res;
    };
    const setSearchValue = setValue => {
        dispatch({type: "search_team", payload: setValue});
        // console.log(setValue)
    };

    const [data, dispatch] = useReducer(reducer, {id_user:'0', searchValue: 'Faze', loading: false, team: []}, init)
    // const [filter, setFilter] = useState('');

    const handleSearch = async () => {
        // dispatch({type: "reset", payload: {searchValue: 'Faze', loading: true, team: []}})

        //await setLoading(true);
        dispatch({type: "load", loading: true});
        const results = await getTeamByID(data.searchValue);
        // console.log(getTeamByID(data.searchValue));
        console.log(results);
        // console.log(data);
        // console.log(data.team);
        //console.log(results);
        //await setTeam(results);
        //console.log(data.searchValue);
        dispatch({type: "team", payload: results});

        // console.log(data);
        // console.log(data.team);
        //await setLoading(false)
        dispatch({type: "load", loading: false});
    };
    // const handleFilter = ()=> {
    //     setTeam(Team => Team.filter(item=>item.name && item.name.includes(filter)));
    // }

    return(
        <div className={`container ${data.loading && 'containerLoading'}`}>
            {data.loading && <div className="loadingBg"><Spinner animation="border"/></div>}
            <InputField value={data.searchValue} setValue={setSearchValue} placeholder="поиск" loading={data.loading} onSubmit={handleSearch} buttonTitle="Искать"/>
            {data.loading && <div className="loadingBg"><Spinner animation="border"/></div>}
            {!data.team.length && <div>
                <p><font size="10" color="#72efe9" face="serif">К сожалению, пока ничего не найдено :( </font> </p>
            </div>}
            <div>
                <Row xs={4} md={4} className="g-4" >
                    {data.team.map((item, index)=>{
                        return<Col >
                            <p> <font size="8" color="#72efe9" face="serif"> {index + 1}) {item.name} {item.cap} </font></p>
                        </Col>

                    })}
                </Row>

            </div>

            {/*<Row xs={4} md={4} className="g-4">*/}
            {/*    {team.map((item, index)=>{*/}
            {/*        return<Col >*/}
            {/*            <Card key={index} className="card">*/}
            {/*                <Card.Body>*/}
            {/*                    <div className="textStyle">*/}
            {/*                        <Card.Title>{item.name}</Card.Title>*/}
            {/*                    </div>*/}
            {/*                    <div  className="textStyle">*/}
            {/*                        <Card.Text>*/}
            {/*                            {item.dicription}*/}
            {/*                        </Card.Text>*/}
            {/*                    </div>*/}
            {/*                    <Button className="cardButton" href={item.cap} target="_blank" variant="primary">Открыть в ITunes</Button>*/}
            {/*                </Card.Body>*/}
            {/*            </Card>*/}
            {/*        </Col>*/}
            {/*    })}*/}
            {/*</Row>*/}



        </div>


    );
}

// _s(TeamsPage, "j3eyrB8NL8DwW50/U3Alc/yX2sk=");
// _c = TeamsPage;
function RatesPage() {


    let today = new Date();
    today.setHours(today.getHours() + 3);
    console.log(today)

    // _s2();

    function sendRequest(method, url) {
        let body = arguments.length > 1 && arguments[2] !== undefined ? arguments[2] : null;
        const headers = {
            'Content-Type': 'application/json'
            // 'API-Key': 'secret'
        };
        return fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: headers,
            credentials: 'include',
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(error => {
                const e = new Error('Что-то пошло не так');
                e.data = error;
                throw e;
            });
        });
    }

    const getStavkiByIDUser = async function () {
        let IDUser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0';
        const res = await fetch(`http://127.0.0.1:8000/Stavki/find/?search=${IDUser}`)
            //const res = axios.get(`http://127.0.0.1:8000/Stavki/find/?format=json&search=${IDUser}`)
            .then(response => {
                return response.json();
            }).catch(() => {
                return {resultCount: 0, results: []};
            });
        return res;
    };

    const [data, dispatch] = useReducer(reducer, {id_user: '0', searchValue: '0', loading: false, stavki: []}, init)

    const [stavka, addStavka] = useReducer(reducer, {summ: '', koeff: '1', loading: false, match_id: '', Status: 'Не оплачено'}, init)

    const [loading, setLoading] = useState(false);

    const [hid, setHid] = useState(true);

    const [hidAlert, setHidAlert] = useState(true);

    const [hidAdd_Stavka, setHidAdd_Stavka] = useState(true);

    const [hidDeleteIcon, setHidDeleteIcon] = useState(true);

    const [hidPaymentBtn, setHidPaymentBtn] = useState(true);

    const [hidUpdateStavki, sethidUpdateStavki] = useState(true);

    const [filter_value, set_filter_value] = useReducer(reducer, {filter_value: '1', loading: false, stavki: []}, init)

    const [updateStavka, setUpdateStavka] = useReducer(reducer, {summ: '', koeff: '', loading: false, match_id: '', status: '0', user_id: '', time: '', time_Payment:'', time_calculated: '' }, init)

    const [fullStavki, setFullStavki] = useState([])

    const [thisStavka, setThisStavka] = useState(-1)

    let d = [];


    const setSumma= setValue => {
        addStavka({type: "Summa", payload: setValue});
    };

    const setMatch= setValue => {

        addStavka({type: "Match", payload: setValue});
    };


    // const setStatus= setValue => {
    //     setUpdateStavka({type: "Status", payload: setValue});
    // };


    const setUpdateSum = setValue => {
        setUpdateStavka({type: "Summa", payload: setValue});
    };
    const setUpdateId_user = setValue => {
        setUpdateStavka({type: "user_id", payload: setValue});
    };
    const setUpdateStatus = setValue => {
        console.log ("setvalue:   ", setValue)
        setUpdateStavka({type: "status", payload: setValue});
    };
    const setUpdateTime = setValue => {
        setUpdateStavka({type: "time", payload: setValue});
    };
    const setUpdateTime_Payment = setValue => {
        setUpdateStavka({type: "time_payment", payload: setValue});
    };

    const PoiskStavok = async () => {

        setHid(!hid);
        setLoading(true);

        let URLGet_id = 'http://127.0.0.1:8000/get_user/'
        sendRequest('POST', URLGet_id)
            .then((data) => {
                console.log("DATA:", data)
                let Url_Stavok = `http://127.0.0.1:8000/Stavki/find/?search=${data['id']}`

                dispatch({type: "user_auth", payload: data['id']})
                if (data['IsStaff'])
                {
                    Url_Stavok = `http://127.0.0.1:8000/StavkiALL/`
                }


                const res_Rates = fetch (Url_Stavok,{credentials: 'include'})
                    .then(response => {
                        console.log('Массив получен')
                        // dispatch({type: "stavki", payload: response.json()})
                        return response.json();
                    }).catch(() => {
                        console.log('Ошибка: массив пустой')
                        return {resultCount: 0, results: []};
                    });
                d = res_Rates
                console.log('значение d - массива ставок пользователя: ', d.then(data => {

                    console.log("Вывод ставок внутри запроса fetch: ", data)
                    console.log("Длина массива ставок: ", data.length)
                    let i;
                    // console.log("Длина массива ставок: ", data.stavki.length)
                    for (i = 0; i < data.length; i++)
                    {
                        if (data[i].Status == 0)
                            data[i].Status = 'Техническая ставка'
                        if (data[i].Status == 1)
                            data[i].Status = 'Не оплачено'
                        if (data[i].Status == 2)
                            data[i].Status = 'Оплачено'
                        if (data[i].Status == 3)
                            data[i].Status = 'Рассчитана'

                        console.log(data[i].Status)
                    }

                    dispatch({type: "stavki", payload: data})
                    setFullStavki(data)
                    console.log("Вывод ставок внутри запроса fetch после обновления статусов: ",data)
                }))
                // dispatch({type: "stavki", payload: res_Rates})
            })
            .catch(err => {
                dispatch({type: "user_auth", payload: 0})
                console.log(err)
            })

        console.log(fullStavki[20].id_user)


        console.log('Тоже значение d но после выхода из fetch: ', d)
        dispatch({type: "stavki", payload: d})
        // console.log('data для получения ставок: ', data)
        console.log ("Сразу после обновление статусов: ",data.stavki)

        // const res_Rates = await getStavkiByIDUser(data.id_user);
        // d = res_Rates;
        // console.log(d);
        // dispatch({type: "stavki", payload: res_Rates});
        //console.log(res_Rates);

        //dispatch({type: "load", loading: false});
        setLoading(false);
        // console.log (data.loading);


        // console.log('===========================');
        // document.onclick = event => {
        //     console.log(event.target.classList);
        //     // if ((!event.target.DOMTokenList.contains('u-header')) || (event.target.DOMTokenList.contains('u-image-2'))) {
        //     if (event.target.classList.contains('u-image-2')) {
        //         // console.log(data.loading);
        //         //dispatch({type: "load_back", payload: data.loading});
        //         setHid(!hid);
        //         // console.log(data.loading);
        //         // console.log('статус загрузки в document.onclick' + init())
        //         // const res_Rates = await getStavkiByIDUser('1');
        //         // console.log (res_Rates);
        //         // dispatch({type: "stavki", payload: res_Rates});
        //         // dispatch({type: "load", loading: false});
        //     }
        // }
        // console.log(data.loading);
        // console.log('статус загрузки при вызове функции поиска' + init().loading)
        // if (init().loading == true) {
        //     const res_Rates = await getStavkiByIDUser('1');
        //     console.log (res_Rates);
        //     dispatch({type: "stavki", payload: res_Rates});
        //     dispatch({type: "load", loading: false});
        // }

    };



    const AddStavka = async () => {

        setLoading(true);
        let today = new Date();
        today.setHours(today.getHours() + 3);
        // console.log(today, stavka)

        // const headers = {
        //     'Content-Type': 'application/json'
        // };
        // return fetch(url, {
        //     method: method,
        //     body: JSON.stringify(body),
        //     headers: headers,
        //     credentials: 'include',
        // })



        let URLGet_id = 'http://127.0.0.1:8000/get_user/'
        sendRequest('POST', URLGet_id)
            .then((data) => {

                console.log('Запрос вызова вызвался: ')
                dispatch({type: "user_auth", payload: data['id']})
                // if (data.id_user != '0') {
                if (data != '0') {
                    setHidAlert(true)
                    const body = {
                        "user_id":data['id'],
                        "summ": stavka.summ,
                        "time": today,
                        "koeff": 1.5,
                        "match_id": stavka.match_id,
                        "Status":"1",
                        "time_Payment": null,
                        "time_calculated": null,
                        "Users":data['id']
                    }
                    console.log(data.id_user)
                    console.log('ID_user вернулось НЕ 0: ')
                    // dispatch({type: "user_auth", payload: data})
                    let URLAdd_Stavka = 'http://127.0.0.1:8000/Stavki/Add/'
                    sendRequest('POST', URLAdd_Stavka, body)
                        .then((data) => {
                            console.log(data)
                        })
                        .catch(err => console.log(err))
                }
                else {
                    console.log('ID_user вернулось равным 0: ')
                    setHidAlert(false)
                }
            })
            .catch(err => {

                setHidAlert(false)
                console.log('Запрос вызова не вызвался: ')
                console.log(err)

            })



        setLoading(false);

    };



    const Payment = async (Item) => {

        console.log ("Метод оплаты для этой ставки: ", Item)
        setLoading(true);
        let today = new Date();
        // today.setHours(today.getHours() + 3);
        let StrToday = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':'+ today.getSeconds() + '.' + today.getMilliseconds() + 'Z'
        Item.time_Payment = StrToday
        Item.Status = 2
        console.log("Второй вывод этой ставки (после обновления полей статуса и времени):  ",Item)

        d = sendRequest('POST', `http://127.0.0.1:8000/StavkiALL/${Item.id}/Patch/`, Item)

        console.log("Вызов метода Patch: ", d)


        Item.Status = "Оплачено"
        let Number = data.stavki.findIndex(stavka => stavka.id == Item.id)
        let mass = data.stavki
        console.log('Number ===  ', Number)
        mass[Number] = Item
        console.log('Обновляемая ставка: ', Item, 'Обновленный массив: ', mass)

        dispatch({type: 'stavki', payload: mass})

        console.log('data.stavki ===  ', mass)

        setLoading(false);
    };


    const Delete = async (Item) => {


        console.log ("Метод удаления для этой ставки: ", Item)
        setLoading(true);
        let response = axios.post(`http://127.0.0.1:8000/StavkiALL/${Item.id}/delete/`);
        d = response;
        console.log("Вызов метода Delete: ", d)

        let mass = data.stavki.filter(item => item.id !== Item.id);

        dispatch({type: 'stavki', payload: mass})

        setLoading(false);

    };




    function HidForm(){
        setHidAdd_Stavka(!hidAdd_Stavka);
    }

    // function HidPaymentBtn(Status){
    //
    //     console.log ("Статус ставки  ", Status)
    //     if (Status != 'Техническая ставка') {
    //         setHidPaymentBtn(true);
    //         return true
    //     }
    //     setHidPaymentBtn(false);
    //     return false
    // }
    //
    //
    // function HidDeleteIcon(){
    //     setHidAdd_Stavka(!hidAdd_Stavka);
    // }


    function Hid_Stavki (){
        setHid(true);
    }


    const FiltrStavki = async () => {


        console.log ("Фильтр ставок вызвался, кнопка нажата")

        set_filter_value({type: "filter_loading", payload: true});


        // console.log ("Состояние сменилось на true")
        // console.log ("Data.stavki: ", data.stavki)

        // let result = data.stavki.filter(item => item.stavki.Status == filter_value.filter_value);

        // let result = data.stavki.map(item => item.filter(stavka => stavka.Status == filter_value.filter_value));


        let result = data.stavki.filter(item => true);


        console.log ("Выполнилось действие фильтрации, результат на строке ниже")
        console.log (result)

        set_filter_value({type: "filter_loading", payload: false});

    }

    // const handleSearch = async () => {
    //     dispatch({type: "load", loading: true});
    //     const results = await getTeamByID(data.searchValue);
    //     dispatch({type: "team", payload: results});
    //     dispatch({type: "load", loading: false});
    // };


    const setFilterValue = setValue => {
        console.log (setValue)
        set_filter_value({type: "filter_value", payload: setValue});
        console.log (filter_value.filter_value)
    };


    function Hid_Update_Stavki (Item, index){

        setThisStavka(index)
        console.log(data.stavki)
        sethidUpdateStavki(false);
        console.log ('Item = ', Item)
        // Item.id={setUpdateId_user}
        setUpdateStavka({type: "Summa", payload: Item.summ})
        setUpdateStavka({type: "user_id", payload: Item.user_id})
        setUpdateStavka({type: "status", payload: Item.Status})
        setUpdateStavka({type: "time", payload: Item.time})
        setUpdateStavka({type: "time_payment", payload: Item.time_Payment})

        // console.log (data.id_user, !hidUpdateStavki)
    }


    function UpdateStavki(ID){


        console.log("ID:  ", ID)
        sethidUpdateStavki(!hidUpdateStavki);

        // let Number= data.stavki.findIndex(item => item.id === ID);
        let mass = data.stavki.find(item => item.id == ID);



        console.log(updateStavka)
        mass.summ = updateStavka.summ
        mass.user_id = updateStavka.user_id
        mass.time = updateStavka.time
        mass.time_Payment = updateStavka.time_Payment


        if (mass.Status == 'Оплачено' && updateStavka.status == 'Рассчитана') {
            let today = new Date();
            let StrToday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + '.' + today.getMilliseconds() + 'Z'
            mass.time_calculated = StrToday
        }


        if (updateStavka.status == 'Техническая ставка'){
            updateStavka.status = 0;
        }
        if (updateStavka.status == 'Не оплачено'){
            updateStavka.status = 1;
        }
        if (updateStavka.status == 'Оплачено'){
            updateStavka.status = 2;
        }
        if (updateStavka.status == 'Рассчитана'){
            updateStavka.status = 3;
        }

        mass.Status = updateStavka.status



        d = sendRequest('POST', `http://127.0.0.1:8000/StavkiALL/${mass.id}/Patch/`, {
            'id':mass.id,
            'Status':mass.Status,
            'Users':mass.Users,
            'koeff':mass.koeff,
            'match_id':mass.match_id,
            'summ':mass.summ,
            'time':mass.time,
            'time_Payment':mass.time_Payment,
            'time_calculated':mass.time_calculated,
            'user_id':mass.user_id
        })

    }


    function search(){
        const field = document.getElementById('searchStatus').value;
        if(field)
            dispatch({type: "stavki", payload: fullStavki.filter(elem => elem.Status.toLowerCase().includes(field.toLowerCase()))})
        else
            dispatch({type: "stavki", payload: fullStavki})
    }



    return(
        <div class="use-2">
            <img onClick={PoiskStavok} disabled={loading} className="u-image-2" src="images/image1.png" alt="" data-image-width="128" data-image-height="128"/>
            <div>
                {/*<InputField2 hidden = {false} value={filter_value.filter_value} setValue={setFilterValue} placeholder="Фильтр" loading={filter_value.loading} onSubmit={FiltrStavki} buttonTitle="Фильтр"/>*/}
                {/*<InputField value={filter_value.filter_value} setValue={setFilterValue} placeholder="Фильтр" loading={filter_value.filter_value} onSubmit={FiltrStavki} buttonTitle="Фильтр"/>*/}

                {/*<input className="u-border-1 u-border-grey-30 u-input u-input-rectangle u-text-palette-4-base u-input-1" value={filter_value.filter_value} placeholder="Фильтр" onChange={setFilterValue}/>*/}
                {/*<Button className="button1" disabled={filter_value.loading} onClick={FiltrStavki}>Фильтр</Button>*/}
                <input className="u-border-1 u-border-grey-30 u-input-field-2 u-input-rectangle u-input-1" hidden= {hid || data.id_user == 0} id='searchStatus' placeholder='Status' onChange={search}/>
                <Row hidden={hid || data.id_user == 0} xs={4} md={4} className="g-4" >
                    {data.stavki.map((item, index)=>{
                        return<Col >
                            <p> <font size="8" color="00009c" face="serif"> {index + 1}) Сумма ставки: {item.summ} <p>Время: {item.time}</p> <p>Статус: {item.Status}</p></font></p>
                            <font size="8" color="00009c" face="serif" hidden = {data.id_user != 1 && data.id_user != 12} >Id_User: {data.stavki[index].user_id} <p/> Когда оплатил: {item.time_Payment} <p/></font>
                            {/*<button hidden={HidPaymentBtn} className="u-btn-add-stavka" type="submit" onClick={HidForm}>Оплатить</button>*/}

                            {/*<button hidden={() => HidPaymentBtn(item.Status)} className="u-btn-add-stavka" type="submit" onClick={Payment}>Оплатить</button>*/}


                            <button hidden={item.Status !== 'Не оплачено' || (data.stavki[index].user_id != data.id_user && data.id_user != 1)} className="u-btn-add-stavka" type="submit" onClick={() => Payment(item)}>Оплатить</button>
                            <button hidden={data.id_user != 1 || (thisStavka == index && !hidUpdateStavki)} className="u-btn-add-stavka" type="submit" onClick={() => Hid_Update_Stavki(item, index)}>Изменить</button>
                            <button hidden={data.id_user != 1 || hidUpdateStavki || thisStavka != index} className="u-btn-add-stavka" type="submit" onClick={Hid_Update_Stavki}>Закрыть</button>
                            <UpdateStavka hidden={data.id_user != 1 || hidUpdateStavki || thisStavka != index} buttonTitle="Изменить"
                                          onSubmit={() => UpdateStavki(item.id)} loading={loading}
                                          Sumvalue={updateStavka.summ} setSumvalue={setUpdateSum} Id_Uservalue={updateStavka.id_user} setId_Uservalue={setUpdateId_user}
                                          Statusvalue={updateStavka.status} setStatusvalue={setUpdateStatus} Timevalue={updateStavka.time} setTimevalue={setUpdateTime}
                                          Time_Paymentvalue={updateStavka.time_Payment} setTime_Paymentvalue={setUpdateTime_Payment}
                            />

                            {/*<InputField value={data.searchValue} setValue={setSearchValue} placeholder="поиск" loading={data.loading} onSubmit={handleSearch} buttonTitle="Искать"/>*/}


                            <img hidden={data.id_user != 1 && (item.Status !== 'Не оплачено' || data.stavki[index].user_id != data.id_user)} onClick={() => Delete(item)} disabled={loading} className="DeleteStavka" src="images/DeleteIcon.png" alt="" data-image-width="128" data-image-height="128"/>
                        </Col>
                    })}
                </Row>
                <button hidden={hid || data.id_user == 0} className="u-btn-add-stavka" type="submit" onClick={Hid_Stavki}>Скрыть</button>
            </div>

            <button className="u-btn-add-stavka" type="submit" onClick={HidForm}>Добавить ставку</button>
            <AddStavkaForm SetVizual={hidAdd_Stavka} SetMatch={setMatch} Match={stavka.match_id} SetSumma={setSumma} Summa={stavka.summ} onAdd={AddStavka}/>
            <YouAreNotAuthorizated SetVizual= {hidAlert}/>

            {/*const [User, dispatchUser] = useReducer(reducer, {username:'', email: '', password: '', dopInfo:''}, init)*/}
            {/*<FormRegister SetVizual={hidRegisterAuth} onAuth={HidAuthForm} onRegister={Create_User} setLogin={setUsername}*/}
            {/*              setEmail={setEmail} setPassword1={setPassword} setPassword2={setDopInfo} login={User.username}*/}
            {/*              Email={User.email} password={User.password} passwordRepeat={User.dopInfo}/>*/}

        </div>
    );

    // return (
    //
    //
    //
    // );

}


function AuthorizationPage() {

    let today = new Date();
    today.setHours(today.getHours() + 3);
    function sendRequest(method, url) {
        let body = arguments.length > 1 && arguments[2] !== undefined ? arguments[2] : null;
        const headers = {
            'Content-Type': 'application/json'
        };
        return fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: headers,
            credentials: 'include',
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(error => {
                const e = new Error('Что-то пошло не так');
                e.data = error;
                throw e;
            });
        });
    }

    const [data, dispatch] = useReducer(reducer, {id_user: '0', searchValue: '0', loading: false, stavki: []}, init)

    const [loading, setLoading] = useState(false);

    const [hidFormAuth, setHidFormAuth] = useState(true);

    const [hidRegisterAuth, setHidRegisterAuth] = useState(true);

    const [User, dispatchUser] = useReducer(reducer, {username:'', email: '', password: '', dopInfo:''}, init)


    const setUsername= setValue => {
        dispatchUser({type: "username", payload: setValue});
    };

    const setEmail= setValue => {
        dispatchUser({type: "email", payload: setValue});
    };

    const setPassword= setValue => {
        dispatchUser({type: "password", payload: setValue});
    };

    const setDopInfo= setValue => {
        dispatchUser({type: "dopInfo", payload: setValue});
    };





    const Polzovatel = async () => {


        setHidFormAuth(!hidFormAuth)
        const requestURLAuth = `http://127.0.0.1:8000/login/`;
        console.log(User)

        // let Token = {}
        let body = {
            "username": User.username,
            "password": User.password
        };


        // sendRequest('POST', requestURLAuth, body)
        //     .then((response) => {
        //         console.log(response)
        //         fetch('http://127.0.0.1:8000/get_user/',
        //             {
        //                 method: 'post',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'cookie': data
        //                 }
        //             })
        //             .then((response) => {
        //                 console.log(response.statusText)
        //                 if (response.statusText === "User not found" && !response.ok)
        //                     throw new Error("no found")
        //                 return response.json()
        //             })
        //             .then((IdUser) => {
        //             })
        //             .catch((error) => {
        //             })
        //             .catch(err => console.log(err))
        //     })


        // console.log (body)
        // body = {};
        // const body = {
        //     "session_id":access
        // };
        // console.log(body)


        // body = {}
        // const requestURLGet = `http://127.0.0.1:8000/get_user/`;        // Переделать в ассинхронную функцию
        // sendRequest('POST', requestURLGet, body)                // Вывести из компонента Polzovatel, вызывать внури функции
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err))

        // const get_id = new Promise((resolve, reject) => {
        //     let body = {}
        //     const requestURLGet = `http://127.0.0.1:8000/get_user/`;        // Переделать в ассинхронную функцию
        //     sendRequest('POST', requestURLGet, body)                // Вывести из компонента Polzovatel, вызывать внури функции
        //         .then(data => resolve(data))
        //         .catch(err => console.log(err))
        //
        // });
        // get_id.then((response) => {
        //     console.log(response);
        // }).catch((error) => {
        //     console.log(error);
        // });

        // const res = await fetch(`http://127.0.0.1:8000/get_user/`)
        //     .then(response => {
        //         return response.json();
        //     }).catch(() => {
        //         return {resultCount: 0, results: []};
        //     });
        // return res;



        setLoading(true);

        sendRequest('POST', requestURLAuth, body)
            .then((data) => {
                let URLGet_id = 'http://127.0.0.1:8000/get_user/'
                // let body_user = {'':''}
                sendRequest('POST', URLGet_id)
                    .then((data) => {
                        console.log(data)
                        dispatch({type: "user_auth", payload: data})
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

        setLoading(false);

        console.log(data)
    };

    const Create_User = async () => {


        if (!hidRegisterAuth)
            setHidRegisterAuth(!hidRegisterAuth);
        if (hidRegisterAuth)
            setHidFormAuth(!hidFormAuth);

        console.log(User)
        const requestURL = `http://127.0.0.1:8000/add_user`;
        if (User.password != User.dopInfo)
            User.password = ""
        const body = {
            "username": User.username,
            "email": User.email,
            "password": User.password
        };
        console.log(body)
        sendRequest('POST', requestURL, body)
            .then(data => console.log(data))
            .catch(err => console.log(err))

    };







    function HidAuthForm(){
        if (!hidRegisterAuth)
            setHidRegisterAuth(!hidRegisterAuth);
        setHidFormAuth(!hidFormAuth);
    }

    function HidRegisterForm(){
        setHidFormAuth(!hidFormAuth);
        setHidRegisterAuth(!hidRegisterAuth);
    }

    function Logout(){
        setHidRegisterAuth(true);
        setHidFormAuth(true);

        let URLUser_Logout = 'http://127.0.0.1:8000/logout/'
        sendRequest('POST', URLUser_Logout)
            .then((data) => {
                console.log(data)
                dispatch({type: "init"})
            })
            .catch(err => console.log(err))
        console.log('Пользователь вышел? ', data)
    }

    return(
        <div className="use-2">
            <Authorization hidden = {!hidFormAuth || !hidRegisterAuth} loading={data.loading} onSubmit={HidAuthForm} onLogout={Logout}/>
            <FormAuth SetVizual={hidFormAuth} onAuth={Polzovatel} onRegister={HidRegisterForm} setLogin={setUsername}
                      setPassword={setPassword} login={User.username} password={User.password}/>
            <FormRegister SetVizual={hidRegisterAuth} onAuth={HidAuthForm} onRegister={Create_User} setLogin={setUsername}
                          setEmail={setEmail} setPassword1={setPassword} setPassword2={setDopInfo} login={User.username}
                          Email={User.email} password={User.password} passwordRepeat={User.dopInfo}/>
        </div>
    );
}





function Blocks()
{

    const Time = "20.10.22 в 05:00"

    // return(
    //     <Block_match Time={Time} Team1="EG" Team2="Thunder" LogoTeam1="../public/images/image2.png" LogoTeam2="../public/images/b3971106c3eb208e59e8249f8ee9f0c0_w_trans.png" Score1="0" Score2="2"/>
    // );

    return(

        <div className="u-border-2 u-border-grey-75 u-container-layout u-valign-top u-container-layout-4">
            <p className="u-align-center u-text u-text-5"> {Time} <span style="font-weight: 700;"></span></p>
            <img className="u-image u-image-contain u-image-default u-image-1" src="../public/images/image2.png" alt="" data-image-width="240" data-image-height="321"></img>
            <p className="u-align-center u-text u-text-6">EG</p>
            <p className="u-align-center u-text u-text-7">0</p>
            <img className="u-image u-image-contain u-image-default u-image-2" src="../public/images/b3971106c3eb208e59e8249f8ee9f0c0_w_trans.png" alt="" data-image-width="361" data-image-height="360"></img>
            <p className="u-align-center u-text u-text-8">Thunder</p>
            <p className="u-align-center u-text u-text-9">2</p>
        </div>

    );


}





export {TeamsPage, RatesPage, AuthorizationPage, Blocks};


//     return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("div", {
//         children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["default"], {
//             className: "button1",
//             disabled: data.loading,
//             onClick: handleSearch,
//             children: "\u041F\u043E\u0438\u0441\u043A \u0441\u0442\u0430\u0432\u043E\u043A"
//         }, void 0, false, {
//             fileName: _jsxFileName,
//             lineNumber: 251,
//             columnNumber: 13
//         }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["default"], {
//             xs: 4,
//             md: 4,
//             className: "g-4",
//             children: data.stavki.map((item, index) => {
//                 return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["default"], {
//                     children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("p", {
//                         children: [" ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("font", {
//                             size: "8",
//                             color: "#72efe9",
//                             face: "serif",
//                             children: [" ", index + 1, ") ", item.summ, " ", item.time, " "]
//                         }, void 0, true, {
//                             fileName: _jsxFileName,
//                             lineNumber: 256,
//                             columnNumber: 29
//                         }, this)]
//                     }, void 0, true, {
//                         fileName: _jsxFileName,
//                         lineNumber: 256,
//                         columnNumber: 25
//                     }, this)
//                 }, void 0, false, {
//                     fileName: _jsxFileName,
//                     lineNumber: 255,
//                     columnNumber: 27
//                 }, this);
//             })
//         }, void 0, false, {
//             fileName: _jsxFileName,
//             lineNumber: 253,
//             columnNumber: 13
//         }, this)]
//     }, void 0, true, {
//         fileName: _jsxFileName,
//         lineNumber: 250,
//         columnNumber: 9
//     }, this);
// }
// _s2(RatesPage, "INHaAw1MXXEW/qras7BJQrWWYwM=");
// _c2 = RatesPage;

// export default TeamsPage;

// const NewHOC = (InputField) => {
//     return class extends React.Component {
//         render() {
//             return (
//                 <div>
//                     <InputField {...this.props} />
//                 </div>
//             )
//         }
//     }
// }
//
// const Team = ({name}) => <div>{name}</div>
//
// const NewComponent = NewHOC(Movie);
//
// function App() {
//     return (
//         <div>
//             <NewComponent name="Kill Bill" />
//         </div>
//     );
// }
//
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);