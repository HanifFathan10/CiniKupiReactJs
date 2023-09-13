import axios from 'axios'

export const getImage = (callback)=> {
    axios.get("http://localhost:5000/api/v1/post").then(res => {
        callback(res.data);
    }).catch (error => {
        console.log(error)
    })
    
}

export const getImageById = (_id, callback)=> {
    axios.get(`http://localhost:5000/api/v1/post/${_id}`).then(res => {
        callback(res.data);
    }).catch (error => {
        console.log(error)
    })
    
}