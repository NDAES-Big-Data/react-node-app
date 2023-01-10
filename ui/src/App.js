import './App.css';
import Query from './components/landing/query';
import React, {useState,useEffect} from 'react';


function App() {  
 
  // Second way of creating state based variables and assign values in them
  const [dataModel,setDataModel] = useState({yearOptions: []})
  
  const fetchYear=async()=>{
    let tempData = []
    await fetch(
      "http://localhost:3002/getYear"
    ).then((response)=>response.json())
    .then((data)=>{
      data.map((x)=>{
        let eachx = {key:x.key, text:x.value,value:x.value}
        tempData.push(eachx)  
      })
      dataModel.yearOptions = tempData
      setDataModel({...dataModel})
    })
  }
 
 
// fetchLoc();
//fetchExp();
  useEffect(() => {
    fetchYear();
   
  }, []);
 


  return (
    <div className="App">
      <header className="App-header">      
          React Based FrontEnd and Nodejs Based Rest API Demo Project
      </header>

      {/* The below code is to send data to props for the second way of using datamodel */}
      <Query props={{dataModel}}/> 
      {/*
      //This below is the code when we pass data between components using the first method of assigning values
      <Query props={{yearOptions, locOptions}}/>
      */ }
    </div>
    
  );
}

export default App;
