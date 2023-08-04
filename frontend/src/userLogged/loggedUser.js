
import { faGear, faHeart, faLock, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./loggedUser.css";
import RightContainer from "./rightContainer";
export default function useLoggedUser(){
    const val = useParams();
    const Navigate = useNavigate();
    console.log(val);
    const[toggle,changeToggle] = useState(window.location.href.split('=')[1]);
console.log(toggle)
    return(
        <div className="flex lr__parent">
           <div className="container__left">
            <div className="flex flex-col">
                <div className={`flex `+(toggle==0?'bglight':'')}  onClick={()=>{if(toggle!=0){
                    changeToggle(()=>{return 0;})
                }}}  > <icon><FontAwesomeIcon icon={faGear} /></icon> <span>Update Profile</span></div>
                <div className={`flex `+(toggle==1?'bglight':'')}  onClick={()=>{if(toggle!=1){
                    changeToggle(()=>{return 1;})
                }}}  > <icon><FontAwesomeIcon icon={faHeart} /></icon> <span>Favorite Movies</span></div>
                <div className={`flex `+(toggle==2?'bglight':'')}  onClick={()=>{if(toggle!=2){
                    changeToggle(()=>{return 2;})
                }}}  > <icon><FontAwesomeIcon icon={faLock} /></icon> <span>Change Password</span></div>
                <div className={`flex `+(toggle==3?'bglight':'')}  onClick={()=>{
                    sessionStorage.clear();
                    Navigate('/');
                }}  > <icon><FontAwesomeIcon icon={faToggleOff} /></icon> <span>Logout</span></div>
            </div>
           </div>
           <div className="container__right">
            <RightContainer value={toggle}/>
           </div>
        </div>
    )
}