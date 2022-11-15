import React from 'react';

const AuthContext = React.createContext({
    accessToken : "",
    userName:"",
    userEmail:"",
    userAccountId:"",
    userId:"",
    adminToken:"",
    userAccountPermission:"NRC"
});
export default AuthContext;