
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

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<ParentLayout/>}>
      <Route index element={<Landingpage/>}/>
      <Route path='Register' element={<Register/>} action={RegisterAction}/>
      <Route path='Forgtpassword' element={<ForgotPassword/>} action={Resetaction}/>
      <Route path='Bookings' element={<Bookings/>}/>
      <Route path='*' element={<Comp404/>}/>
    </Route>
  )
);
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
