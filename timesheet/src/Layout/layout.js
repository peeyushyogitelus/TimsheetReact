import React, { Component, useContext } from 'react';
import AuthContext from '../AuthContext/AuthDetails';
const Layout = (props) => {
    const [contextInfo,setContextInfo] = useContext(AuthContext);
    return (
            <div className="col-md-12" id="main">
                <div className="row">
                    <div id="sidebar" className="col-md-1 active">
                        <section className="navigation-application">
                           {props.name}
                        </section>
                    </div>

                </div>
            </div>
        )
    
}

export default Layout;