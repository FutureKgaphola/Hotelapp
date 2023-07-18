import companyimage from '../media/hotel.png';

const NavBarUnathorised = () => {
    var goHome=()=>{
        window.location.replace("/");
    }

    return ( 
        <div className="row" style={{ height: '10%',backgroundColor:'whitesmoke' }}>
            <div className="col" style={{ textAlign: 'left'}}>
                <img src={companyimage}
                onClick={()=>goHome()}
                    alt='..'
                    width={"65px"}
                    height={"65px"} />
            </div>

            <div id='logindiv' className="col" style={{ textAlign: 'right' }}>
                
            </div>
        </div>
     );
}
 
export default NavBarUnathorised;