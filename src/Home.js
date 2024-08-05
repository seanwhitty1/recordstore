import './Main.css'
import './App.css'
import Recordgrid from "./Recordgrid";
import { useSelector} from 'react-redux';

function Home(){
  
    let records = useSelector(state => state.records)
    return(
        <>
         <h1 className='main-header'>Latest additions</h1>
         <Recordgrid records={records}/>
        </>
    )
}
export default Home;