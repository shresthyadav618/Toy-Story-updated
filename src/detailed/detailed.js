
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from "../loader/loader";
import './detailed.css';
export default function useDetailed(){

    const [detail,changeDetail] = useState(null);
    const [cast,changeCast] = useState(null);
    const [rec,changeRec] = useState(null);
    const[genres,changeGenres] = useState(null);

    const {id} = useParams();
    console.log(id);
    const API_KEY = '?api_key=6973771bf60a7b1add0cc2ef3779046c';
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
                changeCast(res);
            }
        }

        async function getRec(){
            const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=6973771bf60a7b1add0cc2ef3779046c`);
            if(data.ok){
                const res = await data.json();
                console.log('got the recommendations',res);
                changeRec(res);
            }
        }
        getData();
        getCast();
        getRec();
        console.log('changes in this');
    },[])
   if(!detail || !cast || !rec){
    return <Loader/>;
   }else{
    return(
        <div className='detailed__container'>This is the movie</div>
    )
}
}