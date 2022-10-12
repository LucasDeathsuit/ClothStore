import axios from 'axios'
import { useContext } from 'react'
import Cookies from 'universal-cookie'
import { AuthContext } from '../../Providers/Auth'

const BASE_URL = "http://localhost:13233/ClothStore"
const BASE_URL_API = BASE_URL + "/rest"


async function createUser(username, password, userAccess) {

    const url = BASE_URL_API + "/sign-up"
    try {
        const resp = await axios.post(url, {
            username: username,
            password: password,
            userAccess: userAccess
        });
        return resp;
    } catch (error) {
        return error.response;
    }
}

async function authenticate(username, password) {
    const url = BASE_URL_API + "/login"
    try {
        const resp = await axios.post(url, {
            username: username,
            password, password
        })
        return resp
    } catch (error) {
        return error.response
    }

}

export { createUser, authenticate }