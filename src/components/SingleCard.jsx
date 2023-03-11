import React, { useEffect } from 'react'
import { useState } from 'react';
import Popup from 'reactjs-popup';
import {AiFillCloseCircle} from'react-icons/ai'

export default function SingleCard(props) {
  const [ischecked,setchecked]=useState(false);
  const [checkvalue,setcheckvalue]=useState("unchecked");  

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

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
        props.selection(props.card);
    }else{
        props.unselectcard(props.card);
    }    


  },[checkvalue]);
  var video_id = props.card.ContentLink.split('v=')[1];
var ampersandPosition = video_id.indexOf('&');
if(ampersandPosition != -1) {
  video_id = video_id.substring(0, ampersandPosition);
}


const openmodal=()=>{
  setOpen(true);
}

  return (
    <div>
       <Popup className='popo' open={open} closeOnDocumentClick onClose={closeModal}>
       <a className="close" onClick={closeModal}>
<AiFillCloseCircle/> 
          </a>
          <iframe width="560" height="315" src={"https://www.youtube.com/embed/"+video_id+"?start=1"} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>      </Popup>
    <div class="card">
    <img src={require('./card.png')}  style={{width:"40%",marginLeft:"30%"}} class="card-img-top" alt="..."/>

<div class="card-body">
    {
        props.select?    <input type="checkbox" style={{width:"30px",height:"30px"}} onChange={(e)=>oncheckhandle(e)} value={checkvalue} ></input>:<></>
    }
<h5 class="card-title">{props.card.Name}</h5>
<button  className='btn btn-success' onClick={openmodal}>Open Media</button>


</div>
</div>
</div>
  )
}
