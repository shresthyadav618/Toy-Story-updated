import React, { useEffect, useState } from "react";
import GrandChild from "./GrandChild";
import "./index.css";

export default function useFetchh(props) {
  console.log(props);
  const [arr, change] = React.useState([]);
console.log(props.Check);
// return;
  const [cpn, changecpn] = useState(1);

  console.log(cpn);
  console.log(props.GetUrl + (props.Check == true ? `-US&page=${cpn}` : ``));
  useEffect(() => {
    console.log("enter");
    if(props.search){
      return
    }
    fetch(props.GetUrl + (props.Check == true ? `-US&page=${cpn}` : ``))
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        change(data.results);
      });
  }, [props.GetUrl, cpn]);

useEffect(()=>{
  if(props.search){
    fetch(props.GetUrl).then((res)=>res.json()).then((data)=>{console.log('data is : ',data); change([data])});
  }
},[])

  console.log(arr);

  let xx = arr.map((elm, idx) => {
    return (
      <div>
        <GrandChild
          imgUrl={elm.poster_path}
          MovieTitle={elm.original_title}
          MovieRating={elm.vote_average / 2}
          MovieId={elm.id}
          MovieDate={elm.release_date}
          MovieDesc={elm.overview}
          Adult={elm.adult}
          Lang={elm.original_language}
        />
      </div>
    );
  });

  return (
    <div className="container1">
      <div className="flex flex-wrap op">{xx}</div>

     {!props.search &&  <div className="m-auto flex newdiv">
        <button
          onClick={() => {
            changecpn((prev) => prev - 1);
          }}
          className="btn"
        >
          <i class="fa-solid fa-backward fa-2xl"></i>
        </button>
        <div className="m-auto block w-fit">{cpn}</div>
        <button
          onClick={() => {
            changecpn((prev) => prev + 1);
          }}
          className="btn"
        >
          <i class="fa-sharp fa-solid fa-forward fa-2xl"></i>
        </button>
      </div>}
    </div>
  );
}
