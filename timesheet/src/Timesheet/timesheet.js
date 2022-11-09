import React, { useEffect, useState } from 'react';
import Axios from "axios";
import ReactDOM from 'react-dom/client';
import './timesheet.css';
import Thead from './thead';
import TimeEntries from './time_entries'

const Timesheet = () => {
  const [rowList, setNewRow] = useState([
    { row: "" },
  ]);
  const handleRowAdd = () => {
    setNewRow([...rowList, { row: "" }])
  }
  var ob = "task_";

  const [project, setProject] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [story, setStories] = useState();
  const [ids, setStoryIds] = useState();
  const [timeEntry, setTimeEntry] = useState([]);
  const [allTimeEntries, timeEntryHandler] = useState([]);

  const [selected, setSelected] = useState("");
  const [taskId, setTaskId] = useState("");
  const [curDdlId, setcurDdlId] = useState("");

   function setDdlIds(){
    setcurDdlId()
   }


  if (project.length == 0) {
    console.log('Object is empty');
  }


  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  var userId = "13190435";
  const url = proxyurl + "https://api.mavenlink.com/api/v1/workspaces?has_participant=" + userId;
  // let tmpArray=[];
  const requestBody = {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ff4e7ca990b9ee08e9f8d05ed7e66e55d0545843a194c1d065fcdfd631d26e9a',
      'Content-Type': 'application/json'
    }
  };
  fetch(url, requestBody).then((response) => response.json().then((result) => {
    setProject(result.workspaces)
    setHeaders(Object.keys(result.workspaces))
  }))
  var bool= "false";
  const url3 = proxyurl + "https://api.mavenlink.com/api/v1/time_entries?user_id=" + userId + "&date_performed_between=2022-10-16:2022-10-22&active_submission_id="+bool;
  // let tmpArray=[];& ..&workspace_id=" + { selected } + "&story_id=..&workspace_id=42589468
  const requestBody3 = {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ff4e7ca990b9ee08e9f8d05ed7e66e55d0545843a194c1d065fcdfd631d26e9a',
      'Content-Type': 'application/json'
    }
  };
  fetch(url3, requestBody).then((response) => response.json().then((result) => {
    setTimeEntry(result.time_entries)
    timeEntryHandler(Object.keys(result.time_entries))
  }))

  // fetch(url,requestBody).then((response)=>response.json().then((result)=>{console.log(result);}))
  //Axios.get("https://cors-anywhere.herokuapp.com/https://api.mavenlink.com/api/v1/workspaces").then((res) => {console.log(res.data);});

  const taskBind = (event) => {
    setSelected(event.target.value);
    var workspace_id = event.target.value;
    // setSelected(workspace_id)
    console.log({ selected });
    console.log(workspace_id);
    const url2 = "https://cors-anywhere.herokuapp.com/" + "https://api.mavenlink.com/api/v1/stories?workspace_id=" + workspace_id;
    const requestBody2 = {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ff4e7ca990b9ee08e9f8d05ed7e66e55d0545843a194c1d065fcdfd631d26e9a',
        'Content-Type': 'application/json'
      }
    };
    fetch(url2, requestBody2).then((response) => response.json().then((result) => {
      setStories(result.stories)
      setStoryIds(Object.keys(result.stories))

      
      
    }))

    // fetch(url,requestBody).then((response)=>response.json().then((result)=>{console.log(result);}))
    //Axios.get("https://cors-anywhere.herokuapp.com/https://api.mavenlink.com/api/v1/workspaces").then((res) => {console.log(res.data);});
  }

  const getTaskId = (event) => {
    setTaskId(event.target.value)
    console.log({ taskId })
    console.log(event.target.value)
  }

  const startDate="2022-10-16"
  const strdate = startDate.substring(8);
  const sDate = parseInt(strdate);

  return (
    <div>
      <h2>Start Date:2022-10-16</h2>
      <h2>End Date:2022-10-22</h2>
      <table className='table table-striped table-bordered' >
        <Thead startDate="2022-10-16" />
        <tbody >
            {
              timeEntry ?
                // console.log(timeEntry)
                allTimeEntries.map((item, index) => (
                  <tr>
                  <td></td>
                  <td value={timeEntry[item].id} >{timeEntry[item].workspace_id}</td>
                  <td value={timeEntry[item].id} >{timeEntry[item].story_id}</td>
                  <td>
                     {
                      timeEntry[item].date_performed.substring(8) == sDate?
                      <input type="text" id_value={timeEntry[item].id} value={timeEntry[item].time_in_minutes} className="cell" />
                      // console.log( timeEntry[item].date_performed.substring(8)+"sdate is"+sDate)
                      :console.log("")
                      }
                  </td>
                  <td>
                     {
                      timeEntry[item].date_performed.substring(8) == sDate+1?
                      <input type="text" id_value={timeEntry[item].id} value={timeEntry[item].time_in_minutes} className="cell" />
                      // console.log( timeEntry[item].date_performed.substring(8)+"sdate is"+sDate)
                      :console.log("")
                      }
                  </td>
                  <td>
                     {
                      timeEntry[item].date_performed.substring(8) == sDate+2?
                      <input type="text" id_value={timeEntry[item].id} value={timeEntry[item].time_in_minutes} className="cell" />
                      :console.log("")
                      }
                  </td>
                  <td>
                     {
                      timeEntry[item].date_performed.substring(8) == sDate+3?
                      <input type="text" id_value={timeEntry[item].id} value={timeEntry[item].time_in_minutes} className="cell" />
                      :console.log("")
                      }
                  </td>
                  <td>
                     {
                      timeEntry[item].date_performed.substring(8) == sDate+4?
                      <input type="text" id_value={timeEntry[item].id} value={timeEntry[item].time_in_minutes} className="cell" />
                      :console.log("")
                      }
                  </td>
                  <td>
                     {
                      timeEntry[item].date_performed.substring(8) == sDate+5?
                      <input type="text" id_value={timeEntry[item].id} value={timeEntry[item].time_in_minutes} className="cell" />
                      :console.log("")
                      }
                  </td>
                  <td>
                     {
                      timeEntry[item].date_performed.substring(8) == sDate+6?
                      <input type="text" id_value={timeEntry[item].id} value={timeEntry[item].time_in_minutes} className="cell" />
                      :console.log("")
                      }
                  </td>
                  {/* <td><input type="text" id_value={timeEntry[item].id} value={timeEntry[item].time_in_minutes} className="cell" /></td>
                  <td><input type="text" id_value={timeEntry[item].id} value={timeEntry[item].time_in_minutes} className="cell" /></td>
                  <td><input type="text" id_value={timeEntry[item].id} value={timeEntry[item].time_in_minutes} className="cell" /></td>
                  <td><input type="text" id_value={timeEntry[item].id} value={timeEntry[item].time_in_minutes} className="cell" /></td>
                  <td><input type="text" id_value={timeEntry[item].id} value={timeEntry[item].time_in_minutes} className="cell" /></td> */}
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
                    project ?
                      headers.map((item) => (
                        <option value={project[item].id}>{project[item].title}</option>
                      ))
                      // console.log(project[headers[0]].title)
                      : ""
                  }
                </select>
              </td>
              <td id={"task_"+ (index+1)} >
                <select onChange={getTaskId} id={"ddlTask_"+(index+1)} onSetId={setcurDdlId("ddlTask"+(index+1))}>
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

export { Timesheet };
