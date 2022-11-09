import React from "react";
import AppSetting from '../../package.json';
import { useState, useContext } from "react";
import Layout from "../Layout/layout";
import { useEffect } from "react";
import HomeComponent from '../Pages/Home';
import TimesheetComponent from '../Timesheet/timesheet';
import { Route, Switch } from 'react-router-dom';


const AuthProvider = (props) => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const [isLoggedIn, setLoggedState] = useState({
        "userName": "",
        "userEmail": "",
        "userAccountId": "",
        "userId": "",
        "isPunchClock":"",
        "accountPermission":"",
        "bearerToken":""
    });
    useEffect(() => {
        /** Set Local Storage Information **/
        localStorage.setItem("user_name", isLoggedIn.userName);
        localStorage.setItem("user_email", isLoggedIn.userEmail);
        localStorage.setItem("user_account_id", isLoggedIn.userAccountId);
        localStorage.setItem("user_id", isLoggedIn.userId);
        localStorage.setItem("account_permission",isLoggedIn.accountPermission);
        /**end**/
    }, [isLoggedIn]);

    useEffect(() => {
        const MLUserId = localStorage.getItem("user_id");
        if (MLUserId == undefined || MLUserId == "") {
            if (code && code !== "" && code != null) {
                const proxyurl = AppSetting.Urls.proxyurl_in_use;
                let tokenUrl = proxyurl + "https://app.mavenlink.com/";
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
                function GetUserInformation(access_token) {
                    const userInformationUrl = proxyurl + "https://api.mavenlink.com/api/v1/users/me.json";
                    fetch(userInformationUrl, {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + access_token
                        }
                    }).then((response) => {
                        console.clear();
                        console.log(response);
                        if (response.ok) {
                            response.json().then(
                                (result) => {

                                    if (result.count > 0) {
                                        let lstUsers = result.users;
                                        let lstUserDetails = Object.keys(lstUsers).map((key) => lstUsers[key]);
                                        console.log(lstUserDetails);
                                        setLoggedState({
                                            userName: lstUserDetails[0]['full_name'],
                                            userEmail: lstUserDetails[0]['email_address'],
                                            userAccountId: lstUserDetails[0]['account_id'],
                                            userId: lstUserDetails[0]['id'],
                                            accountPermisson: lstUserDetails[0]['account_permission'],
                                            isPunchClock: lstUserDetails[0]['is_punch_clock_user']
                                        });
                                    }


                                }
                            )
                        }
                    })
                }

            }
        }else{
            setLoggedState({
                userName: localStorage.getItem('user_name'),
                userEmail: localStorage.getItem('user_email'),
                userAccountId: localStorage.getItem('user_account_id'),
                userId: localStorage.getItem('user_id'),
                accountPermisson: localStorage.getItem('account_permission')
            });
        }
    },[]);



    function GetAuthCode() {
        const url = `https://app.mavenlink.com/oauth/authorize?response_type=code&client_id=${AppSetting.APIConfirguration.appId}&redirect_uri=${AppSetting.APIConfirguration.authCallbackUrl}`;
        window.open(url, "_self");
    }
    return (
        <div>
            {
                code?"":<button onClick={GetAuthCode}>Let me Log In</button>
            }   
            <Layout email={isLoggedIn.userEmail} username={isLoggedIn.userName} user_id={isLoggedIn.userId} account_id={isLoggedIn.userAccountId} account_permission={isLoggedIn.accountPermission} />
            <Switch>
                <Route path="/Home" component={HomeComponent} />
                <Route path="/timesheet" component={TimesheetComponent} />
                <Route path="/PMDashboard" />
            </Switch>
        </div>
    )
}



export default AuthProvider;