import './Main.css'
import './App.css'
import Recordgrid from "./Recordgrid";
import { useSelector} from 'react-redux';
import { useParams} from 'react-router-dom';
import { useEffect } from 'react';

function Home(){
    let genre = useSelector(state => state.genre)

    useEffect(() => {
        //if genre is updated in the state we need to change our available records.
    },[genre])
    let records = useSelector(state => state.records)

    const token = useSelector(state => state.token)
    if(genre){
        records = records.filter((record) => record.genres[0].genre_name == genre)
    }
    return(
        <>
         <h1 className='main-header'>Latest additions</h1>
         <Recordgrid records={records}/>
        </>
    )
}
export default Home;