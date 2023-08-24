const config = require('../config.json');
const axios = require('axios');
const baseUrl = $`https://${config.tenantDomain}/`;
const connection = config.connection;
const clientId = config.clientId;
const clientSecret = config.clientSecret;
const signUpUrl = $`${baseUrl}${connection}/signup`;
const loginUrl = $`${baseUrl}/oauth/token`;




const signUp = async(email,password) => {
    try {
        const body =  {
            client_id : clientId,
            email : email,
            password : password,
            connection : connection
        }
        axios.post(signUpUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        });
    }
    catch(e) {
        console.log(e);
    }
}

const login = async(email,password) => {
    try {
        const body =  {
            grant_type: 'password',
            client_id : clientId,
            client_secret : clientSecret,
            username : email,
            password : password
        }
        axios.post(signUpUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        });
    }
    catch(e) {
        console.log(e);
    }
}

module.exports.login = login;
module.exports.signUp = signUp;
