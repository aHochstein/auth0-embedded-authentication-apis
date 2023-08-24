const config = require('../config.json');
const axios = require('axios');
const querystring = require('querystring');
const baseUrl = `https://${config.tenantDomain}/`;
const connection = config.connection;
const clientId = config.clientId;
const clientSecret = config.clientSecret;
const signUpUrl = `${baseUrl}dbconnections/signup`;
const loginUrl = `${baseUrl}oauth/token`;




const signUp = async(email,password) => {
    try {
        const body =  {
            client_id : clientId,
            email : email,
            password : password,
            connection : connection
        }
        const response = await axios.post(signUpUrl, body);
        return response.data;      
    }
    catch(e) {
        console.log(e);
    }
}

const login = async(email,password) => {
    try {
        const body =  {
            grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
            client_id : clientId,
            client_secret : clientSecret,
            username : email,
            password : password,
            realm: connection
        }
        const response = await axios.post(loginUrl, body,{ 
            headers: {'content-type': 'application/x-www-form-urlencoded'}});
        return response.data;        
    }
    catch(e) {
        console.log(e);
    }
}

module.exports.login = login;
module.exports.signUp = signUp;
