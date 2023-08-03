
import "./favss.css"
import NewgrandChild from "./NewGrandChild"
import {useEffect} from "react"
function useFavss(props){
   




// useEffect(()=>{

// },[])



const arr=props.fav.map((elm)=>{
    console.log(elm)
return <NewgrandChild 
// imgUrl={img}
// MovieTitle={title}
// MovieRating={rating}
MovieId={elm.movieid}
docid={elm.docid}
// MovieDate={date}
// MovieDesc={desc}
// Adult={adult}
// Lang={lang}
Gcc={props.Gcc}
/>
})


return (
    <>
    <div className="favss"><p>YOUR FAVOURITES</p></div>
    <div className="flex flex-wrap items-center justify-center mainfav">
 
          {arr}
      
    </div>
    </>
)


}

export default useFavss;