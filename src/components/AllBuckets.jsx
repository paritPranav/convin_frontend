import React from "react";
import Bucketcard from "./Bucketcard";
import CreateBucket from "./CreateBucket";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AllBuckets() {
  const [isselect, setisselect] = useState(false);
  const [managetext, setmanagetext] = useState("MANAGE BUCKETS");
  const [AllBuckets, setAllBuckets] = useState([]);
  const [selectedbuckets, setselectedbuckets] = useState([]);
  const [isitemselected, setisitemselcted] = useState(false);

  const selectbucket = (bucket) => {
    console.log(bucket);
    setselectedbuckets([...selectedbuckets, bucket]);
  };
  const deleteAPI = (bucket) => {
    axios
      .delete("https://backend.convin.paritpranav.me/deleteBucket/" + bucket._id)
      .then((res) => {
        console.log(res);
      });
  };
  const deletBuckets = () => {
    selectedbuckets.map((bucket) => {
      deleteAPI(bucket);
    });
    let temp = AllBuckets;
    selectedbuckets.forEach((element) => {
      temp = temp.filter((e) => {
        return e._id != element._id;
      });
    });
    setAllBuckets(temp);
  };
  const unselectbucket = (bucket) => {
    setselectedbuckets(
      selectedbuckets.filter((e) => {
        return e != bucket;
      })
    );
  };

  useEffect(() => {
    console.log(selectedbuckets);
  }, [selectbucket, unselectbucket]);

  const fetchbuckets = () => {
    axios.get("https://backend.convin.paritpranav.me/allBuckets").then((res) => {
      setAllBuckets(res.data);
    });
  };

  useEffect(() => {
    if (isselect) {
      setmanagetext("X CANCEL");
    } else {
      setmanagetext("MANAGE BUCKETS");
    }
  }, [isselect]);

  const oncmanageclick = () => {
    if (managetext == "MANAGE BUCKETS") {
      setisselect(true);
    } else {
      setisselect(false);
    }
  };
  useEffect(() => {
    fetchbuckets();
  }, []);

  return (
    <div>
      <div className="AllBucketMenu row">
        {!isselect ? (
          <>
            <div className="offset-8 col-2">
              <Link to={"/createBucket"}>
                <button className=" btn btn-primary btn-lg">
                  + ADD BUCKET
                </button>
              </Link>
            </div>
            <div className="col-2">
              <button
                className=" btn btn-primary btn-lg "
                onClick={oncmanageclick}
              >
                {managetext}
              </button>
            </div>
          </>
        ) : (
          <>
            {!selectedbuckets.length? (
              <>
                <div className="offset-8 col-2">
                  <button
                    className=" btn btn-primary btn-lg "
                    onClick={oncmanageclick}
                  >
                    {managetext}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="offset-8 col-2">
                  <button
                    className=" btn btn-primary btn-lg"
                    onClick={deletBuckets}
                  >
                    Delete Bucket
                  </button>
                </div>
                <div className=" col-2">
                  <button
                    className=" btn btn-primary btn-lg "
                    onClick={oncmanageclick}
                  >
                    {managetext}
                  </button>
                </div>
              </>
            )}
          </>
        )}

      </div>
      {
        AllBuckets.length?<><div className="row  ">
        {AllBuckets.map((bucket) => {
          return (
            <div className="col-lg-3 col-md-4 col-sm-6 ">
              <Bucketcard
                select={isselect}
                bucket={bucket}
                selectionbucket={selectbucket}
                unselectbucket={unselectbucket}
              />
            </div>
          );
        })}
      </div></>:<><img src={require('./bucket.png')}  style={{width:"10%",marginTop:"10%"}} class="card-img-top" alt="..."/>
      <h1>NO BUCKETS</h1></>
      }
      
    </div>
  );
}
