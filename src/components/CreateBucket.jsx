import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import {IoMdArrowBack} from 'react-icons/io';


export default function CreateBucket() {
  const [bucketname,setbucketname]=useState();
  const navigate=useNavigate();
  const moveback=()=>{
    navigate(-1);
  }
  const oncreateBucket=()=>{
  

      axios.post("https://backend.convin.paritpranav.me/createBucket",{
        bucketname:bucketname
      }).then((res)=>{
        
        console.log(res);
      })
  }
  return (
    <div>
        <IoMdArrowBack onClick={moveback} className="backbutton" style={{position:"absolute",top:"100",left:"100"}}/>
       <div>

        <div>
          <div class="bucket-form-wrapper d-flex justify-content-center">
            <form action="#" class="bucket-form">
              <h3 class="title" style={{fontSize:"2.5rem"}}>Create Bucket</h3>
           
              <div>
                <input type="text" style={{height:"70px",marginTop:"30px"}} class="form-control rounded border-white mb-3 form-input" id="name" placeholder="Bucket Name" value={bucketname} onChange={(e)=>{setbucketname(e.target.value)}} required/>
              </div>
             
              <div class="submit-button-wrapper">
                  <Link to={"/"}><button onClick={oncreateBucket} >Create Bucket</button></Link>
              </div>
            </form>
          </div>
        </div>
            </div>
    </div>
  )
}
