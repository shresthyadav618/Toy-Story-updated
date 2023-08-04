
import "./navbar.css";

import { faBell, faHeart, faLightbulb, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
export default function useNavbar(){

    const [select,changeSelect] = useState(true);
    return(
        <div className="navbar relative">

            <div className="hamburger" onClick={()=>{
                const el = document.querySelectorAll('.sider');
                el.forEach((elm)=>{
                    if(elm.style.display=='block'){
                        console.log(elm.style.display)
                        elm.style.display='none';}
                        else if(elm.style.display==''){
                            elm.style.display='none';
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
            <form>
            <input type="text" ></input>
            </form>
                
            </div>


            <div className="user__heart">
                <div onClick={()=>{
                    window.location.href='/user?val=1'
                }}><FontAwesomeIcon icon={faHeart} size="xl"/></div>
                <div><FontAwesomeIcon icon={faUser} size="xl" onClick={()=>{
                    window.location.href = '/user?val=0';
                }}/></div>
            </div>
        </div>
    )
   
}