import './Main.css'
import './App.css'
import Recordgrid from "./Recordgrid";
import Featuregrid from './Featuregrid';
import { useSelector} from 'react-redux';
import styles from "./index.css"

function Home(){
    let records = useSelector(state => state.records)
    return(
        <>
  
         <h1 className='text-base  inline ml-40px md:text-md lg:text-lg xl:text-xl'>Latest additions</h1>
         <Recordgrid records={records}/>

         <h1 className='main-header'>Magazine</h1>
         <Featuregrid/>

        </>
    )
}
export default Home;