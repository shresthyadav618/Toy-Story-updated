import "./parpota.css"
import Star from "./Star"
export default function parpota(props){

    return (
<div className="displayopen">
    <div className="subopen">  <button onClick={props.doChange} className="absolute right-5 top-0 text-black"><i class="fa-solid fa-xmark fa-xl"></i></button>
    <div className="flex sub-left-parent">
    <div className="sub-left">
    <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face`+props.ImgUrl} alt="not found"></img>
    </div>
    <div className="sub-right">
<div className="flex flex-col sub-right-child">
<h1 className="font-bold text-4xl text-center">{props.MovieTitle}+({props.Lang==="en"?"English":props.Lang})</h1>
<div className="xx text-black mt-4">{props.Adult===false?"Family Friendly": "Adult Film"}</div>
<div className="flex">
<div className="inline-block"> <Star rating={ props.MovieRating} rank={props.MovieId} /></div> <div className="inline-block">{props.MovieRating*2}</div> <div className="inline-block ml-4">{props.MovieDate}</div>
</div>
<div className="overview">
    Overview
</div>
<div>
    {props.MovieDesc}
</div>
</div>
    </div>
    </div>

    </div>
  
</div>
    );

}