import Admin from './Pages/Admin'
import FormAuth from "./Pages/FormAuth";
import {ADMIN_ROUTE, CONTACTS_ROUTE, INFO_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, USER_STAVKI_ROUTE, LOGIN_ROUTE} from "./Utils";
import {RatesPage, TeamsPage} from "./App";

export const AuthRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },

    {
        path: USER_STAVKI_ROUTE,
        Component: RatesPage
    }
]

export const PublicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: TeamsPage
    },
    {
        path: INFO_ROUTE,
    },
    {
        path: CONTACTS_ROUTE,
    },
    {
        path: MAIN_ROUTE + '/:id',
        Component: TeamsPage
    },
    // {
    //     path: REGISTRATION_ROUTE,
    //     Component:
    // },
    {
        path: LOGIN_ROUTE,
        Component: FormAuth
    },
    // {
    //     path: MATCH_ROUTE,
    //     Component:
    // }
]
