function postDataToServer(PrmContext, PrmPostURL, PrmJsnFormParams, PrmCallBack, PrmDataType, PrmBlnSynchronous) {
    try {
        var PrmBlnSynchronous1 = false;
        if (PrmBlnSynchronous != undefined && PrmBlnSynchronous == true)
            PrmBlnSynchronous1 = true;

        $.ajax({
            type: "POST",
            url: UrlWithApplicationName(PrmPostURL) + PrmPostURL,
            data: PrmJsnFormParams,
            async: PrmBlnSynchronous1,           
        
            success: function (PrmResponse) {
                receiveServerData(PrmResponse, PrmContext, PrmCallBack, PrmDataType);
            },
            error: function (PrmResponse, PrmError) {
                swal('', 'Error in ' + PrmContext + ' method ' + PrmResponse.responseText, 'error');
                $("#LockPanelSaveMavenPage").removeClass("LockOn");
                $("#LockPanelSaveMavenPage").addClass("LockOff");
                $("#LockPanel").removeClass("LockOn");
                $("#LockPanel").addClass("LockOff");
                $("#LockPanelPDF").removeClass("LockOn");
                $("#LockPanelPDF").addClass("LockOff");
            }
        });
    }
    catch (error) {
        swal('', 'Error in ' + PrmContext + ' method: ' + error.message, 'error');
        $("#LockPanelSaveMavenPage").removeClass("LockOn");
        $("#LockPanelSaveMavenPage").addClass("LockOff");
        $("#LockPanel").removeClass("LockOn");
        $("#LockPanel").addClass("LockOff");
        $("#LockPanelPDF").removeClass("LockOn");
        $("#LockPanelPDF").addClass("LockOff");
    }
}
function receiveServerData(PrmResponse, PrmContext, PrmCallBack, PrmDataType) {
    try {
        if ((PrmContext != undefined && PrmContext != null) && (PrmResponse != undefined && PrmResponse != null) && (PrmDataType != undefined && PrmDataType != null)) {
            if (PrmCallBack != 'undefined' && PrmCallBack !== "" && PrmCallBack != null) {
                PrmCallBack(PrmResponse, PrmContext);
            }
        }
    }
    catch (error) {
        alert('Error in ' + PrmContext + ' method: ' + error.message);
        $("#LockPanelSaveMavenPage").removeClass("LockOn");
        $("#LockPanelSaveMavenPage").addClass("LockOff");
        $("#LockPanel").removeClass("LockOn");
        $("#LockPanel").addClass("LockOff");
        $("#LockPanelPDF").removeClass("LockOn");
        $("#LockPanelPDF").addClass("LockOff");
    }
}

function pathUrl() {
       return window.location.href.substr(0, window.location.href.lastIndexOf('/') + 1);
}
function UrlWithApplicationName(strPostUrl) {
    if (strPostUrl != "") {
        strPostUrl = strPostUrl.split('/')[0]
        return  window.location.href.split(strPostUrl)[0]
    }
   
}