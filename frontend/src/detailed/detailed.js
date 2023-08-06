
import { faArrowLeft, faGlobe, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import GrandChild from "../GrandChild";
import Star from "../Star";
import Def from "../assets/default.png";
import Defcast from "../assets/default_cast.jpeg";
import Loader from "../loader/loader";
import Navbar from "../navbar/navbar";
import Sider from "../sider";
import './detailed.css';

import { faTrailer } from "@fortawesome/free-solid-svg-icons";
export default function useDetailed(){
   
    const[refresh,changeRefresh] = useState(false); 
    const [detail,changeDetail] = useState(null);
    const [cast,changeCast] = useState(null);
    const [rec,changeRec] = useState(null);
    const[genres,changeGenres] = useState(null);
    const Navigate = useNavigate();
    const [loader,setLoader] = useState(true);
    const [checkFav,changeCheckFav] = useState(null);
    const [favid,changeFavId] = useState(null);
    const {id} = useParams();
    console.log(id);
    const API_KEY = '?api_key=6973771bf60a7b1add0cc2ef3779046c';
    const BASE_URL = 'https://toystory-backend.onrender.com';


    useEffect(()=>{
        async function checkforFavU(){
            console.log('the movieId is : ',id);
              const data = await fetch(`${BASE_URL}/def/fav/check`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({movieId : id , token : sessionStorage.getItem('jwt')})
            });
    
            if(data.ok){
                const res = await data.json();
                changeCheckFav(true);
                console.log('movie exists in the fav movie database',res);
            }else{
                 changeCheckFav(false);
                 const errorData = await data.json();
                console.log('the movie doesnt exist in movie fav database ',errorData.error);
            }
    
            }

            checkforFavU();
    },[])

    useEffect(()=>{
        async function getData(){
            
            const data = await fetch(`https://api.themoviedb.org/3/movie/${id}${API_KEY}`,{
                headers : {'Content-Type' : 'application/json'},
                method : 'GET'
            });

            if(data.ok){
                const res = await data.json();
                console.log('received the movie info ', res);
                changeDetail(res);
            }else{
                console.log('there was some error while receving the info')
            }
        }

        async function getCast(){
            const options = {method: 'GET', headers: {accept: 'application/json'}};
            const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits${API_KEY}`, options);
            if(data.ok){
                const res = await data.json();
                console.log('got the cast detials',res);
                changeCast(res.cast);
            }
        }

        async function getRec(){
            const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=6973771bf60a7b1add0cc2ef3779046c`);
            if(data.ok){
                const res = await data.json();
                console.log('got the recommendations',res);
                changeRec(res.results);
            }
        }
        getData();
        getCast();
        getRec();

       
        console.log('changes in this');
    },[id]);

    // useEffect(()=>{
        async function checkforFav(){
        console.log('the movieId is : ',id);
          const data = await fetch(`${BASE_URL}/def/fav/check`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({movieId : id , token : sessionStorage.getItem('jwt')})
        });

        if(data.ok){
            const res = await data.json();

            console.log('movie exists in the fav movie database',res);
        }else{
             addMovie();
             const errorData = await data.json();
            console.log('the movie doesnt exist in movie fav database ',errorData.error);
        }

        }


        async function addMovie(){
            const data = await fetch(`${BASE_URL}/def/fav/addmovie`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({movieId : id, token : sessionStorage.getItem('jwt')})
            });

            if(data.ok){
                const res = await data.json();
                console.log('the movie is added to the database',res);
                changeCheckFav(true);
            }else{
                const errorData = await data.json();
                console.log('some error adding the movie ot favorites',errorData.error);
            }
        }
        // checkforFav();
    // },[favid])
    if(detail && cast && rec && loader){
        setLoader(false);
    }
    var imgPath = null;
    
    async function deleteFromFav(){
        const data = await fetch(`${BASE_URL}/def/fav/delete`,{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({movieId:id, token : sessionStorage.getItem('jwt')})
        });

        if(data.ok){
            const res = await data.json();
            console.log('success deleting the movie from database',res);
            changeCheckFav(false);
        }else{
            const errorData = await data.json();
            console.log('there was some error deleting the movie',errorData.error);
        }
    }
