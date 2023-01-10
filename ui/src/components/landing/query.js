
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './query.css'
import { useState } from 'react'

function Query({props}) {
  const [locOptions,setLocOptions] = useState([])
  const [expOptions,setExpOptions] = useState([])
  const [selectedValues, setSelectedValues] = useState(null)

  

 /*const fetchExp=async()=>{
    let tempData = []
    await fetch(
      "http://localhost:3002/getExpt"
    ).then((response)=>response.json())
    .then((data)=>{
          data.map((x)=>{
          let eachx = {key:x.key, text:x.value,value:x.value}
          tempData.push(eachx)          
          
        })
        dataModel.expOptions = tempData
        setDataModel({...dataModel})
      })
  }*/
  const select = (name,value)=>{   
    //let selectedValues = []
    if (value.name==='year' ){           
      setSelectedValues(value.value)
      //fetchLoc()
    }
    else if(value.name === 'location'){
      console.log('Fetch Location API')
    } 
    
  }

  /* The below function fetches location data using POST query to post parameters
  via message body */
  const getLocData=async()=>{

    console.log(JSON.stringify(selectedValues))
    await fetch('http://localhost:3002/getLoc',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(selectedValues)
      
    }).then(response=>response.json())
    .then((data)=>{
      console.log('Location Data Fetched ',data)
      setLocOptions(
        data.map((x)=>{
          return {key:x.key, text:x.value,value:x.value}         
         })
      )
    })
    
  }  
  return (
    <div>
      <div className='query'>
          <Dropdown
            className='year'
            name='year'
            placeholder="Select Year"
            fluid multiple selection           
            options={props.dataModel.yearOptions}
            onClose={getLocData}
            onChange = {select}
          />
          <Dropdown
          className='loc'
            name='location'
            placeholder="Select Locations"
            fluid multiple selection
            options={locOptions}/>

          {/*<Dropdown
          className='exp'
          name='experiments'
            placeholder="Select Experiments"
            fluid multiple selection
            options={props.dataModel.expOptions}/>*/}
  </div>      
    </div>
  );
}

export default Query;
