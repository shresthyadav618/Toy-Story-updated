import React, { useEffect, useState } from "react";
import GrandChild from "./GrandChild";
import "./index.css";

export default function useFetchh(props) {
  console.log(props);
  const [arr, change] = React.useState([]);

  const [cpn, changecpn] = useState(1);

  console.log(cpn);
  console.log(props.GetUrl + (props.Check == true ? `-US&page=${cpn}` : ``));
  useEffect(() => {
    console.log("enter");

    fetch(props.GetUrl + (props.Check == true ? `-US&page=${cpn}` : ``))
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        change(data.results);
      });
  }, [props.GetUrl, cpn]);

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
          Gcc={props.Gcc}
        />
      </div>
    );
  });

  return (
    <div className="container1">
      <div className="flex flex-wrap op">{xx}</div>

      <div className="m-auto flex newdiv">
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
      </div>
    </div>
  );
}
