import React, { useEffect, useState } from 'react'
import {IoMdArrowDropdown} from 'react-icons/io'
import { useParams,useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';

export default function CreateCard() {
  const [cardname,setcardName]=useState("");
  const [link,setlink]=useState("")
  const [bucketname,setbucketname]=useState("");
  const {bucket}=useParams();

  const navigate=useNavigate();
  
  const createcard=async()=>{
    console.log("criating card")
    
   await axios.post("https://backend.convin.paritpranav.me/createCard",{
     
      name:cardname,
      link:link,
      bucketname:bucket
     
    }).then((res)=>{
        console.group(res);
    })



  }

 
  return (
    <div>
        
<div>
  <div class="card-form-wrapper d-flex justify-content-center">
    <form action="#" class="card-form">
      <h3 class="title" style={{fontSize:"2.5rem"}}>Create Card</h3>
   
      <div>
        <input type="text" style={{height:"70px",marginTop:"30px"}} onChange={(e)=>{setcardName(e.target.value)}} value={cardname} class="form-control rounded border-white mb-3 form-input" id="name" placeholder="Name" required/>
      </div>
      <div>
        <input type="text" style={{height:"70px"}} class="form-control rounded border-white mb-3 form-input" onChange={(e)=>{setlink(e.target.value)}} value={link} placeholder="Media Link" required/>
      </div>
     
      <div class="submit-button-wrapper">
      <Link to={"/"+bucket+"/cards"}> <button onClick={createcard} >Create card</button></Link>
      </div>
    </form>
  </div>
</div>
    </div>
  )
}
