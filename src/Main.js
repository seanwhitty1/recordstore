import Recordgrid from "./Recordgrid";
import './Recordgrid.css'
import './Main.css'
import About from "./pages/About";
import Contact from "./Contact";
import './index.css'
import { NavLink, Switch, Route, Router, Routes } from 'react-router-dom';
import Detailrecord from "./Detailrecord";
import NewRecordForm from "./forms/newRecordForm";
import GenreSideBar from "./GenreSideBar";
import BrowseAll from "./BrowseAll";
const commonRecordPath = new RegExp("^/records/view")

//need to find a way to make the genre side bar update the main element

const Main = () => {
return(
    <>
    <div className="main grid-item4">  
    <Routes>
    <Route path='/:genre' element={ <Recordgrid/>} />
    <Route path='/' element={ <Recordgrid/>} />
    <Route path='/browseall' element={ <BrowseAll/>} />
    
    <Route path ='/about' element={<About/>}/>
    <Route path ='/contactus' element={<Contact/>}/>
    <Route path ='/view/:id' element={<Detailrecord/>}/>
    <Route path ='/addnew' element={<NewRecordForm/>}/>
    </Routes>
      </div>
    </>)
};
export default Main;
