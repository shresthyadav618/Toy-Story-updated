
import { faBell, faHeart, faLightbulb, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
export default function useNavbar(props){

    
    const [data,changeData] = useState(null);
    const [select,changeSelect] = useState(true);
    return(
        <div className="navbar">

            <div className="hamburger" onClick={()=>{
                const el = document.querySelectorAll('.sider');
                el.forEach((elm)=>{
                    if(elm.style.display=='block'){
                        console.log(elm.style.display)
                        elm.style.display='none';}
                        else if(elm.style.display==''){
                            elm.style.display='block';
                        }
                        else{
                            console.log(elm.style.display)
                            elm.style.display='block';
                        }
                })
            }}>
                <div className="hmb"></div>
                <div className="hmb"></div>
                <div className="hmb"></div>
            </div>

            <div className="toggle" onClick={()=>changeSelect((prev)=>{return !prev})}>
                {select && <div><FontAwesomeIcon icon={faLightbulb} size="xl"/></div>}
                {!select && <div><FontAwesomeIcon icon={faBell} size="xl"/></div>}
            </div>

            <div className="movie__input">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <form onSubmit={(e)=>{
                e.preventDefault();
                props.setQuery(data);
            }}>
            <input type="text" onChange={(e)=>{
                changeData(e.target.value);
            }}></input>
            </form>
                
            </div>


            <div className="user__heart">
                <Link to="/user?val=1"><div><FontAwesomeIcon icon={faHeart} size="xl"/></div></Link>
                <Link to="/user?val=0"><div><FontAwesomeIcon icon={faUser} size="xl" /></div></Link>
            </div>
        </div>
    )
   
}
