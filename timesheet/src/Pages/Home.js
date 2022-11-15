import React from "react";
import { Link } from "react-router-dom";


const Home = (props) =>{
    return (<div>
        <div className="row">
         <div className="col-lg-2"><Link to="/timesheet">Time Sheet</Link></div>
            
        </div>
    </div> )

}
export default Home;