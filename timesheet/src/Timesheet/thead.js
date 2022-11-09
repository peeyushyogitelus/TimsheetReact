import React from 'react';
import './timesheet.css';

function thead(props) {
    //console.log("start date is"+props.startDate);
    const strdate = props.startDate.substring(8);
    const sDate = parseInt(strdate);
   // console.log(strdate+" is of type"+typeof(sDate));
    // console.log(typeof(sDate));
    return (
        <thead>
            <tr>
                <td>Id</td>
                <td>Project</td>
                <td>Task</td>
                <td className="cell">Sun {sDate}</td>
                <td className="cell">Mon {sDate+1}</td>
                <td className="cell">Tue {sDate+2}</td>
                <td className="cell">Wed {sDate+3}</td>
                <td className="cell">Thurs {sDate+4}</td>
                <td className="cell">Fri {sDate+5}</td>
                <td className="cell">Sat {sDate+6}</td>
                <td>Del</td>
                <td>Edit</td>
            </tr>
        </thead>
    );
}

export default thead