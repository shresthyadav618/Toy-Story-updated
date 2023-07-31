import React, { useEffect, useState } from "react";
import logo from "./assets/movielogo.jpeg";

import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { Link, Route, Routes } from "react-router-dom";
import Child from "./Child";
import a2f from "./assets/a2f.jpeg";
import action from "./assets/action.png";
import advent from "./assets/advent.png";
import animation from "./assets/animation.png";
import comedy from "./assets/comedy.png";
import crime from "./assets/crime.png";
import documentary from "./assets/documentary.png";
import drama from "./assets/drama.png";
import family from "./assets/family.png";
import fiction from "./assets/fiction.png";
import horror from "./assets/horror.png";
import Favss from "./favss";
import firestore from "./firestore";
import "./index.css";
import Links from "./links";
export default function useSider() {
  const colref=collection(firestore,'movies')

const [gci,gcc]=useState(false)  // gcc -> grand child change , gci -> grand child initial

function maingcc(){
  gcc((prev)=>{
    return !prev
  })
  // console.log("lund lele")
}

  const [urlUsed, ChangeUrl] = React.useState();
  const [favs,changefav]=useState([])
useEffect(()=>{
let arr=[];
getDocs(colref).then((snap)=>{
  snap.docs.forEach((doc)=>{
arr.push({movieid:doc.data().movieid, docid: doc.id });    
// console.log(doc.data())
  })
})
changefav(arr);
},[gci])

onSnapshot(colref,((snap)=>{
  let arr=[];
  snap.docs.forEach((doc)=>{
    arr.push(<div>{doc.data().moviedata}</div>)
  });
  // changefav(arr)
}))


// ho kya rha hai yhpar -> add2fav kra fir vo kya krega hmari firebase docs mai add kreaga data , par uske changes dejhne k liye 
// onSnapshot use hoga , aur agr onsnapshot mai state change kre to infinite loop bn jayga 


  console.log(Links);
  console.log(urlUsed);
  console.log(Links.toprated);

const [fav,tgl]=useState(false);



  return (
    <>
      <div className="flex">
        <div className="sider cursor-pointer">



          <div className="w-fit block m-auto">
            <img src={logo} alt="not found" width={"100px"}></img>
          </div>
<div className="br"></div>
          <div className="flex justify-center items-center text-lg" onClick={()=>{tgl((prev)=>!prev)}}>
          <Link to="/fav"><p>Your favourites</p></Link>
            <img src={a2f} width="20px" className="ml-2"></img>
          </div>

          <div className="br"></div>
          <div className="spec">Categories</div>
          <div className="allelm">
            <div
              className="myanchor"
              onClick={() => {
                ChangeUrl({ url: Links.popular, check: true });
              }}
            >
              <div className="df">
                <div className="mimg">
                  <i class="fa-solid fa-fire fa-xl"></i>
                </div>
                <li> Popular</li>
              </div>
            </div>
            <div
              className="myanchor"
              onClick={() => {
                ChangeUrl({ url: Links.toprated, check: true });
              }}
            >
              <div className="df">
                <div className="mimg">
                  <i class="fa-regular fa-star fa-xl"></i>
                </div>
                <li> Top Rated</li>
              </div>
            </div>
            <div
              href=""
              className="myanchor"
              onClick={() => {
                ChangeUrl({ url: Links.upcoming, check: true });
              }}
            >
              <div className="df">
                <div className="mimg">
                  <i class="fa-solid fa-bolt fa-xl"></i>
                </div>
                <li> Upcoming</li>
              </div>
            </div>

            <div className="br"></div>
          </div>
          <div className="spec">Genres</div>
          <div className="flex flex-col">
            <div
              className="myanchor"
              onClick={() => {
                ChangeUrl({ url: Links.action, check: false });
              }}
            >
              <div className="df">
                <div className="mimg">
                  <img src={action} alt="notfound" width="30px"></img>
                </div>
                Action
              </div>
            </div>
            <div
              className="myanchor"
              onClick={() => {
                ChangeUrl({ url: Links.popular, check: true });
              }}
            >
              <div className="df">
                <div className="mimg">
                  <img src={advent} alt="notfound" width="30px"></img>
                </div>
                Adventure
              </div>
            </div>
            <div
              className="myanchor"
              onClick={() => {
                ChangeUrl({ url: Links.trending, check: false });
              }}
            >
              <div className="df">
                <div className="mimg">
                  <img src={animation} alt="notfound" width="30px"></img>
                </div>
                Animation
              </div>
            </div>
            <div
              className="myanchor"
              onClick={() => {
                ChangeUrl({ url: Links.comedy, check: false });
              }}
            >
              <div className="df">
                <div className="mimg">
                  <img src={comedy} alt="notfound" width="30px"></img>
                </div>
                Comedy
              </div>
            </div>
            <div
              className="myanchor"
              onClick={() => {
                ChangeUrl({ url: Links.crime, check: true });
              }}
            >
              <div className="df">
                <div className="mimg">
                  <img src={crime} alt="notfound" width="30px"></img>
                </div>
                Crime
              </div>
            </div>
            <div
              className="myanchor"
              onClick={() => {
                ChangeUrl({ url: Links.documentaries, check: false });
              }}
            >
              <div className="df">
                <div className="mimg">
                  <img src={documentary} alt="notfound" width="30px"></img>
                </div>
                Documentary
              </div>
            </div>
            <div
              className="myanchor"
              onClick={() => {
                ChangeUrl({ url: Links.comedy, check: false });
              }}
            >
              <div className="df">
                <div className="mimg">
                  <img src={drama} alt="notfound" width="30px"></img>
                </div>
                Drama
              </div>
            </div>
            <div
              className="myanchor"
              onClick={() => {
                ChangeUrl({ url: Links.trending, check: false });
              }}
            >
              <div className="df">
                <div className="mimg">
                  <img src={family} alt="notfound" width="30px"></img>
                </div>
                Family
              </div>
            </div>
            <div
              className="myanchor"
              onClick={() => {
                ChangeUrl({ url: Links.horror, check: false });
              }}
            >
              <div className="df">
                <div className="mimg">
                  <img src={horror} alt="notfound" width="30px"></img>
                </div>
                Horror
              </div>
            </div>
            <div
              className="myanchor"
              onClick={() => ChangeUrl({ url: Links.fiction, check: true })}
            >
              <div className="df">
                <div className="mimg">
                  <img src={fiction} alt="notfound" width="30px"></img>
                </div>
                Ficton
              </div>
            </div>
          </div>
          {/* //   trending action documentaries comedy horror */}
        </div>

        <div className="bgc"></div>
        <div>
        <Routes>
  <Route path="/fav" element={<Favss fav={favs} Gcc={maingcc}/>}>
 
  </Route>
</Routes>
    <br></br>
   <div className="wl"></div>
          <Child
            GetUrl={urlUsed === undefined ? Links.popular : urlUsed.url}
            Check={urlUsed === undefined ? true : urlUsed.check}
            Gcc={maingcc}
          />
        </div>


      </div>
    </>
  );
}
