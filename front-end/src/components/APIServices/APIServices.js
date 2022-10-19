import { navigate } from '@reach/router';
import axios from 'axios'
import Cookies from 'universal-cookie'

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
        return resp.data.idCloth

    } catch (err) {
        console.log(err)
        if (err.response.status === 401) {
            navigate('./login')
        }
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
        console.log(resp)
    } catch (err) {
        console.log(err)
        if (err.response.status === 401) {
            navigate('./login')
        }
    }
}

async function deleteCloth(idCloth) {
    try {
        const url = BASE_URL_API + "/clothes/" + idCloth
        const resp = await axios.delete(url, { headers: { authorization: `Bearer ${getToken()}` } })
        console.log(resp)
    } catch (err) {
        console.log(err)
        if (err.response.status === 401) {
            navigate('./login')
        }
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
        console.log(data.data)
        return data.data;
    } catch (err) {
        console.log(err)
    }
}

async function getClothesTypes(category) {
    try {
        const url = BASE_URL_API + "/clothes/type/"
        const data = await axios.get(url)
        console.log(data)
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

async function uploadImage(image, idCloth, name) {
    const formData = new FormData();
    const url = BASE_URL_API + "/file_upload"
    formData.append("file", image);
    formData.append("clothReference", idCloth);
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

async function deleteImages(idCloth) {
    const url = BASE_URL_API + "/file_upload/" + idCloth
    try {
        const resp = await axios.delete(url);
        return resp.data
    } catch (error) {
        console.log(error)
    }
}


export { createCloth, updateCloth, deleteCloth, getClothesTypes, getComments, createComment, getClothes, getClothesFirstImage, getClothesByType, getStoriesData, getCategoriesData, getPromoData, getCommentData, uploadImage, deleteImages }