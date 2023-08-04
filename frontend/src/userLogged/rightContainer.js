import { faFileCirclePlus, faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Def from "../assets/def.png"
import "./loggedUser.css"
export default function useRightContainer(props){

    const [userData,changeUserData] = useState(null);
    const [favMovieData,changeFavMovie] = useState(null);
    useEffect(()=>{
        
        async function getUserData(){
          const data = await fetch('http://localhost:8000/def/user',{
            method : 'GET'
        });

        if(data.ok){
            const res = await data.json();
            console.log('the data of the user received ',res);
            changeUserData(res);
        }else{
            console.log('there was some problem while getting the user data',data.error);
        }
        }
        getUserData();


        async function getFavMovie(){
            const data = await fetch('http://localhost:8000/def/fav',{
                method : 'GET'
            });

            if(data.ok){
                const res = await data.json();
                changeFavMovie((prev)=>{
                    return res;
                })
            }else{
                console.log('there was some error fetching the favorite movie data ',data.error);
            }
        }

        getFavMovie();
    },[])

    return(
        <div className="text-xl" 
   >
           {props.value==0 && <motion.div className="child__container" initial={{ y: 100 }} // Starting position (from bottom)
        animate={{ y: 0 }} // Final position (attached to its right place)
        transition={{ type: 'spring', damping: 10, stiffness: 100 }} // Spring-like effect
>
            <form>
                <h2 className="mb-4"> Profile</h2>
                <div className="flex large">
                    <input type="file"></input>
                    <div className="change__image m-auto"> <div className="flex flex-col  "> <icon><FontAwesomeIcon icon={faFileCirclePlus} /></icon> <h2>Drag your image here</h2> <span className="text-center">only .jpg and .png files will be accepted</span> </div> </div>
                    <div className="current__image">{userData && <img src={userData.image} ></img>} {!userData && <img src={Def} ></img>} </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="fullname">FullName</label>
                    <input placeholder="Toy Story MERN" name="fullname"></input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input placeholder="toystory@gmail.com" name="email"></input>
                </div>

                <div className="flex justify-between btnclass">
                    <button className="bt1">Delete Account</button>
                    <button className="bt2">Update Profile</button>
                </div>
            </form>
            </motion.div>}

            {props.value==1 &&<motion.div  className="child__container" initial={{ y: 100 }} // Starting position (from bottom)
        animate={{ y: 0 }} // Final position (attached to its right place)
        transition={{ type: 'spring', damping: 10, stiffness: 100 }} // Spring-like effect 
        >
                <div className="text-xl">Favorite Movies</div>
                {favMovieData && <div></div>}
                {!favMovieData && <div className="flex flex-col justify-center items-center fmovie"><icon><FontAwesomeIcon icon={faVideo} size="xl" /></icon><div>You have no favorite movies </div></div> }
                </motion.div>}


                {props.value==2 && <motion.div className="child__container" initial={{ y: 100 }} // Starting position (from bottom)
        animate={{ y: 0 }} // Final position (attached to its right place)
        transition={{ type: 'spring', damping: 10, stiffness: 100 }} // Spring-like effect
        >
                <form>
                <h2 className="mb-4">Change Password</h2>
                
                <div className="flex flex-col">
                    <label htmlFor="ppwd">Previous Password</label>
                    <input placeholder="********" name="ppwd"></input>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="npwd">New Password</label>
                    <input placeholder="********" name="npwd"></input>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="fpwd">Confirm Password</label>
                    <input placeholder="********" name="fpwd"></input>
                </div>

                <div className=" btnclass flex-end">
                    
                    <button className="bt2">Change Password</button>
                </div>
            </form>
                    </motion.div>}
        </div>
    )
}





