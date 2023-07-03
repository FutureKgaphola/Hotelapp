import companyimage from '../media/hotel.png';
const NavBar = () => {
    var createMyBookings=()=>
    {
        
    }
    return (
        <div className="row" style={{ height: '10%' }}>
            <div className="col" style={{ textAlign: 'left' }}>
                <img src={companyimage}
                    alt='..'
                    width={"65px"}
                    height={"65px"} />
            </div>

            <div className="col" style={{ textAlign: 'right' }}>
                <button style={{ borderRadius: '9px', margin: '5px', borderColor: 'black', color: 'black' }} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm">sign in</button>
                <button style={{ borderRadius: '9px', margin: '5px', backgroundColor: '#306832', color: 'white' }} type="button" className="btn btn-sm">sign up</button>
            </div>
        </div>
    );
}

export default NavBar;