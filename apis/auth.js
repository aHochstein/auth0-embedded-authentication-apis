const config = require('../config.json');
const axios = require('axios');
const querystring = require('querystring');
const baseUrl = `https://${config.tenantDomain}/`;
const mfaAudience = `https://${config.tenantDomain}/mfa/`;
const connection = config.connection;
const clientId = config.clientId;
const clientSecret = config.clientSecret;
const signUpUrl = `${baseUrl}dbconnections/signup`;
const loginUrl = `${baseUrl}oauth/token`;
const getAuthenticatorsUrl = `${baseUrl}mfa/authenticators`;
const requestChallengeUrl = `${baseUrl}mfa/challenge`;




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
            realm: connection,
            audience: mfaAudience
        }
        const response = await axios.post(loginUrl, body,{ 
            headers: {'content-type': 'application/x-www-form-urlencoded'}});
        return { mfa_required: false, user: response.data};        
    }
    catch(e) {
        console.log(e);
        const data = e.response.data;
        if(data.error === 'mfa_required'); {
            return {
                mfa_required : true,
                mfa_token: data.mfa_token    
            };
        }
        return null;
    }
}

const verifyWithOtp = async(otp,mfa_token) => {
    try {
        const body =  {
            grant_type: 'http://auth0.com/oauth/grant-type/mfa-otp',
            client_id : clientId,
            client_secret : clientSecret,
            mfa_token : mfa_token,
            otp : otp
        }
        const response = await axios.post(loginUrl, body,{ 
            headers: {'content-type': 'application/x-www-form-urlencoded'}});
        return response.data;        
    }
    catch(e) {
        console.log(e);
    }
}

const requestChallenge = async(mfa_token) => {
    try {
        const body =  {
            client_id : clientId,
            client_secret : clientSecret,
            mfa_token : mfa_token,
            otp : otp
        }
        const response = await axios.post(requestChallengeUrl, body);
        return response.data;        
    }
    catch(e) {
        console.log(e);
    }
}


const getAuthenticators = async(accessToken) => {
    try {
        const response = await axios.get(getAuthenticatorsUrl, 
            {headers: {'Authorization': `Bearer ${accessToken}`}});
        return response.data;        
    }
    catch(e) {
        console.log(e);
    }
}

module.exports.login = login;
module.exports.signUp = signUp;
module.exports.verifyWithOtp = verifyWithOtp;
