import Recordgrid from "./Recordgrid";
import './Recordgrid.css'
import About from "./pages/About";
import Contact from "./Contact";



import { NavLink, Switch, Route, Router, Routes } from 'react-router-dom';
import Detailrecord from "./Detailrecord";
import NewRecordForm from "./forms/newRecordForm";

const commonRecordPath = new RegExp("^/records/view")

const Main = () => (
    <>
    <div className="main">
       
    
    <Routes>
    <Route path='/' element={ <Recordgrid/>} />
    <Route path ='/about' element={<About/>}/>
    <Route path ='/contactus' element={<Contact/>}/>
    <Route path ='/view/:id' element={<Detailrecord/>}/>
    <Route path ='/addnew' element={<NewRecordForm/>}/>
    
     

    </Routes>



    
  
      </div>
   


    </>
  );


export default Main;
