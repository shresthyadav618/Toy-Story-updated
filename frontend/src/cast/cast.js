
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import GrandChild from "../GrandChild";
import loader from "../loader/loader";
import Sider from "../sider";
import "./cast.css";
export default function useCast(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const prevParam = queryParams.get('prev');
 
    // Now you can use the `prevParam` variable in your component
    // For example, you can log it to the console:
    console.log('prev:', prevParam);
    const [details,changeDetails] = useState(null);
    const [movie, changeMovie] = useState(null);
    const {id} = useParams();
    console.log(details);
    console.log('the person id is ',id);
        useEffect(()=>{
            const options = {method: 'GET', headers: {accept: 'application/json'}};

            fetch(`https://api.themoviedb.org/3/person/${id}?api_key=6973771bf60a7b1add0cc2ef3779046c`, options)
              .then(response => response.json())
              .then(response => {
                changeDetails(response)
              })
              .catch(err => console.error(err));
              
              fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=6973771bf60a7b1add0cc2ef3779046c`, options)
              .then(response => response.json())
              .then(response => {
                console.log(response);
                changeMovie(response.cast);
              })
              .catch(err => console.error(err));
    },[]);

if(!details || !movie){
    return loader
}else{
    return (
        <>
       
         <Sider filter={true}/>
         <div className="miracle1"></div>
       
           
        <div className="flex shikra">
{/* <div>bruh</div> */}


        <div className="flex flex-col relative ">
            {/* <Navbar/> */}
            <div className="po"></div>
        <div className="top__container">
            <div className="first__container">
                <img src={`https://image.tmdb.org/t/p/w780//${details.profile_path}?api_key=6973771bf60a7b1add0cc2ef3779046c`}></img>
            </div>
            <div className="second__container">
                <div className="flex flex-col">
                    <div className="castt__name">{details.also_known_as[0]}</div>
                    <div className="cast__bd">Born : {details.birthday}</div>
                    <div className="cast__bio">{details.biography}</div>
                    <div className="flex justify-around">
                        <button className="btn__blue" onClick={()=>{
                            window.location.href = `https://www.imdb.com/name/${details.imdb_id}/`
                        }}>IMDB</button>
                        <button className="flex gap-x-1 justify-center items-center btn__blue__only" onClick={()=>{
                            window.location.href = prevParam;
                        }}><FontAwesomeIcon icon={faArrowLeft} /> <span>BACK</span> </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="cast__movies flex flex-col"> 
        <div className="flex w-full m-auto text-4xl items-center justify-center">Movies</div>
        <div className="main__movies">
            
{movie && 
    movie.map((elm,index)=>{
       
        if(index<=11){
        return(
        <GrandChild imgUrl={elm.poster_path}
        MovieTitle={elm.original_title}
        MovieRating={elm.vote_average / 2}
        MovieId={elm.id}
        MovieDate={elm.release_date}
        MovieDesc={elm.overview}
        Adult={elm.adult}
        Lang={elm.original_language}
        path_diff = {true}
        ></GrandChild>
        )
        }
    })
}
        </div>
        </div>
        </div>
        </div>


     
        </>
            )
}
}


