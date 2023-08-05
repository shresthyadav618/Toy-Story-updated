import { faFileCirclePlus, faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Child from "../Child"
import Def from "../assets/def.png"
import Loader from "../loader/loader"
import "./loggedUser.css"
export default function useRightContainer(props){
    const API_KEY = '?api_key=6973771bf60a7b1add0cc2ef3779046c';
    const [userData,changeUserData] = useState(null);
    const [favMovieData,changeFavMovie] = useState(null);
    const [pass,changePass] = useState({
        prev_pwd : "",
        password : "",
        cpwd : ""
    });
    console.log('user data is  : ',userData);
    console.log('movie data is : ',favMovieData);
    const [error,setError] = useState(null);
    async function convertToString(file) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
      
          fileReader.readAsDataURL(file);
      
          fileReader.onload = () => {
            console.log(fileReader.result);
            resolve(fileReader.result);
          };
      
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      }
    async function convertTo64(e){
        const file = e.target.files[0];
        if(!file){
            alert('No such file exists');
            return;
        }
        const base64String = await convertToString(file);
      
        changeUserData((prev) => {
          return { ...prev, image: base64String };
        });
    }


    useEffect(()=>{
        
        async function getUserData(){
          const data = await fetch('http://localhost:8000/def/userbyid',{
            method : 'POST',
            body : JSON.stringify({token : sessionStorage.getItem('jwt')}),
            headers : {'Content-Type' : 'application/json'}
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
            const data = await fetch('http://localhost:8000/def/favbyid',{
                method : 'POST',
                body : JSON.stringify({token : sessionStorage.getItem('jwt')}),
                headers : {'Content-Type' : 'application/json'}
            });

            if(data.ok){
                console.log('data found');
                const res = await data.json();
                console.log('data is : ',res);
                changeFavMovie((prev)=>{
                    return res;
                })
            }else{
                console.log('there was some error fetching the favorite movie data ',data.error);
            }
        }

        getFavMovie();
    },[])

    function handleUserSubmit(e){
        e.preventDefault();
        console.log('the user is trying to update the user information ');
        async function updateUser(){
          const data = await fetch('http://localhost:8000/def/user',{
            method : 'PUT',
            body : JSON.stringify({...userData,token:sessionStorage.getItem('jwt')}),
            headers : {'Content-Type':'application/json'}
        });

        if(data.ok){
            const res = await data.json();
            console.log('got the updated data',res);
            alert('user is updated');
        }else{
            console.log('there was error updating the data',data.error);
        }
        }

        updateUser();
    }

    function handlePassChange(e){
        e.preventDefault();
        async function handlePass(){
           const data = await fetch('http://localhost:8000/def/user/pwd',{
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({...pass,token:sessionStorage.getItem('jwt')})
        });

        if(data.ok){
            const res = await data.json();
            console.log('the user password is updated ',res);
            alert('updated the password');
            changePass({
                prev_pwd: "",
                password : "",
                cpwd : ""
            })
        }else{
            console.log('there was error updating the pwd',data.error);
        }
        }

        handlePass();
    }


   async function handleDeleteAcc(e){
    e.preventDefault();
        console.log('delete request');
        const data = await fetch('http://localhost:8000/def/user/delete',{
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({token : sessionStorage.getItem('jwt')})
        });

        if(data.ok){
            console.log('deleted the user');
            const res = await data.json();
            console.log('deleted the user with response',res);
            sessionStorage.clear();
            window.location.href = '';
        }else{
            console.log('some error while deleting the user',data.error);
        }
    }


    if(!userData || !favMovieData ){
        return  <div className="child__container"><Loader/></div> 
    }else{
    return(
        <div className="text-xl" 
   >
           {props.value==0 && <motion.div className="child__container" initial={{ y: 100 }} // Starting position (from bottom)
        animate={{ y: 0 }} // Final position (attached to its right place)
        transition={{ type: 'spring', damping: 10, stiffness: 100 }} // Spring-like effect
>
            <form >
                <h2 className="mb-4"> Profile</h2>
                <div className="flex large">
                    <input type="file" onChange={(e)=>{
                        convertTo64(e);
                    }}></input>
                    <div className="change__image m-auto"> <div className="flex flex-col  "> <icon><FontAwesomeIcon icon={faFileCirclePlus} /></icon> <h2>Drag your image here</h2> <span className="text-center">only .jpg and .png files will be accepted</span> </div> </div>
                    <div className="current__image">{userData && <img src={userData.image} ></img>} {!userData && <img src={Def} ></img>} </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="fullname">FullName</label>
                    <input placeholder="Toy Story MERN" name="fullname" value={userData.name} onChange={(e)=>{
                        changeUserData((prev)=>{
                            return {...prev,name : e.target.value}
                        })
                    }}></input>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input placeholder="toystory@gmail.com" name="email" value={userData.email}  onChange={(e)=>{
                        changeUserData((prev)=>{
                            return {...prev,email : e.target.value}
                        })
                    }}></input>
                </div>

                <div className="flex justify-between btnclass">
                    <button className="bt1" onClick={(e)=>{
                        handleDeleteAcc(e);
                    }}>Delete Account</button>
                    <button className="bt2" type="submit" onClick={(e)=>{handleUserSubmit(e)}}>Update Profile</button>
                </div>
            </form>
            </motion.div>}

            {props.value==1 &&<motion.div  className="child__container" initial={{ y: 100 }} // Starting position (from bottom)
        animate={{ y: 0 }} // Final position (attached to its right place)
        transition={{ type: 'spring', damping: 10, stiffness: 100 }} // Spring-like effect 
        >
                <div className="text-xl">Favorite Movies</div>
                <div className="flex flex-wrap fn">
                {favMovieData && favMovieData.map((elm)=>{
                    console.log(elm.movieId);
                    return  <Child
                    GetUrl={`https://api.themoviedb.org/3/movie/${elm.movieId}${API_KEY}`}
                    Check={false}
                    search={true}
                  />
                })}
                </div>
                {!favMovieData && <div className="flex flex-col justify-center items-center fmovie"><icon><FontAwesomeIcon icon={faVideo} size="xl" /></icon><div>You have no favorite movies </div></div> }
                </motion.div>}


                {props.value==2 && <motion.div className="child__container" initial={{ y: 100 }} // Starting position (from bottom)
        animate={{ y: 0 }} // Final position (attached to its right place)
        transition={{ type: 'spring', damping: 10, stiffness: 100 }} // Spring-like effect
        >
                <form onSubmit={(e)=>{
                    if(pass.cpwd!=pass.password){
                        setError('Passwords dont match!');
                        e.preventDefault();
                        props.value=2;
                        return ;
                    }
                    handlePassChange(e);
                }}>
                <h2 className="mb-4">Change Password</h2>
                
                <div className="flex flex-col">
                    <label htmlFor="ppwd">Previous Password</label>
                    <input placeholder="********" name="ppwd" value={pass.prev_pwd} onChange={(e)=>{
                        changePass((prev)=>{return {...prev,prev_pwd : e.target.value}})
                    }}></input>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="npwd">New Password</label>
                    <input placeholder="********" name="npwd" value={pass.password} onChange={(e)=>{
                        changePass((prev)=>{return {...prev,password : e.target.value}})
                    }}></input>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="fpwd">Confirm Password</label>
                    <input placeholder="********" name="fpwd" value={pass.cpwd} onChange={(e)=>{
                        changePass((prev)=>{return {...prev,cpwd : e.target.value}})
                    }}></input>
                </div>

                <div className=" btnclass flex-end">
                    
                    <button className="bt2">Change Password</button>
                </div>
                {error && <div >{error}</div>}
            </form>
                    </motion.div>}
        </div>
    )
}



}


// elm.map((el)=>{
   
// })