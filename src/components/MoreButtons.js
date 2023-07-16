import { useNavigate } from "react-router-dom";
import { sign_out } from "./Navbar";

const MoreButtons = (props) => {

    const navigate=useNavigate();
    const Admin=()=>{
        navigate('/Bookings');
    }
    const profile=()=>{
        navigate(`/Profile/${String(props.isAuth.authId)}`);
    }
    return ( 
        <>
        {
            String(props.isAuth.authEmail).trim().toLowerCase() ==="admin@marula.co.za" ?
            <>
            <button onClick={()=>sign_out(props)} style={{ borderRadius: '9px', margin: '5px', color: 'white' }} type="button" className="btn btn-danger btn-sm">logout</button>
            <button onClick={()=>Admin()} style={{ borderRadius: '9px', margin: '5px', backgroundColor: '#306832', color: 'white' }} type="button" className="btn btn-sm">Admin dashboard</button>

            </>
            :
            <>
            <button onClick={()=>profile()} style={{ borderRadius: '9px', margin: '5px', backgroundColor: '#306832', color: 'white' }} type="button" className="btn btn-sm">Profile</button>
            <button onClick={()=>sign_out(props)} style={{ borderRadius: '9px', margin: '5px', color: 'white' }} type="button" className="btn btn-danger btn-sm">logout</button>
            </>
            
        }
        
        </>
     );
}
 
export default MoreButtons;