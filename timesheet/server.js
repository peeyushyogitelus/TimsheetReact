const express = require('express');
const path = require('path');
const app = express() ,
 bodyParser = require("body-parser"); 
 const request = require('request');
port = 8010;

 var async = require('async'); 
/* APIs path */
// -----------------------::RELeadApis::--------------------------//
/*
L2 Approver: users?with_access_groups={0}&on_my_account=true&per_page=200&page=
Currency: currencies?per_page=200&page=
DashboardCFs: custom_fields.json?include=choices&subject_type=Estimate&per_page=200&page=
ResourceCFs: custom_fields.json?include=choices&subject_type=Resource&per_page=200&page=
Roles: roles?per_page=200&page=
Skills: skills?per_page=200&page=
Organizations: organizations?type=department&per_page=200&page= 
*/

// -----------------------::REApproverApis::--------------------------//
/* 
L2 Approver: users?with_access_groups=2817915&on_my_account=true&per_page=200&page=
DashboardCFs: custom_fields.json?subject_type=Estimate&per_page=200&page= 
ResourceCFs:  custom_fields.json?subject_type=Resource&per_page=200&page= 
/L1-comment
MavenFlow: https://mavenflowapi.azurewebsites.net/api/flow_multiple?context=approver&instance_status=pending
*/



/* base Standard API URL */
const baseurl = "https://api.mavenlink.com/api/v1";
const apiHeaders = {
  'Authorization': 'Bearer '+localStorage.getItem('AccessToken') 
};

/* base Mavenflow API URL */
const baseurl2 = "https://mavenflowapi.azurewebsites.net/api/";
const apiHeaders2 = {
  'Authorization': 'Bearer c42a3cad018d0ab54ed1b370f75d1592b2aca2ca29931fc568dc8bd2a35b610d' 
};
//d1eff0dade70bcf1c358829a2f07f1fa2f091d9ad95f5d2e9d78a5bd58e3a8ee
//c3ba432063c8b2ebe1986de8e5354aaba4202129a8e2bfc39b5617b53771b182
//fe9684bc1a8de6609cce1bd7d201f2c084b68118ccb836722fed03f65aa98557
//84d7f501c710f5cba611b9a1f7ed85ee3ca4161ebc77cf3db1ee3a2717e0c689


app.use(express.static(path.join(__dirname, 'build')));
/* app.get('/ping', function (req, res) {
return res.send('pong');
});  */
app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname, 'build', 'index.html')); 
}); 

/*  app.post('/api/workspaces', (req, res) => {
  const workspace = req.body.workspace;
  console.log('Adding workspace:::::', workspace);
  workspaces.push(user);
  res.json("workspace addedd");
});  */

  
 const apiCall =  function(url) { 
  const configuration = {  url: baseurl + '/' + url,
  headers: apiHeaders,
  json: true}  
 // console.log(configuration.url)
return new Promise((resolve, reject) => {
  request.get(configuration, (err, res, body) => {
    if (err) reject(err)
    resolve(body)
  });
});
}; 


// TODO: Refactor this to build call to API endpoint wanted by the React component
// Currently, it's hard coded to grab workspaces list json :)
 // app.get('/api/:type?per_page=/:per_page&page=/:page', async function(req, res)
  app.get('/api/:type', async function(req, res)
   {      
    const type = req.params.type; 
    const queries = Object.keys(req.query).map(key=>`${key}=${req.query[key]}`).join("&")    
      apiCall(type + '?' + queries)
      .then(response => {              
              res.json(response)           
       
      }).catch(error => {
      res.send(error)
      console.log(error);
    });  
});   


const apiCall2 =  function(url) { 
  const configuration = {  url: baseurl2 + url,
  headers: apiHeaders2,
  json: true}  
 console.log(configuration.url)
return new Promise((resolve, reject) => {
  request.get(configuration, (err, res, body) => {
    if (err) reject(err)
    resolve(body)
  });
});
}; 

  
app.get('/api2/:type', async function(req, res)
   {     
    const type = req.params.type; 
    const queries = Object.keys(req.query).map(key=>`${key}=${req.query[key]}`).join("&")
    apiCall2(type + '?' + queries)
      .then(response => {              
              res.json(response)           
       
      }).catch(error => {
      res.send(error)
      console.log(error);
    });  
});  



app.listen(process.env.PORT || port, ()=>console.log(`Proxy is listening on ${port}`));
