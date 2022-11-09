import React, { Component, useContext } from 'react';
import '../www/css/style_generic.css';

const Layout = (props) => {
    return (
        <div className="col-md-12" id="main">
            <div className="row">
                <div id="sidebar" className="col-md-1 active">
                    <section className="navigation-application">
                        <div className="page-links ">
                            <ul className="links">
                                <li>
                                    <a href="https://app.mavenlink.com/dashboard" title="Go to dashboad">Dashboard</a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
                <div id="rightpanel" className="col-md-12">
                    <div id="formbodyheader" className="">
                        <span id="sidebarCollapse" title="Toggle Left Menu"
                            >&#9776;</span>
                        <span>Powered by Mavenlink Forms</span>
                        <a className="formnavusername" title="Click for user detail information." data-toggle="collapse" href="#userdetailscollapsediv" role="button" aria-expanded="false" aria-controls="userdetailscollapsediv"><i className="fa fa-user" aria-hidden="true"></i> &nbsp;{props.email}</a>
                        <div className="row">
                            <div className="collapse" id="userdetailscollapsediv">
                                <div className="greybox">
                                    <p><b>Username :</b> <span>{props.username}</span></p>
                                    <p><b>Email :</b> <span>{props.email}</span></p>
                                    <p><b>User ID :</b> <span>{props.user_id}</span></p>
                                    <p><b>Account ID :</b> <span>{props.account_id}</span></p>
                                    <p><b>Account Permissions :</b> <span>{props.account_permission}</span></p> <hr />
                                    <a id="lblUserName" title="Refresh Session" data-toggle="tooltip"> Refresh Session</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}


export default Layout;