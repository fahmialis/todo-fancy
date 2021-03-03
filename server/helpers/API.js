const axios = require('axios');
const { response } = require('express');


const API = (req, res, next) =>{
  axios({
    method : 'GET',
    url : ''
})
.then(response =>{
    next()
})  
.catch(err =>{
    console.log(err);
    next(err)
})
}

module.exports = API
