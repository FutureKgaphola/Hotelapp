
import bedimage from '../media/restbed.jpg';
import bedmath from '../media/bedmath.jpg';
import companyimage from '../media/hotel.png';
import hiking from '../media/hihing.jpg';
import mountain from '../media/mountaineer.png';
import lemuer from '../media/lemur.png';
import { onSnapshot, collection, } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { db } from '../Dbconfig/db';
import { useEffect, useState } from 'react';
import NavBar, { onLogin } from './Navbar';
import Skeleton from './skeleton';


const Landingpage = () => {
    const colRef = collection(db, "Rooms");
    var [chalets, setchalet] = useState([]);
    const [password, setpassword] = useState('');
    var [email, setEmail] = useState('');
    var [isLoading,setisLoading]=useState(true);


    useEffect(() => {
        let rooms = [];
        onSnapshot(colRef, (snapshot) => {
            rooms = [];
            snapshot?.docs.forEach((doc) => {
                rooms.push(
                    {
                        id: doc.id,
                        ...doc.data()
                    }
                );
                setchalet(rooms);
                setisLoading(false);
            });
        })

    }, [chalets, colRef])




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

    return (
        <div className="container" style={{ backgroundColor: 'white', height: '100%' }}>
            <NavBar />
            <div className="row" style={{
                backgroundImage: `url(${bedimage})`,
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
                        ...
                    </div>
                </div>

            </div>


            <div className="row" style={{display:'inline-block',padding:'5px'}}>
                <h2 style={{
                    
                    color: 'black',
                    fontFamily: 'fantasy',
                    textDecoration: 'underline',
                    textDecorationColor: '#306832'
                }}
                >HOTELS</h2>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>

            </div>

            <div className="container row">
            
                {
                    !isLoading &&
                    
                    chalets ?
                    chalets.map((item) => (

                        <div key={item.id} className="col col-lg-3" style={{display:'flex',margin:'5px',padding:'0',borderRadius:"0px 5px 5px 0px", backgroundColor:'#306832'}}>
                            <div className="col" style={{margin:'5px'}}>
                            <div className="card-body">
                            <strong style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}><span style={{ color: '#306832', fontStyle: 'italic', fontSize: '20px' }}>{item.roomtype}</span></strong>
                            <div style={{background: 'rgba(51, 49, 49, 0.46)',borderRadius:'5px',padding:'5px'}}>
                                <ul>
                                    <li style={{color:'white'}} >2 x beds</li>
                                    <li style={{color:'white'}} >1 x shower</li>
                                    <li style={{color:'white'}} >3 x sheets</li>
                                </ul>

                            </div>
                                
                                <button style={{ borderRadius: '9px', margin: '5px', width: '65px', backgroundColor: 'white', borderColor: 'black', color: 'black' }} type="button" className="explore btn btn-sm">explore</button>
                            </div>
                            </div>
                            <div className="col">
                            <img style={{width:'100%',objectFit:'cover',height:"100%",borderRadius:"0px 5px 5px 0px"}} src={bedmath} alt="Card cap"/>
                            </div>

                        </div>
                    )) : <Skeleton/>

                }


            </div>
{/*
<div className="row">
                <div className='col-lg-1'>
                    <h2 style={{
                        color: 'black',
                        fontFamily: 'fantasy',

                    }}
                    >Activities</h2>
                </div>

                <div className='col'>
                    <hr style={{ width: '200px', height: '10px', color: '#306832' }} />
                </div>

            </div>

            <div className="row">

                <div className='col col-lg-2 col-sm-2' style={{ backgroundColor: '#306832', padding: '5px' }}>
                    <h2 style={{ color: 'white' }}>Hiking</h2>

                    <p style={{ color: 'white' }}>Explore part of nature like never before</p>
                    <img
                        src={mountain}
                        alt='...'
                        style={{
                            objectFit: 'cover',
                            width: '30px',
                            height: '40px'

                        }}
                    />
                    <button style={{ borderRadius: '9px', margin: '5px', backgroundColor: 'white', color: 'black' }} type="button" className="btn btn-sm">interested</button>
                </div>
                <div className='col' style={{ display: 'inline' }}>
                    <img
                        src={hiking}
                        alt='...'
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%'
                        }}
                    />

                </div>

                <div className='col-lg-2'>
                    .....
                </div>

                <div className='col col-lg-2 col-sm-2' style={{ backgroundColor: '#306832', padding: '5px' }}>
                    <h2 style={{ color: 'white' }}>Zoo</h2>

                    <p style={{ color: 'white' }}>Explore part of nature like never before</p>
                    <img
                        src={lemuer}
                        alt='...'
                        style={{
                            objectFit: 'cover',
                            width: '30px',
                            height: '40px'

                        }}
                    />
                    <button style={{ borderRadius: '9px', margin: '5px', backgroundColor: 'white', color: 'black' }} type="button" className="btn btn-sm">interested</button>
                </div>
                <div className='col' style={{ display: 'inline' }}>
                    <img
                        src={hiking}
                        alt='...'
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%'
                        }}
                    />

                </div>



            </div>

            */}
            


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
                    <Link><i className="fa fa-envelope"></i>    info@marula</Link>

                </div>
                <div className='col'>

                </div>
                <div className='col'>
                    <img
                        src={companyimage}
                        alt='..'
                        style={{ width: '80%', height: '70%', backgroundColor: 'white' }}
                    />
                </div>


            </div>

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
                                    <button
                                        className="small text-muted" type='submit' style={{ border: 'none', backgroundColor: 'white' }}>Forgot password?</button>

                                </form>


                            </div>

                        </div>
                        {
                            /*
                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                            */
                        }

                    </div>
                </div>
            </div>

        </div>
    );


}

export default Landingpage;