// const mainPic = (detail && detail.profile_path) ? `https://image.tmdb.org/t/p/w500${detail.poster_path}` : Def;
var mainPic = (detail)? `https://image.tmdb.org/t/p/w500${detail.poster_path}`:Def ;
if(detail && detail.poster_path){
    mainPic = `https://image.tmdb.org/t/p/w500${detail.poster_path}`
}else{
    mainPic = Def;
}
   if(loader){
    return <Loader/>;
   }else{
    return(
        <>
        <div className="miracle1"></div>
        <Sider filter='true' refresh = {refresh}/>
        <Navbar/>
        
        <div className='detailed__container'>
           
            <div className='detailed__container__child' onClick={()=>{
                // Navigate("/");
            }}>

          
            <div className='main__container'>
          
            <div className="khali"></div>
                <div className="flex gap-x-10 mt-6 mlf">
                <div className='first__main'><img src={mainPic} alt={()=>{
                    setLoader(true);
                }}></img></div>
                <div className='second__main'>
                    <div className='title'>{detail.original_title}{detail.release_date.split('-')[0]}</div>
                    <div className="tagline">{detail.tagline}</div>

                    <div className='flex gap-x-20 rating__date'>
                        
                        <span className='flex gap-x-2'><Star rating={ detail.vote_average/2 } rank={detail.id} />
                          <p>{detail.vote_average}</p></span>

                          <div className='flex gap-x-2'>
                          <p className='ml-4'>{detail.runtime}min / </p>
                           <span>{detail.release_date} /</span>
                          </div>
                          
                            </div>

                            <div className='movie__genres'>
                                {detail.genres.map((elm)=>{
                                    const pathImg = require(`../assets/${elm.id}.png`);
                                    
                                    return(
                                    <>
                                    <div className="flex gap-x-2 justify-center items-center">
                                    <img src={pathImg} width={'30px'}></img>
                                    <div>{elm.name}</div>
                                    </div>
                                    </>
                                    )
                                })}
                            </div>

                            <div className='overview'>
                                <span>Overview</span>
                                <span>{detail.overview}</span>
                            </div>
                            <div className="text-3xl font-normal">Top Cast</div>
                            <div className='cast cursor-pointer'>
                                {cast.map((elm,index)=>{
                                    if(index<=5){
                                    console.log(`https://image.tmdb.org/t/p/w500/${elm.profile_path}.jpg?api_key=6973771bf60a7b1add0cc2ef3779046c`);
                                    const mainCast = (elm.profile_path)?`https://image.tmdb.org/t/p/w500/${elm.profile_path}?api_key=6973771bf60a7b1add0cc2ef3779046c`:Defcast
                                    return(
                                        
                                        <div onClick={()=>{
                                            Navigate(`/cast/${elm.id}?prev=${`/movie/${id}`}`)
                                        }} className='cast__card' >
                                            <img src={mainCast} width={'100px'} height={'100px'}></img>
                                            <div className='cast__name'>{elm.original_name}</div>
                                            <div className='cast__role'>{elm.character.split('/')[0]}</div>
                                        </div>
                                        
                                        
                                    )
                                    }
                                })}
                            </div>


                            <div className='links_feature cursor-pointer'>
                                <div className='first__link'>
                                    <div className='btn1' onClick={()=>{
                                        window.location.href = detail.homepage;
                                    }}>
                                        <span>WEBSITE</span>
                                        <FontAwesomeIcon icon={faGlobe} />
                                    </div>

                                    <div className='btn1' onClick={()=>{
                                        window.location.href = `https://www.imdb.com/title/${detail.imdb_id}`;
                                    }}>
                                        <span>IMDB</span>
                                        <i class="fa-brands fa-imdb"></i>
                                    </div>

                                    <div className='btn1' onClick={()=>{
                                        if(detail.video!=false)
                                        window.location.href = detail.video;
                                    }}>
                                        <span>TRAILER</span>
                                        <FontAwesomeIcon icon={faTrailer} />
                                    </div>

                                </div>
                                <div className='second__link'>
                                    { !checkFav && 
                                <div className='btn1' onClick={()=>{
                                    // changeFavId(id);
                                    checkforFav();
                                }}>
                                        <span>FAVORITE</span>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </div>
   }

   {checkFav && <div className='btn1' onClick={()=>{
                                    deleteFromFav();
                                }}>
                                        <span>UNFAVORITE</span>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </div>}

                                    <div className='btn1'>
                                        <span>WATCHLIST</span>
                                        <span className="btn__text">+1</span>
                                    </div>

                                    <div className='btn1' onClick={()=>{
                                        window.location.href= '/';
                                    }}>
                                        <span>BACK</span>
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </div>

                                </div>



                            </div>


                </div>
                </div>
                
                <div className="might">You Might also like</div>
<div className="recommend">
    <div className="recommend__child">
    {rec && 
        rec.map((elm,index)=>{
           
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
        </div>
        </>
    )
}
}