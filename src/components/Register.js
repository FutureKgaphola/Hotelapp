import NavBar from "./Navbar";
import Footer from "./footer";
import companyimage from '../media/hotel.png';
import bedmath from '../media/bedmath.jpg';
import LoginDialog from "./LoginDialog";

const Register = () => {
    return (
        <div className="container" style={{ backgroundColor: 'white', height: '100%' }}>
            <NavBar />

            <section className="">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src={bedmath}
                                            alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", height: "100%" }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            <div className="d-flex align-items-center mb-3 pb-1">

                                                <img src={companyimage} alt={'logo'} style={{ width: "50px", height: "50px" }} />
                                                <span className="h1 fw-bold mb-0">Marula </span>
                                    <strong style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}><span style={{ color: '#306832', fontStyle: 'italic', fontSize: '20px' }}>LIFE STYLE</span></strong>
                                
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign up for an account</h5>

                                            <form >
                                                <div className="form-outline mb-4">
                                                    <input
                                                        
                                                        type="email"
                                                        required
                                                        placeholder="Email address"
                                                        name="editemail"
                                                        id="formemail" className="form-control form-control-lg" />
                                                    
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        
                                                        type="password"
                                                        required
                                                        placeholder="Password"
                                                        name="editpass"
                                                        id="formpassword" className="form-control form-control-lg" />
                                                    
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        
                                                        type="tel"
                                                        maxLength={10}
                                                        required
                                                        placeholder="+27"
                                                        name="editphone"
                                                        id="formphone" className="form-control form-control-lg" />
                                                    
                                                </div>

                                                <div className="pt-1 mb-4">
                                                <button 
                                            style={{ borderRadius: '9px', margin: '5px', backgroundColor: '#306832', color: 'white' }} type="button" className="btn btn-lg">Register</button>
                                                </div>

                                            </form>
                                            

                                            

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <LoginDialog/>
        </div>
    );
}

export default Register;