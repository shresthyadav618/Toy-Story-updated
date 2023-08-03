
import "./navbar.css";

import { faBell, faHeart, faLightbulb, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
export default function useNavbar(){

    const [select,changeSelect] = useState(true);
    return(
        <div className="navbar relative">
            <div className="toggle" onClick={()=>changeSelect((prev)=>{return !prev})}>
                {select && <div><FontAwesomeIcon icon={faLightbulb} size="xl"/></div>}
                {!select && <div><FontAwesomeIcon icon={faBell} size="xl"/></div>}
            </div>

            <div className="movie__input">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <form>
            <input type="text" ></input>
            </form>
                
            </div>


            <div className="user__heart">
                <div><FontAwesomeIcon icon={faHeart} size="xl"/></div>
                <div><FontAwesomeIcon icon={faUser} size="xl" onClick={()=>{
                    window.location.href = '/user';
                }}/></div>
            </div>
        </div>
    )
   
}