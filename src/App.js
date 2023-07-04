
import './App.css';
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
const ParentLayout=lazy(()=>import('./components/ParentLayout'));
const Landingpage=lazy(()=>import('./components/Landingpage'));
const ForgotPassword=lazy(()=>import('./components/ForgotPassword'));
const Signup=lazy(()=>import('./components/Signup'));
const Comp404=lazy(()=>import('./components/Comp404'));

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
