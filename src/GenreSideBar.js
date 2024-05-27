import React from "react";
import { useState, useEffect } from "react";
import "./GenreSideBar.css"
import "./App.css"
import { useDispatch } from "react-redux";
import axios from "axios";


function GenreSideBar(){
    const dispatch = useDispatch()
    const [count, setCount] = useState([1,2,4]);
    const updateGenreInState = (genre) => dispatch({ type: "SELECTGENRE", payload: genre});

    useEffect(() => {
        let getGenres = async() => {
            console.log("fetching genres")
            let genres = await axios.get(`http://127.0.0.1:3001/genres/`)  
                setCount(genres.data);
        }
        getGenres()

    },[])
    //<li </li>
return(
<>
<div id="genreSide" className='grid-item3'>
<p>Browse by Genre</p>
<ul>

{count.map((c) => <li><a className="genre-title" onClick={() => updateGenreInState(c.genre_name)} data-text={c.genre_name}>{c.genre_name}</a></li>)}
 
</ul>

</div> 
</>
)
}

export default GenreSideBar;

