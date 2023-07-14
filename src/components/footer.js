import { Link } from "react-router-dom";
import companyimage from '../media/hotel.png';
const Footer = () => {
    return ( 
        <div id='footer' className='row' style={{ backgroundColor: '#306832', marginTop: '10px' }}>
                <div className='col'>
                    <h2>Quick Links</h2>
                    <Link><i className="fa fa-home"></i>    Home</Link>
                    <Link><i className="fa fa-handshake-o"></i> Help</Link>
                    <Link><i className="fa fa-building-o"></i>    About us</Link>

                </div>
                <div className='col'>
                    <h2>Contacts</h2>
                    <Link><i className="fa fa-phone"></i>   071 546 4000</Link>
                    <Link><i className="fa fa-envelope"></i>    info@marula.co.za</Link>

                </div>
                <div className='col'>

                </div>
                <div className='col'>
                    <img
                        src={companyimage}
                        alt='..'
                        style={{ width: '80%', backgroundColor: 'white' }}
                    />
                </div>


            </div>
     );
}
 
export default Footer;