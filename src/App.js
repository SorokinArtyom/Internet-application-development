//import logo from './logo.svg';
//import './App.css';
//
//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//
//export default App;


//<!--       <Route path="/" {<h1>Это наша стартовая страница</h1> }/> -->
//<!--       <Route path="/new" {<h1>Это наша страница с чем-то новеньким</h1>} /> -->


import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button, Spinner} from "react-bootstrap";


function App() {

  return (
      <BrowserRouter basename="/">
          <div>
              <ul>
                  <li>
                      <Link to="/">Старт</Link>
                  </li>
                  <li>
                      <Link to="/new">Хочу на страницу с чем-то новеньким</Link>
                  </li>
              </ul>
              <hr />
        <Routes>
            <Route path="/" element={<h1>Это наша стартовая страница</h1>} />
            <Route path="/new" element={<h1>Это наша страница с чем-то новеньким</h1>} />
        </Routes>
          </div>
      </BrowserRouter>
  );
}





const data = [
    'Берик Дондаррион',
    'Леди Мелиссандра',
    'Полливер',
    'Уолдер Фрей',
    'Тайвин Ланнистер',
    'Сир Мерин Трэнт',
    'Король Джоффри',
    'Сир Илин Пейн',
    'Гора',
    'Пес',
    'Серсея Ланнистер',
]



const getTeamByID = async (name = 'Faze') =>{
    const res = await fetch(`http://127.0.0.1:8000/find/?format=json&search=${name}`)
        .then((response) => {
            return response.json();
        }).catch(()=>{
            return {resultCount:0, results:[]}
        })
    return res
}


function TeamsPage() {

    const [searchValue, setSearchValue] = useState('Faze');

    const [loading, setLoading] = useState(false)

    const [team, setTeam] = useState([])

    const handleSearch = async () =>{
        await setLoading(true);
        const { results } = await getTeamByID(searchValue);
        console.log(await getTeamByID(searchValue));
        console.log(results);
        await setTeam(results);
        await setLoading(false)
    }

    return (
            <Button disabled={loading} onClick={handleSearch}>Искать</Button>
    );
}

export default TeamsPage;


