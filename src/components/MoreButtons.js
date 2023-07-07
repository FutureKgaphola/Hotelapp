import { useNavigate } from "react-router-dom";
import { sign_out } from "./Navbar";

const MoreButtons = (props) => {
    const navigate=useNavigate();
    const bookings=()=>{
        navigate('/Bookings');
    }
    return ( 
        <>
        <button onClick={()=>sign_out(props)} style={{ borderRadius: '9px', margin: '5px', color: 'white' }} type="button" className="btn btn-danger btn-sm">logout</button>
        <button onClick={()=>bookings()} style={{ borderRadius: '9px', margin: '5px', backgroundColor: '#306832', color: 'white' }} type="button" className="btn btn-sm">Bookings</button>
        </>
     );
}
 
export default MoreButtons;