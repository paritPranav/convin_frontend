import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Bucketcard(props) {
  const [ischecked,setchecked]=useState(false);
  const [checkvalue,setcheckvalue]=useState("unchecked");  
  const oncheckhandle=(e)=>{
    if(checkvalue=="unchecked"){
        setcheckvalue("checked");
        setchecked(true);
    }else{
        setcheckvalue("unchecked");
        setchecked(false);
    }
  }
  useEffect(()=>{   
    if(ischecked){
        props.selectionbucket(props.bucket);
    }else{
        props.unselectbucket(props.bucket);
    }    
  },[checkvalue]);

  return (
    <div>
        <div class="card">
        <Link style={{Decoration:"none"}} to={"/"+props.bucket.bucket_Name+"/cards"}><img src={require('./bucket.png')}  style={{width:"50%"}} class="card-img-top" alt="..."/>
        </Link>
  <div class="card-body">
  {
        props.select?    <input type="checkbox" style={{width:"30px",height:"30px"}} onChange={(e)=>oncheckhandle(e)} value={checkvalue} ></input>:<></>
    }
    <h5 class="card-title">{props.bucket. bucket_Name}</h5>
    
    
  </div>
</div>
    </div>
  )
}
