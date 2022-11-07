import React from "react";
import AppSetting from '../../package.json';
import { useState , useContext } from "react";
import AuthContext from './AuthDetails';
import Layout from "../Layout/layout";


const AuthProvider = (props) =>{
    const [contextInfo,setContextInfo]= useContext(AuthContext);
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    console.log("Code:", code);
    const [bearerToken,setBearerToken] = useState("");
    const [isLoggedIn,setLoggedState] = useState({
       "userName":"12",
       "userEmail":"",
       "userAccountId":"",
       "userId":"" 
    });
    const userToken = "";
    const errorMessage = "";
    
    if(code && code!=="" && code!=null){
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        let tokenUrl = proxyurl+"https://app.mavenlink.com/";
        tokenUrl += `oauth/token?`;
        tokenUrl += `client_id=${AppSetting.APIConfirguration.appId}`;
        tokenUrl += `&client_secret=${AppSetting.APIConfirguration.appSecret}`;
        tokenUrl += `&grant_type=authorization_code`;
        tokenUrl += `&redirect_uri=${AppSetting.APIConfirguration.authCallbackUrl}`;
        tokenUrl += `&code=${code}`;
        fetch(tokenUrl,{
            method:"POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then(
                    (result) => {
                        if (result.access_token !== undefined && result.access_token !== ""){
                            localStorage.setItem("AccessToken", result.access_token);
                            GetUserInformation(result.access_token);
                        }
                    }
                )
            }else{
                response.json().then(
                    (data)=>{
                        if(data && data.error && data.error.message){
                            console.log(data);
                        }
                    }
                )
            }
        });
        function GetUserInformation(access_token){
            const userInformationUrl = proxyurl+"https://api.mavenlink.com/api/v1/users/me.json";
            fetch(userInformationUrl,{
                method:"GET",
                headers:{
                    "Authorization":"Bearer "+access_token
                }
            }).then((response)=>{
                if(response.ok){
                    response.json().then(
                        (result)=>{
                            console.log(result);
                            if(result.count>0){
                                let lstUsers = result.users;
                                let lstUserDetails = Object.keys(lstUsers).map((key) => lstUsers[key]);
                                setLoggedState({
                                    userName:lstUserDetails[0]['first_name'],
                                    userEmail:lstUserDetails[0]['email_address'],
                                    userAccountId:lstUserDetails[0]['account_id'],
                                    userId:lstUserDetails[0]['id']
                                });
                            }
                            
                            
                        }
                    )
                }
            })
        }
        
    }
    
    function GetAuthCode() {
        const url = `https://app.mavenlink.com/oauth/authorize?response_type=code&client_id=${AppSetting.APIConfirguration.appId}&redirect_uri=${AppSetting.APIConfirguration.authCallbackUrl}`;
        window.open(url,"_self");
    } 
    return (
        <div>
            <button onClick={GetAuthCode}>Verify Me</button>
            <Layout name={isLoggedIn.userName} />
        </div>
    )
}

    
   
export default AuthProvider ;