const axios = require('axios');
const { response } = require('express');


const randomActionAPI = (req, res, next) =>{
  axios({
    method : 'GET',
    url : 'https://www.boredapi.com/api/activity/'
})
.then(response =>{
    // res.send(response)
    console.log(response,'ini middle ware');
    res.status(200).json({message : response})
    next()
})  
.catch(err =>{
    console.log(err);
    next(err)
})
}

module.exports = randomActionAPI
