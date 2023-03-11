import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {IoMdArrowBack} from 'react-icons/io';

export default function AllCards() {
  const [isselect, setisselect] = useState(false);
  const [managetext, setmanagetext] = useState("MANAGE CARDS");
  const [selecteditems, setselectedItems] = useState([]);
  const [cards, setcards] = useState([]);
  const [selectedCards, setselectedCards] = useState([]);
  const [AllBuckets, setAllBuckets] = useState([]);
  const [movebucket, setmovebucket] = useState("");
  const { bucket } = useParams();
  const navigate = useNavigate();
  let temp = [];

    const onbackClick=()=>{
        navigate(-1)
    }
  const move = (card, bucketname) => {
    console.log(bucketname);
    axios.patch("https://backend.convin.paritpranav.me/moveToOtherBucket", {
      id: card._id,
      bucketname: bucketname,
    });
  };

  const movetobucket = (bucketname) => {
    selectedCards.map((card) => {
      move(card, bucketname);
    });
    temp = cards;
    selectedCards.forEach((element) => {
      temp = temp.filter((e) => {
        return e._id != element._id;
      });
    });
    setcards(temp);
  };

  const fetchbuckets = () => {
    axios.get("https://backend.convin.paritpranav.me/allBuckets").then((res) => {
      setAllBuckets(res.data);
    });
  };

  const deletecardAPI = (card_id) => {
    // console.log(cards);
    axios.delete("https://backend.convin.paritpranav.me/Deletecard/" + card_id).then((res) => {
      console.log(res);
    });
  };
  const deleteonlocal = (selected) => {
    temp = cards;
    selected.forEach((element) => {
      temp = temp.filter((e) => {
        return e._id != element._id;
      });
    });
    setcards(temp);
  };

  const deleteCards = () => {
    console.log(selectedCards);

    selectedCards.map((card) => {
      console.log(card);
      deletecardAPI(card._id);
    });
    deleteonlocal(selectedCards);
  };

  const selectcard = (card) => {
    // console.log(card);
    setselectedCards([...selectedCards, card]);
  };
  const unselectcard = (card) => {
    setselectedCards(
      selectedCards.filter((e) => {
        return e != card;
      })
    );
  };
  // useEffect(()=>{
  //     console.log(selectedCards);
  // },[selectedCards]);

  const fetchcards = () => {
    axios.get("https://backend.convin.paritpranav.me/" + bucket + "/cards").then((res) => {
      setcards(res.data);
    });
  };

  const onSelect = () => {};
  useEffect(() => {
    if (isselect) {
      setmanagetext("X CANCEL");
    } else {
      setmanagetext("MANAGE CARDS");
    }
  }, [isselect]);

  const oncmanageclick = () => {
    if (managetext == "MANAGE CARDS") {
      setisselect(true);
    } else {
      setisselect(false);
    }
  };

  useEffect(() => {
    fetchcards();
    fetchbuckets();
  }, []);
  return (
    <div>
    

      <div className="AllCardsMenu row">
       
        {!isselect ? (
          <>
            <div className="col-3"><IoMdArrowBack className="backbutton" onClick={onbackClick} style={{color:"black"}}/> <span style={{fontSize:"2rem"}}>{bucket}</span></div>
            <div className="offset-5 col-2">
              <Link to={"/" + bucket + "/createCard"}>
                <button className=" btn btn-primary ">+ ADD CARD</button>
              </Link>
            </div>
            <div className="col-2">
              <button className=" btn btn-primary  " onClick={oncmanageclick}>
                {managetext}
              </button>
            </div>
          </>
        ) : (
          <>
            {!selectedCards.length ? (
              <>
                <div className=" offset-8 col-2">
                  <button
                    className=" btn btn-primary  "
                    onClick={oncmanageclick}
                  >
                    {managetext}
                  </button>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="offset-5 col-2">
                  <button className=" btn btn-primary " onClick={deleteCards}>
                    Delete Cards
                  </button>
                </div>
                <div className="col-2">
                  <div class="dropdown">
                    <button
                      class="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Move Cards To
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {AllBuckets.filter((bucketname) => {
                        return bucketname.bucket_Name != bucket;
                      }).map((bucket) => {
                        return (
                          <li>
                            <a
                              class="dropdown-item"
                              onClick={(e) => movetobucket(bucket.bucket_Name)}
                              href="#"
                            >
                              {bucket.bucket_Name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="col-2">
                  <button
                    className=" btn btn-primary  "
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
      <div className="row  ">
        {cards.map((card) => {
          return (
            <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6 ">
              <SingleCard
                select={isselect}
                card={card}
                selection={selectcard}
                unselectcard={unselectcard}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
