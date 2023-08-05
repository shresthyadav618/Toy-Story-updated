
import React, { useEffect, useState } from "react"
import ParPota from "./ParPota"
import Star from "./Star"
import a2f from "./assets/a2f.jpeg"
// import firestore from "./firestore"
import "./index.css"

export default function useGranchild(props){
    const api_key='6973771bf60a7b1add0cc2ef3779046c';
    let img,title,rating,date,desc,adult,lang;
    const [xx,changexx]=useState([])

    useEffect(()=>{

        fetch(`https://api.themoviedb.org/3/movie/${props.MovieId}?api_key=${api_key}`).then((res)=>res.json()).
        then((data)=>{
            console.log("1")
       
        console.log(data)
        changexx((prev)=>{
return  {
    adult:data.adult,
    img:data.poster_path,
    title:data.original_title,
    lang:data.original_language,
    date:data.release_date,
    rating:data.vote_average/2,
    desc:data.overview
}
           
        })
        })
    },[])
   

console.log("2")

    const [open,changeopen]=useState(false);
    console.log(open)

const handleChange=()=>{
    changeopen(!open)
}

// const colref=collection(firestore, 'movies');

// function handlermvfav(e){
//   console.log(e.target.id)
 
//  const colref = collection (firestore, 'movies')

// const dcid=`'${props.docid}'`
// const docref= doc(colref, 'movies' , dcid)
// deleteDoc(docref)

// props.Gcc()
// }


 return (<>
 <div >
    <div className="con flex flex-col " onClick={handleChange}>
            <div className=""><img
              src={
                `https://www.themoviedb.org/t/p/w440_and_h660_face` +
                xx.img
              } width="200px" 
            ></img>
           
            </div>
        
          </div>
          <div className="block m-auto w-56">
            <h1 className="block m-auto w-fit text-center">{xx.title}</h1>
              
            </div>
  
            <Star rating={xx.rating} rank={props.MovieId} />
    
        
        {/* </div> */}
        <div className=" top add2f flex">
            <img src={a2f} width="20px" className=" cursor-pointer " onClick={handlermvfav} id={props.MovieId}></img>
            <p className="ml-4">Remove From Favourites</p>
            </div>
        {open && <ParPota ImgUrl={xx.img} MovieDate={xx.date} MovieDesc={xx.desc} MovieTitle={xx.title} MovieRating={xx.rating} doChange={handleChange} Adult={xx.adult} Lang={xx.lang} MovieId={props.MovieId}/>}
        </div>
        {/* <div className="parpota"> */}
      
        {/* </div> */}
        </>
 )
}

