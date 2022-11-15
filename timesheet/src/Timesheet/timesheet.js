import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './timesheet.css';
import Thead from './thead';
import TimeEntries from './time_entries'
import AuthContext from '../AuthContext/AuthDetails';
import ErrorModal from '../Pages/Errors';
import AppSetting from '../../package.json';

const Timesheet = () => {
  const [rowList, setNewRow] = useState([
    { row: "" },
  ]);
  const handleRowAdd = () => {
    setNewRow([...rowList, { row: "" }])
  }
  const contextData = useContext(AuthContext);
  var ob = "task_";

  const [lstWorkspace, setProject] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [story, setStories] = useState();
  const [ids, setStoryIds] = useState();
  const [lstTimeEntry, setTimeEntry] = useState([]);
  const [allTimeEntries, timeEntryHandler] = useState([]);
  const [lstError,setErrors] = useState([]);
  const [selected, setSelected] = useState("");
  const [taskId, setTaskId] = useState("");
  const [curDdlId, setcurDdlId] = useState("");
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const processurl = AppSetting.Urls.ApiUrl + "/" + AppSetting.Urls.ApiVersion+"/";
  
  const userId = contextData.userId;
  const bearerToken = contextData.accessToken;
  let   errorData = [];
  const requestBody = {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + bearerToken,
      'Content-Type': 'application/json'
    }
  };
  function setDdlIds(){
    setcurDdlId()
   }
   
  useEffect(() => {
    /** Identify Logged In user is participants of how many workspaces */
    
    let url = processurl+"workspaces?has_participant=" + userId+"&page=1&per_page=200";
    let lstWorkpaces = [];
    let objWorkspace = {};
    
    try {
      fetch(url, requestBody).then(
        response => {
          if (response.status == 200) {
            response.json().then((result) => {
              if (result !== undefined && result !== null && result !== "") {
                let objWorkspaces = result.workspaces;
                let lstWorkspaceDetails = Object.keys(objWorkspaces).map((key) => objWorkspaces[key]);
               if(result.count >0){
                lstWorkspaceDetails.map((objPorj,index)=>{
                  objWorkspace = {
                    id:objPorj.id,
                    name:objPorj.title,
                  }
                  lstWorkpaces.push(objWorkspace);
                });
                  if(result.count >200){

                  }
                }
                /** Add Name of Workspace, Id,  */
                console.log("=====list of workspace=======");
                console.log(lstWorkpaces);
                setProject(lstWorkpaces)
                //setHeaders(Object.keys(result.workspaces))
              }
            })
          }else{
            let errorObj = {
              statusCode:response.status,
              statusText:response.statusText,
              segment:"Get Associate Workspace"
            }
            console.error(errorObj);
            errorData.push(errorObj);
          }
        }
      )
    }
    catch (error) {
      let errorObj = {
        statusCode:error.status,
        statusText:error.statusText,
        segment:"Get Associate Workspace"
      }
      console.error(errorObj);
      errorData.push(errorObj);
    }
    
  },[]);
  
 /** Get Time entries of User  */
  useEffect(() => {
   
    var bool = "false";
    const url3 = processurl+"time_entries?user_id=" + userId + "&date_performed_between=2022-10-16:2022-10-22&active_submission_id=" + bool+"&page=1&per_page=200";
    let lstTimeEntries = [];
    let objTimeEntries = {};
    try {
      fetch(url3, requestBody).then(response => {
        if (response.status == 200 || response.ok) {
          response.json().then((result) => {
            if (result !== undefined && result !== null && result !== "") {
              if(result.count > 0 ){
                let objTimeEntries = result.time_entries;
                let lstTimeEntriesDetails = Object.keys(objTimeEntries).map((key) => objTimeEntries[key]);
                lstTimeEntriesDetails.map((obj,index)=>{
                  objTimeEntries = {
                    id:obj.id,
                    workspace_id:obj.workspace_id,
                    story_id:obj.story_id,
                    time_in_minutes:obj.time_in_minutes,
                    date_performed:obj.date_performed
                  }
                  lstTimeEntries.push(objTimeEntries);
                });
                if(result.count > 200){
                  /** Implementation is pending */
                }
              }
              setTimeEntry(lstTimeEntries)
              
            } 
          })
        }else{
          let errorObj = {
            statusCode:response.status,
            statusText:response.statusText,
            segment:"Get Time Entries Workspace"
          }
          console.error(errorObj);
          errorData.push(errorObj);
        }
      })
    }
    catch (error) {
      let errorObj = {
        statusCode:error.status,
        statusText:error.statusText,
        segment:"Get Associate Workspace"
      }
      console.error(errorObj);
      errorData.push(errorObj);
    }

  }, []);
  /**end */
  
  

  /** On change of Workspace Bind relative task */
  const taskBind = (event) => {
    setSelected(event.target.value);
    var workspace_id = event.target.value;
    var source_row_id = event.target.id;
    var target_row_id = "ddlTask_"+source_row_id.split('_')[1];
    console.log("Source Row ",source_row_id);
    console.log("Target Row ",target_row_id);
    const url2 = processurl+ "stories?workspace_id=" + workspace_id;

    /**
     * 1 W_ID -> [ 1.1, 1.2, 1.3,1.4, 2.1, 2.2, 2.3, 2.4 ] --> Ids ( overlap or addition in existing array )
     * 2 W_ID -> [ 1.1, 1.2, 1.3,1.4, 2.1, 2.2, 2.3, 2.4 ] -->Ids ( overlap or addition in existing array )
     * 
     */
    
    fetch(url2, requestBody).then((response) => response.json().then((result) => {
      setStories(result.stories)
      setStoryIds(Object.keys(result.stories))
    }))
   }
   /**end */
   /** On change task get respective time entries */
  const getTaskId = (event) => {
    setTaskId(event.target.value)
  }
  /** End */

  const startDate="2022-10-16"
  const strdate = startDate.substring(8);
  const sDate = parseInt(strdate);

  return (
    <div>
 <h5>Start Date:2022-10-16</h5>
      <h5>End Date:2022-10-22</h5>
      <table className='table table-striped table-bordered' >
        <Thead startDate="2022-10-16" />
        <tbody >
            {
              
              lstTimeEntry ?
              lstTimeEntry.map((item, index) => (
                  <tr>
                  <td>{index+1}</td>
                 {
                   lstWorkspace.filter(x=>x.id==item.workspace_id).map(objWork=>{
                    console.log(objWork);
                    <td value={item.id}>{objWork.name}</td>
                   })
                  
                  }
                  <td value={item.id} >{item.story_id}</td>
                  <td>
                     {
                      item.date_performed.substring(8) == sDate?
                      <input type="text" id_value={item.id} value={item.time_in_minutes} className="cell" />
                       :""
                      }
                  </td>
                  <td>
                     {
                      item.date_performed.substring(8) == sDate+1?
                      <input type="text" id_value={item.id} value={item.time_in_minutes} className="cell" />
                      // console.log( item.date_performed.substring(8)+"sdate is"+sDate)
                      :""
                      }
                  </td>
                  <td>
                     {
                      item.date_performed.substring(8) == sDate+2?
                      <input type="text" id_value={item.id} value={item.time_in_minutes} className="cell" />
                      :""
                      }
                  </td>
                  <td>
                     {
                      item.date_performed.substring(8) == sDate+3?
                      <input type="text" id_value={item.id} value={item.time_in_minutes} className="cell" />
                      :""
                      }
                  </td>
                  <td>
                     {
                      item.date_performed.substring(8) == sDate+4?
                      <input type="text" id_value={item.id} value={item.time_in_minutes} className="cell" />
                      :""
                      }
                  </td>
                  <td>
                     {
                      item.date_performed.substring(8) == sDate+5?
                      <input type="text" id_value={item.id} value={item.time_in_minutes} className="cell" />
                      :""
                      }
                  </td>
                  <td>
                     {
                      item.date_performed.substring(8) == sDate+6?
                      <input type="text" id_value={item.id} value={item.time_in_minutes} className="cell" />
                      :""
                      }
                  </td>
                  {/* <td><input type="text" id_value={item.id} value={item.time_in_minutes} className="cell" /></td>
                  <td><input type="text" id_value={item.id} value={item.time_in_minutes} className="cell" /></td>
                  <td><input type="text" id_value={item.id} value={item.time_in_minutes} className="cell" /></td>
                  <td><input type="text" id_value={item.id} value={item.time_in_minutes} className="cell" /></td>
                  <td><input type="text" id_value={item.id} value={item.time_in_minutes} className="cell" /></td> */}
                  </tr>
                ))
                : console.log("no time entry")
            }

          {rowList.map((singleRow, index) => (
            <tr id={"row_" + index}>
              <td >{index + 1}</td>
              <td id={"proj_"+ (index+1)}>
                <select onChange={taskBind} id={"ddlProj_"+(index+1)}>
                  { 
                    lstWorkspace ?
                    lstWorkspace.map((obj,index) => (
                        <option value={obj.id}>{obj.name}</option>
                      ))
                      : ""
                  }
                </select>
              </td>
              <td id={"task_"+ (index+1)} >
                <select onChange={getTaskId} id={"ddlTask_"+(index+1)}>
                  {
                   
                      story ?
                      ids.map((item) => (
                        <option value={story[item].id}>{story[item].title}</option>
                        // document.getElementById('ddlTask'+(index+1)).append
                        // render(<option value={story[item].id}>{story[item].title}</option>, document.getElementById("ddlTask"+(index+1)));
                      ))
                      //console.log(project[headers[0]].title)
                      : ""
                    
                    
                  }
                </select>
              </td>
              <td><input type="text" className="cell" /></td>
              <td><input type="text" className="cell" /></td>
              <td><input type="text" className="cell" /></td>
              <td><input type="text" className="cell" /></td>
              <td><input type="text" className="cell" /></td>
              <td><input type="text" className="cell" /></td>
              <td><input type="text" className="cell" /></td>
              <td>Del</td>
              <td>Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id='row'></div>
      <button onClick={handleRowAdd}>Click here to add new row</button>

      <button>Exit</button>
    </div>
  );
}

export default Timesheet;

