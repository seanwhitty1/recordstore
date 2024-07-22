import React from "react";
import { useState, useEffect } from "react";
import "./GenreSideBar.css"
import "./App.css"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";



function GenreSideBar(){
    let genre = useSelector(state => state.genre)
    const dispatch = useDispatch()
    const [count, setCount] = useState([1,2,4]);
    const updateGenreInState = (genre) => dispatch({ type: "SELECTGENRE", payload: genre});

    useEffect(() => {
        let getGenres = async() => {
            let genres = await axios.get(`http://127.0.0.1:3001/genres/`)  

                setCount(genres.data);
        }
        getGenres()

    },[genre])
    //<li </li>
    //we need to change genre sider bars to nav items
    //we then extract the genre name from the param passed
    //and use that to update the state... 
return(
<>
<div id="genreSide" className='grid-item-genreBar'>
<p>Browse by Genre</p>
<ul>
{count.map((c) => <li><p className="genre-title"  onClick={() => updateGenreInState(c.genre_name)} data-text={c.genre_name}>{c.genre_name}</p></li>)}
</ul>
</div> 
</>
)
}

export default GenreSideBar;

