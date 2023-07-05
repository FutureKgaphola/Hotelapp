import { useState } from "react";
import { onLogin } from "./Navbar";
import companyimage from '../media/hotel.png';
import { useNavigate } from "react-router-dom";

const LoginDialog = () => {
    const navigate = useNavigate();
    const [password, setpassword] = useState('');
    var [email, setEmail] = useState('');

    var submitfields = (event) => {
        event.preventDefault();
        if (String(event.target[3].innerHTML).trim() === "Forgot password?") {
            event.target[1].style.display = 'none';
            event.target[2].innerHTML = 'Reset password';
            event.target[3].innerHTML = "Back to login";
        } else {
            event.target[1].style.display = 'block';
            event.target[2].innerHTML = 'Login';
            event.target[3].innerHTML = "Forgot password?";
        }
    }

    var getForgotpass=()=>{
        
        //alert('dss');
        navigate(`/Forgtpassword`);
    }

    return ( 
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Sign in</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="card-body p-4 p-lg-5 text-black">

                                <div className="d-flex align-items-center mb-3 pb-1">

                                    <img src={companyimage} alt={'logo'} style={{ width: "50px", height: "50px" }} />
                                    <span className="h1 fw-bold mb-0">Marula </span>
                                    <strong style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}><span style={{ color: '#306832', fontStyle: 'italic', fontSize: '20px' }}>LIFE STYLE</span></strong>
                                </div>

                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>

                                <form onSubmit={(formfields) => { submitfields(formfields) }}>
                                    <div className="form-outline mb-4">
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            required
                                            name="editemail"
                                            placeholder='Email address'
                                            id="formemail" className="form-control form-control-lg" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            onChange={(e) => setpassword(e.target.value)}
                                            type="password"
                                            required
                                            name="editpass"
                                            placeholder='Password'
                                            id="formpassword" className="form-control form-control-lg" />
                                    </div>

                                    <div className="pt-1 mb-4">
                                        <button onClick={(e) => onLogin(e, email, password)}
                                            style={{ borderRadius: '9px', margin: '5px', backgroundColor: '#306832', color: 'white' }} type="button" className="btn btn-lg">Login</button>
                                    </div>
                                    

                                </form>

                                <button
                                onClick={()=>getForgotpass()}
                                 style={{ border: 'none', backgroundColor: 'white' }} data-bs-dismiss="modal" type="button" className="small text-muted" >Forgot password?</button>
                            </div>

                        </div>
                        

                    </div>
                </div>
            </div>
     );
}
 
export default LoginDialog;