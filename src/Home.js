import './Main.css'
import Recordgrid from "./Recordgrid";
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

function Home(){
    let records = useSelector(state => state.records)
    let params = useParams()
    let {genre} = params;
    if(genre){
        records = records.filter((record) => record.genre == genre)
    }

    return(
        <>
         <h1 className='main-header'>Latest additions</h1>
         <Recordgrid records={records}/>
        </>
    )
}

export default Home;