import React from "react";

const ErrorModal = (props) => {
    return(
        <div>
            Error Message:{props.error_message}<br />
            Error Status :{props.error_status}<br />
            Error Segment : {props.error_segment}<hr />
        </div>
    )  
}

export default ErrorModal;
