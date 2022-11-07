import React from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    accessToken : "",
    userName:"",
    userEmail:"",
    userAccountId:"",
    userId:"",
    adminToken:""
});
export default AuthContext;