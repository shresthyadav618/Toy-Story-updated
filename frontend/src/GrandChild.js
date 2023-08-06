
import React, { useState } from "react"
import { Link } from "react-router-dom"
import ParPota from "./ParPota"
import Star from "./Star"
import Def from "./assets/default.png"
// import firestore from "./firestore"
import "./index.css"

export default function useGranchild(props){



    const [open,changeopen]=useState(false);
    console.log(open)
// function handleChange(){
//     changeopen((prev)=>!prev)
// }
const handleChange=()=>{
    changeopen(!open)
}

// const colref=collection(firestore, 'movies');

// function handleaddfav(e){
//   console.log(e.target.id)
// addDoc(colref, {
//   movieid: e.target.id
// })

// props.Gcc()
// }

const string = props.path_diff && true ? '/movies/' : '/movie/';
console.log(props.imgUrl);
const ImageURL = props.imgUrl? `https://www.themoviedb.org/t/p/w440_and_h660_face` +
props.imgUrl : Def;
 return (<>
 <Link to={`${string}`+props.MovieId}>
 <div >
    <div className="con flex flex-col " >
            <div className=""><img
              src={
               ImageURL
              } width="200px" 
            ></img>
           
            </div>
        
          </div>
          <div className="block m-auto w-56 ninty">
            <h1 className="block m-auto w-fit text-center">{props.MovieTitle}</h1>
              
            </div>
  
            <Star rating={ props.MovieRating} rank={props.MovieId} />
    
        
        {/* </div> */}
        </div>
        {/* <div className="parpota"> */}
        <div className=" top add2f flex">
            {/* <img src={a2f} width="20px" className=" cursor-pointer " onClick={handleaddfav} id={props.MovieId}></img> */}
            {/* <p className="ml-4">Add to favourites</p> */}
            </div>
            </Link>
        {open && <ParPota ImgUrl={props.imgUrl} MovieDate={props.MovieDate} MovieDesc={props.MovieDesc} MovieTitle={props.MovieTitle} MovieRating={props.MovieRating} doChange={handleChange} Adult={props.Adult} Lang={props.Lang} MovieId={props.MovieId}/>}
        {/* </div> */}
        </>
 )
}

