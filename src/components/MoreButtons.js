import { sign_out } from "./Navbar";

const MoreButtons = () => {
    return ( 
        <>
        <button onClick={()=>sign_out()} style={{ borderRadius: '9px', margin: '5px', color: 'white' }} type="button" className="btn btn-danger btn-sm">logout</button>
        <button style={{ borderRadius: '9px', margin: '5px', backgroundColor: '#306832', color: 'white' }} type="button" className="btn btn-sm">My Bookings</button>
        </>
     );
}
 
export default MoreButtons;