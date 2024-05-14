import React from "react";
import { useState, useEffect } from "react";
import "./GenreSideBar.css"
import "./App.css"
import { NavLink } from "react-router-dom";
import axios from "axios";

function GenreSideBar(){
    const [count, setCount] = useState([1,2,4]);

    useEffect(() => {
        let getGenres = async() => {
            console.log("fetching genres")
            let genres = await axios.get(`http://127.0.0.1:3001/genres/`)  
                setCount(genres.data);
        }
        getGenres()

    },[])
return(
<>
<div id="genreSide" className='grid-item3'>
<p>Browse by Genre</p>
<ul id="genreList">
{
count.map( 
  c => <li><NavLink to={'/' + c.genre_name} className="genreTitle">{c.genre_name}</NavLink></li>
)
}
</ul>
</div>
</>
)
}

export default GenreSideBar;

