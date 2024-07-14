import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {AuthRoutes, PublicRoutes} from '../Routes'
import {MAIN_ROUTE} from "../Utils";

const AppRouter = () => {

    const isAuth = true
    return (
        <Routes>
            {isAuth && AuthRoutes.map(({path, Component}) =>
                <Route key ={path} path = {path} element = {<Component/>} exact />
            )}

            {PublicRoutes.map(({path, Component}) =>
                <Route key ={path} path = {path} element = {<Component/>} exact />
            )}
        </Routes>

    )

}

export default AppRouter;