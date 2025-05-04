
import './App.css';
import React,{useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  //create
  const[patientName,setPatientName]=useState('');
  const[mobile,setMobile]=useState(0);
  const[location,setLocation]=useState('');

  //read
  const[patientData,setPatientData]=useState([]);

  //edit
  const[newName,setNewName]=useState('');



  useEffect(()=>{
    Axios.get('http://localhost:8081/read').then((response)=>{
     setPatientData(response.data);
    })
  },[])

  const MyData=()=>{
    Axios.post('http://localhost:8081/insert',
      {
        patientName:patientName,
        mobile:mobile,
        location:location
      }
    );
    
  };

//update
const updateName= (id) =>{
  Axios.put('http://localhost:8081/update',{
    id:id,
    newName:newName
  });
};

  return (
    <div className="App">
      <h1>Apollo Hosiptal - Chennai</h1>
      <img src="https://w0.peakpx.com/wallpaper/315/432/HD-wallpaper-medical-hospital.jpg"></img>
      <marquee>Apollo Hosiptal - 24*7 Emergency are available</marquee>
    <hr/>
    <h1>Register here for Appointment</h1>
    <input type="text" placeholder="Enter patient name"
    onChange={(event) =>{setPatientName(event.target.value);}} />
    <br></br><br></br>
    <input type="number" placeholder="Enter patient mobile number"
     onChange={(event) =>{setMobile(event.target.value);}}/>
    <br></br><br></br>
    <input type="text" placeholder="Enter patient location"
     onChange={(event) =>{setLocation(event.target.value);}}/>
    <br></br><br></br>
    <button className='btn' onClick={MyData}>Register</button>

    <hr/>

    <h1>List of Patients</h1>

    <table>
      <tr>
        <th>PatientName</th>
        <th>Mobile</th>
        <th>Location</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      {patientData.map((val,key)=>{
            return  <tr>
    
           <td>
             <h3>{val.patientName}</h3> </td>
           <td>  <h3>{val.mobile}</h3></td>
           <td> <h3>{val.location}</h3>
            </td>  


            <td>
              <input type='text' placeholder='Enter new name'
              onChange={(event)=>{
                setNewName(event.target.value)
              }}/>
              <button onClick={()=> updateName(val._id)}>Update</button>
              </td>


            <td><button>Delete</button></td>
            </tr>

          })}
      
    
    </table>


    </div>
  );
}

export default App;
