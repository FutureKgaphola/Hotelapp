
import './App.css';
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom';
import ParentLayout from './components/ParentLayout';
import Landingpage from './components/Landingpage';
import ForgotPassword from './components/ForgotPassword';
import Comp404 from './components/Comp404';
import Register from './components/Register';
import { Resetaction } from './Actions/Reset';
import { RegisterAction } from './Actions/Register';
import Bookings from './components/Bookings';
import Update from './components/Update';
import RoomPreview from './components/RoomPreview';
import Profile from './components/Profile';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<ParentLayout/>}>
      <Route index element={<Landingpage/>}/>
      <Route exact path='Register' element={<Register/>} action={RegisterAction}/>
      <Route exact path='Forgtpassword' element={<ForgotPassword/>} action={Resetaction}/>
      <Route exact path='Bookings' element={<Bookings/>}/>
      <Route exact path='Update/:_id' element={<Update/>}/>
      <Route exact path='RoomsPreview/:_id/:Authid' element={<RoomPreview/>}/>
      <Route exact path='Profile/:_id' element={<Profile/>}/>
      <Route exact path='*' element={<Comp404/>}/>
    </Route>
  )
);
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
