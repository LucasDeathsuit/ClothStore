import axios from 'axios'
import Cookies from 'universal-cookie';

const BASE_URL = "http://localhost:13233/ClothStore"
const BASE_URL_API = BASE_URL + "/rest"


function getToken() {
    const cookies = new Cookies();

    const token = cookies.get('httpOnly')

    return token
}

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

async function getUserData(username) {
    const url = BASE_URL_API + "/users/" + username
    try {
        const resp = await axios.get(url, { headers: { authorization: `Bearer ${getToken()}` } })
        console.log(resp)

        return resp

    } catch (error) {
        return error.response
    }
}

export { createUser, authenticate, getUserData }