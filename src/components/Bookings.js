import LoginDialog from "./LoginDialog";
import NavBar from "./Navbar";
import Footer from "./footer";
import admin from '../media/admin.jpg';
import searchicon from '../media/search.png';

const Bookings = () => {
    return (
        <div className="container" style={{ backgroundColor: 'white', height: '100%' }}>
            <NavBar />

            <div className="row" style={{
                backgroundImage: `url(${admin})`,
                backgroundSize: 'cover',
                height: '480px',
                backgroundRepeat: 'no-repeat',
            }}>

                <div className="row d-flex align-items-center"
                >
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="row"
                            style={{
                                alignSelf: 'center',
                                margin: '0.5%',

                                background: 'rgba(51, 49, 49, 0.46)',
                            }}>
                            <div className="col-lg-12">
                                <span style={{ color: 'white', fontFamily: 'cursive', fontSize: "65px" }}>Marula </span>
                                <strong style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}><span style={{ color: '#306832', fontStyle: 'italic', fontSize: '20px' }}>LIFE STYLE</span></strong>

                            </div>
                            <div className="col-col-lg-12">
                                <h4 style={{ color: 'white' }}>IT IS TIME FOR ADVENTURE</h4>
                                <h4 style={{ color: 'white' }}> AND EXPERIENCE</h4>
                            </div>

                        </div>
                    </div>
                    <div className="col">
                        .
                    </div>


                </div>

            </div>
            <div className="" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end', backgroundColor: 'transparent', marginTop: '-10%', zIndex: '5' }}>
                <div className="" style={{ display: 'flex', padding: '0', margin: '0', height: '200px' }}>
                    <div className="row" style={{ padding: '0', margin: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '5px', margin: '0', borderRadius: '5px 5px 0px 0px', backgroundColor: 'whitesmoke' }}>
                            <h1 className="text-danger">5</h1>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-15%', height: '50%', padding: '0', margin: '0', borderRadius: '5px', zIndex: '5', backgroundColor: 'black' }}>
                            <h4 style={{ color: 'white', marginTop: '10%' }}>Rooms available</h4>
                        </div>
                    </div>

                    <div className="row" style={{ padding: '0', margin: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '5px', margin: '0', borderRadius: '5px 5px 0px 0px', backgroundColor: 'whitesmoke' }}>
                            <h1 className="text-success">54</h1>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-15%', height: '50%', padding: '0', margin: '0', borderRadius: '5px', zIndex: '5', backgroundColor: 'black' }}>
                            <h4 style={{ color: 'white', marginTop: '10%' }}>Rooms occupied</h4>
                        </div>
                    </div>

                </div>
            </div>

            <div style={{ display: 'flex', padding: '2px', backgroundColor: 'black', borderRadius: '20px',margin:'5px' }}>
                    <img src={searchicon} height={'25px'} style={{ marginLeft: '5px', alignSelf: 'center' }} alt="search" />
                    <input style={{ marginLeft: '6px', margin: '15px' }} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                </div>

            <table class="table table-dark table-hover table-responsive">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>

            <Footer />
            <LoginDialog />

        </div>
    );
}

export default Bookings;