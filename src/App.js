
import './App.css';
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom';
import ParentLayout from './components/ParentLayout';
import Landingpage from './components/Landingpage';
import ForgotPassword from './components/ForgotPassword';
import Signup from './components/Signup';
import Comp404 from './components/Comp404';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<ParentLayout/>}>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='Signup' element={<Signup/>}/>
      <Route path='Forgtpassword' element={<ForgotPassword/>}/>
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
