import React from "react";
import { useState, useEffect } from "react";
import "./GenreSideBar.css"
import "./App.css"
import { NavLink } from "react-router-dom";

function GenreSideBar(){
    const [count, setCount] = useState([1,2,4]);

    useEffect(() => {
        console.log("fetching genres")
         fetch(`http://127.0.0.1:3001/genres/`)
        .then(response => response.json())
        .then(res => {
            console.log("promise resolved")
            setCount(res);
           ;
        })
    },[])
return(
<>
<div id="genreSide" className='grid-item3'>
<p>Browse by Genre</p>
<ul id="genreList">
{
count.map( 
    //to do - create a component for anchor 
  c => <li><NavLink to={'/' + c.genre_name} className="genreTitle">{c.genre_name}</NavLink></li>
)
}
</ul>
</div>
</>
)
}
export default GenreSideBar;

