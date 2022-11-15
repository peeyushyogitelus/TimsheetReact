import AppSetting from '../../package.json';
import React, { useState, useEffect, Fragment } from "react";
import { Route, Switch } from 'react-router-dom';
import AuthContext from './AuthDetails';
import Layout from "../Layout/layout";
import HomeComponent from '../Pages/Home';
import LoginComponent from '../Pages/Login';
import TimesheetComponent from '../Timesheet/timesheet'



const AuthProvider = (props) => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const [isLoggedIn, setLoggedState] = useState({
        "userName": "",
        "userEmail": "",
        "userAccountId": "",
        "userId": "",
        "isPunchClock": "",
        "accountPermission": "",
        "bearerToken": ""
    });
    let isUserLoggedIn = false;
    let isBearerTokenGen = false;
    let isLoginButtonVisible = true;
    useEffect(() => {
        /** Set Local Storage Information **/
        if (isLoggedIn.userId != "") {
            localStorage.setItem("user_name", isLoggedIn.userName);
            localStorage.setItem("user_email", isLoggedIn.userEmail);
            localStorage.setItem("user_account_id", isLoggedIn.userAccountId);
            localStorage.setItem("user_id", isLoggedIn.userId);
            localStorage.setItem("account_permission", isLoggedIn.accountPermission);
        }
        /**end**/
    }, [isLoggedIn]);

    const MLUserId = localStorage.getItem("user_id");
    let BearerToken = localStorage.getItem("AccessToken");
    const proxyurl = AppSetting.Urls.proxyurl_in_use;

    if (MLUserId != "" && MLUserId != undefined && MLUserId != null) {
        isUserLoggedIn = true;
        isLoginButtonVisible = false;
    }
    if (BearerToken != "" && BearerToken != null && BearerToken != undefined) {
        isBearerTokenGen = true;
        isLoginButtonVisible = false;
    }

    useEffect(() => {
        if (isUserLoggedIn == false && isBearerTokenGen == false) {
            if (code && code !== "" && code != null) {
                isLoginButtonVisible = false;
                let tokenUrl =  proxyurl+"https://app.mavenlink.com/";
                tokenUrl += `oauth/token?`;
                tokenUrl += `client_id=${AppSetting.APIConfirguration.appId}`;
                tokenUrl += `&client_secret=${AppSetting.APIConfirguration.appSecret}`;
                tokenUrl += `&grant_type=authorization_code`;
                tokenUrl += `&redirect_uri=${AppSetting.APIConfirguration.authCallbackUrl}`;
                tokenUrl += `&code=${code}`;
                fetch(tokenUrl, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }).then((response) => {
                    if (response.ok) {
                        response.json().then(
                            (result) => {

                                if (result.access_token !== undefined && result.access_token !== "") {
                                    localStorage.setItem("AccessToken", result.access_token);
                                    isBearerTokenGen = true;
                                    BearerToken = result.access_token;
                                    GetUserInformation(result.access_token);
                                }
                            }
                        )
                    } else {
                        response.json().then(
                            (data) => {
                                if (data && data.error && data.error.message) {
                                    console.log(data);
                                }
                            }
                        )
                    }
                });
            } else {
                console.error("Error..!", "User is not logged In and code is also not generated");
            }
        }
        else if (isUserLoggedIn == false && isBearerTokenGen == true) {
            GetUserInformation(BearerToken);
        }
        else if (isUserLoggedIn == true && isBearerTokenGen == true) {
            setLoggedState({
                userName: localStorage.getItem('user_name'),
                userEmail: localStorage.getItem('user_email'),
                userAccountId: localStorage.getItem('user_account_id'),
                userId: localStorage.getItem('user_id'),
                accountPermisson: localStorage.getItem('account_permission'),
                accessToken:localStorage.getItem("AccessToken")
            });
        }
    }, []);

    function GetUserInformation(access_token) {
       const userInformationUrl = proxyurl+"https://api.mavenlink.com/api/v1/users/me.json";
        fetch(userInformationUrl, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then(
                    (result) => {
                        if (result.count > 0) {
                            let lstUsers = result.users;
                            let lstUserDetails = Object.keys(lstUsers).map((key) => lstUsers[key]);
                            setLoggedState({
                                userName: lstUserDetails[0]['full_name'],
                                userEmail: lstUserDetails[0]['email_address'],
                                userAccountId: lstUserDetails[0]['account_id'],
                                userId: lstUserDetails[0]['id'],
                                accountPermisson: lstUserDetails[0]['account_permission'],
                                isPunchClock: lstUserDetails[0]['is_punch_clock_user'],
                                accessToken:access_token
                            });
                        }
                    }
                )
            }
        })
    }

    function GetAuthCode() {
        const url = `https://app.mavenlink.com/oauth/authorize?response_type=code&client_id=${AppSetting.APIConfirguration.appId}&redirect_uri=${AppSetting.APIConfirguration.authCallbackUrl}`;
        window.open(url, "_self");
    }
    return (
        <div>
            <AuthContext.Provider value={{
                userName: isLoggedIn.userName,
                userEmail: isLoggedIn.userEmail,
                userAccountId: isLoggedIn.userAccountId,
                userId: isLoggedIn.userId,
                accessToken:isLoggedIn.accessToken
            }} >
                {
                    isLoggedIn.userId?
                    <Fragment>
                        <Layout />
                        <Switch>
                            <Route path="/" exact component={HomeComponent} />
                            <Route path="/timesheet" component={TimesheetComponent} />
                        </Switch>
                    </Fragment>
                    :
                    <Fragment>
                        <button onClick={GetAuthCode}>Sign In</button>
                        <LoginComponent />
                    </Fragment> 
                    
                }
            </AuthContext.Provider>
            
        </div>
    )
}



export default AuthProvider;