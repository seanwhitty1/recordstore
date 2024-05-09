import Recordgrid from "./Recordgrid";
import './Recordgrid.css'
import Home from "./Home";
import './Main.css'
import About from "./pages/About";
import Contact from "./Contact";
import './index.css'
import { NavLink, Switch, Route, Router, Routes } from 'react-router-dom';
import Detailrecord from "./Detailrecord";
import NewRecordForm from "./forms/newRecordForm";
import BrowseAll from "./BrowseAll2";
const commonRecordPath = new RegExp("^/records/view")

const Main = () => {
return(
    <>
    <div className="main grid-item4">  
    <Routes>
    <Route path='/:genre' element={ <Recordgrid/>} />
    <Route path='/' element={ <Home/>} />
    <Route path='/browseall' element={ <BrowseAll/>} />
    <Route path ='/about' element={<About/>}/>
    <Route path ='/contactus' element={<Contact/>}/>
    <Route path ='/records/view/:id' element={<Detailrecord/>}/>
    <Route path ='/addnew' element={<NewRecordForm/>}/>
    </Routes>
      </div>
    </>)
};
export default Main;
