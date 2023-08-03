import {FaStarHalf,FaStar} from "react-icons/fa"
import {AiOutlineStar} from "react-icons/ai"
import './index.css'
import './star.css'
export default function Stars(props){
let rev=props.rating;
let trash=Array.from({length:5},(elm,idx)=>{
    let number=idx+0.5;

function HandleEnter(){
let elm=document.getElementById(props.rank);
elm.style.display="block"
elm.style.marginTop="-0%"
}

function HandleOut(){
    let elm=document.getElementById(props.rank+100);
    elm.style.display="none"
}

    return (
        <div >
            <div className="icon"  >
            {
rev>=idx+1? (<FaStar/>):  rev>=number? (<FaStarHalf/>):(<AiOutlineStar/>)
            }
            
        </div>
        
        </div>
        
    )
})

return (
<div className="All-Icons flex flex-col" onMouseMove={()=>{
    let elm=document.getElementById(props.rank);
    elm.style.display="block"
    elm.style.marginTop="-0%"
}} onMouseOut={()=>{
    let elm=document.getElementById(props.rank);
    elm.style.display="none"
}}>
    <div className="flex">{trash}</div>

<div id={props.rank} style={{display:"none"}} >{props.rating*2} </div>
</div>

);


}