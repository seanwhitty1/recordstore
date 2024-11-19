import './Main.css'
import './App.css'
import Recordgrid from "./Recordgrid";
import Featuregrid from './Featuregrid';
import { useSelector} from 'react-redux';

function Home(){
    let records = useSelector(state => state.records)
    return(
        <>
         <h1 className='main-header'>Latest additions</h1>
         <Recordgrid records={records}/>
         <hr></hr>
         <h1 className='main-header'>Magaize</h1>
         <Featuregrid/>
        </>
    )
}
export default Home;