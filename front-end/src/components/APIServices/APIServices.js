import { redirectTo } from '@reach/router';
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Redirect } from '@reach/router';

const BASE_URL = "http://localhost:13233/ClothStore"
const BASE_URL_API = BASE_URL + "/rest"


function getToken() {
    const cookies = new Cookies();

    const token = cookies.get('httpOnly')

    return token
}

async function createCloth(name, description, price, type) {

    try {
        const url = BASE_URL_API + "/clothes"
        const resp = await axios.post(url, {
            name: name,
            description: description,
            price: price,
            type: type
        }, { headers: { authorization: `Bearer ${getToken()}` } });

        if(resp.status === 401) {
            console.log("Oi");
            <Redirect to='/fashion-store/login' noThrow />
        }
        const id = resp.data.idCloth
        return id

    } catch (err) {
        console.log(err)
    }
}

async function updateCloth(idCloth, name, description, price, type) {
    try {
        const url = BASE_URL_API + "/clothes/" + idCloth
        const resp = await axios.put(url, {
            name: name,
            description: description,
            price: price,
            type: type
        }, { headers: { authorization: `Bearer ${getToken()}` } });

    } catch (err) {
        console.log(err)
    }
}

async function createComment(name, picture, rate, title, comment) {
    try {
        const url = BASE_URL_API + "/comments"
        const resp = await axios.post(url, {
            name: name,
            picture: picture,
            rate: rate,
            title: title,
            comment: comment
        })
    } catch (err) {
        console.log(err)
    }
}

async function getClothes() {
    try {
        const url = BASE_URL_API + "/clothes"
        const data = await axios.get(url)
        return data.data;
    } catch (err) {
        console.log(err)
    }
}

async function getClothesFirstImage() {
    const idClothArray = [];
    const tempClothArray = [];
    try {
        const url = BASE_URL_API + "/clothes"
        const data = await axios.get(url)
        data.data.forEach(clothItem => {
            if (!idClothArray.includes(clothItem.idCloth)) {
                idClothArray.push(clothItem.idCloth)
                tempClothArray.push(clothItem)
            }
        });
        return tempClothArray
    } catch (err) {
        console.log(err)
    }

}

async function getComments() {
    try {
        const url = BASE_URL_API + "/comments"
        const resp = await axios.get(url)
        return resp.data
    } catch (err) {
        console.log(err)
    }
}

async function getClothesByType(category) {
    try {
        const url = BASE_URL_API + "/clothes/type/" + category
        const data = await axios.get(url)
        return data.data;
    } catch (err) {
        console.log(err)
    }
}

async function getStoriesData() {
    const data = await fetch('./RoupasStories.json');
    const roupasData = await data.json()

    const tempRoupas = []

    for (let key in roupasData.roupas) {
        if (key !== "tudo")
            tempRoupas.push(roupasData.roupas[key][0])
    }

    return tempRoupas
}

async function getCategoriesData() {
    const data = await getStoriesData()
    const categoriesNames = data.map(data => data.name.toLowerCase());

    return categoriesNames
}

async function getPromoData(type) {
    const data = await fetch('./RoupasStories.json');
    const roupasData = await data.json();
    return roupasData.roupas[type];
}

async function getCommentData(quantity) {
    const data = await fetch('./Comments.json')
    const commentsData = await data.json();
    return commentsData.comments.slice(0, quantity);
}

async function uploadImage(image, idcloth, name) {
    const formData = new FormData();
    const url = BASE_URL_API + "/file_upload"
    formData.append("file", image);
    formData.append("clothReference", idcloth);
    formData.append("imageName", name);

    try {
        const resp = await axios.post(url, formData, {
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        })
        return resp.data
    } catch (err) {
        console.log(err)
    }
}


export { createCloth, updateCloth, getComments, createComment, getClothes, getClothesFirstImage, getClothesByType, getStoriesData, getCategoriesData, getPromoData, getCommentData, uploadImage }