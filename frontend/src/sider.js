import React, { useEffect, useState } from "react";
import { Routes, useNavigate, useParams } from "react-router-dom";
import Child from "./Child";
import logo from "./assets/movielogo.jpeg";
// import firestore from "./firestore";
import "./index.css";
import Links from "./links";
import Navbar from "./navbar/navbar";
export default function useSider(props) {
  const API_KEY = '?api_key=6973771bf60a7b1add0cc2ef3779046c';

const [gci,gcc]=useState(false)  // gcc -> grand child change , gci -> grand child initial
const [genres, getGenres] = useState(null);
const[sidebarRefresh,changeSidebarRefresh] = useState(false);
const [urlUsed, ChangeUrl] = React.useState(null);
if(urlUsed)
console.log(urlUsed.url);
const [allow,changeAllow] = useState(false);
const Navigate = useNavigate();
const {id} = useParams();
console.log(id)
useEffect(()=>{
  if(id){
    if(id==69){
      ChangeUrl({ url: Links.popular, check: true });
    }else if(id==6969){
      ChangeUrl({ url: Links.toprated, check: true });
    }else if(id==696969){
      ChangeUrl({ url: Links.upcoming, check: true });
    }else{
    ChangeUrl({ url: `https://api.themoviedb.org/3/discover/movie${API_KEY}&with_genres=${id}`, check: false });
    }
  }
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  fetch(`https://api.themoviedb.org/3/genre/movie/list${API_KEY}`, options)
    .then(response => response.json())
    .then(response => getGenres(response.genres))
    .catch(err => console.error(err));

},[]);
console.log('got the genres' , genres)
function maingcc(){
  gcc((prev)=>{
    return !prev
  })
  // console.log("lund lele")
}


 




// ho kya rha hai yhpar -> add2fav kra fir vo kya krega hmari firebase docs mai add kreaga data , par uske changes dejhne k liye 
// onSnapshot use hoga , aur agr onsnapshot mai state change kre to infinite loop bn jayga 


  // console.log(Links);
  console.log(urlUsed);
  // console.log(Links.toprated);

const [fav,tgl]=useState(false);

const [query,setQuery] = useState(null);
useEffect(()=>{
if(query){
  ChangeUrl({url:`https://api.themoviedb.org/3/search/movie${API_KEY}&query=${query}`})
}
},[query])
  return (
    <>
    <Navbar setQuery={setQuery}/>
    {/* <div className="miracle"></div> */}
      <div className="flex">
        {/* write the code of the sidebar first */}
        <div className="flex">
      
        <div className="sider cursor-pointer sider__extra">



          <div className="w-fit block m-auto">
            <img src={logo} alt="not found" width={"100px"}></img>
          </div>
<div className="br"></div>
          {/* <div className="flex justify-center items-center text-lg" onClick={()=>{tgl((prev)=>!prev)}}>
          <Link to="/fav"><p>Your favourites</p></Link>
            <img src={a2f} width="20px" className="ml-2"></img>
          </div> */}

          <div className="br"></div>
          <div className="spec">Categories</div>
          
          <div className="allelm">

          <div
              className="myanchor"
              onClick={() => {
                ChangeUrl({ url: Links.popular, check: true });
                if(props.filter){
                  Navigate('/69');
                  changeAllow(true)
                }
                
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
                if(props.filter){
                  Navigate('/6969');
                  changeAllow(true)
                }
               
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
                if(props.filter){
                  Navigate('/696969');
                  changeAllow(true)
                }
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
         
          <div className="spec">Genres</div>

            {genres && genres.map((elm)=>{
              // console.log(`./assets/${elm.id}.png`);
              const pathImage = require(`./assets/${elm.id}.png`);
              // console.log(pathImage);
              return(
                
                <div
                className="myanchor"
                onClick={() => {
                  ChangeUrl({ url: `https://api.themoviedb.org/3/discover/movie${API_KEY}&with_genres=${elm.id}`, check: false });
                 
                  if(props.filter){
                    Navigate(`/${elm.id}`);
                    // ChangeUrl({ url: `https://api.themoviedb.org/3/discover/movie${API_KEY}&with_genres=${elm.id}`, check: false });
                    changeAllow(true)
                  }
                }}
              >
                <div className="df">
                  <div className="mimg">
                    <img src={pathImage} alt="notfound" width="30px"></img>
                  </div>
                  {elm.name}
                </div>
              </div>
              )


              
            })}
          </div>
          {/* //   trending action documentaries comedy horror */}
        </div>
        <div className="bgc"></div>
        <div className="newbgc"></div>
      


      </div>

      {props.filter===undefined || props.filter && allow? <div>
        {console.log(urlUsed)}
  <Routes>
{/* <Route path="/fav" element={<Favss fav={favs} Gcc={maingcc}/>}>

</Route> */}
</Routes>
<br></br>
<div className="wl"></div>
    <Child
      GetUrl={urlUsed === null ? Links.popular : urlUsed.url}
      Check={urlUsed === null ? true : urlUsed.check}
     
    />
  </div> : ''}

      </div> 
      {/* div end */}
      
    </>
  );
}







{/* <div className="allelm">
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
          </div> */}