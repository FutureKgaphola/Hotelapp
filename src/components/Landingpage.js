
import bedimage from '../media/restbed.jpg';
import searchicon from '../media/search.png';
import hotel_with_background from '../media/hotel_with_background.jpg';
import { onSnapshot, collection } from "firebase/firestore";
import { db } from '../Dbconfig/db';
import { useEffect, useState } from 'react';
import NavBar from './Navbar';
import Skeleton from './skeleton';
import Footer from './footer';
import LoginDialog from './LoginDialog';
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const Landingpage = () => {

    var [chalets, setchalet] = useState([]);
    var [isAdminEmail,setAuthEmail]=useState(null);
    var [Authid,setAuthid]=useState(null);
    var [isLoading, setisLoading] = useState(true);
    const [search, setsearch] = useState('');

    useEffect(() => {
        const colRef = collection(db, "Rooms");
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

            const auth=getAuth();
            
            auth.onAuthStateChanged(user=>{
                if(!user)
                {
                    setAuthEmail(null);
                    setAuthid(null);
                }else if(sessionStorage.getItem("id")===user.uid){
                    setAuthEmail(user.email);
                    setAuthid(user.uid);
                }else{
                    setAuthEmail(null);
                    setAuthid(null);
                }
                
            })
        })

    }, []);


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
                                
                                <span data-bs-toggle="modal" data-bs-target="#exampleModal" style={{margin:'5px'}} className="badge bg-success"><i className='fa fa-user-circle' style={{fontSize:'20px',color:'white',paddingRight:'3px'}}></i>{isAdminEmail}</span>
                            </div>

                        </div>
                    </div>
                    <div className="col">
                        .
                    </div>
                </div>

            </div>


            <div className="row" style={{ display: 'inline', padding: '5px' }}>
                <h2 style={{

                    color: 'black',
                    fontFamily: 'fantasy',
                    textDecoration: 'underline',
                    textDecorationColor: '#306832'
                }}
                >HOTELS</h2>
                <div style={{ display: 'flex', padding: '2px', backgroundColor: '#306832', borderRadius: '20px' }}>
                    <img src={searchicon} height={'25px'} style={{ marginLeft: '5px', alignSelf: 'center' }} alt="search" />
                    <input style={{ marginLeft: '6px', margin: '18px' }} value={search} onChange={(e) => setsearch(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                </div>
                
            </div>

            <div className="container row">

                {
                    !isLoading &&

                        chalets ?
                        chalets.filter((value) => {
                            return search.toLowerCase() === '' ? value : value.roomtype.toLowerCase().includes(search);
                        }).map((item) => (

                            <div key={item.id} className="col col-lg-3" style={{ display: 'flex', margin: '5px', padding: '0', borderRadius: "0px 5px 5px 0px", backgroundColor: '#306832' }}>
                                <div className="col" style={{ margin: '5px' }}>
                                    <div className="card-body">
                                        <strong style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}><span style={{ color: '#306832', fontStyle: 'italic', fontSize: '20px' }}>{item.roomtype}</span></strong>
                                        <div style={{ background: 'rgba(51, 49, 49, 0.46)', borderRadius: '5px', padding: '5px' }}>
                                            <ul>
                                                <li style={{ color: 'white' }} >{item.contents[0]}</li>
                                                <li style={{ color: 'white' }} >{item.contents[1]}</li>
                                                
                                            </ul>
                                        </div>

                                        {
                                            isAdminEmail && isAdminEmail.toLowerCase()!=='admin@marula.co.za' && <Link to={`/RoomsPreview/${item.id}/${Authid}`} style={{ borderRadius: '9px', margin: '5px', width: '65px', backgroundColor: 'white', borderColor: 'black', color: 'black' }} type="button" className="explore btn btn-sm">explore</Link>
                                        }
                                        
                                        <span className="badge bg-dark">{"R"+item.cost+" per night"}</span>
                                    </div>
                                </div>
                                <div className="col">
                                <LazyLoadImage
                                    key={item.filename}
                                    placeholderSrc={hotel_with_background}
                                    visibleByDefault={item.img === hotel_with_background}
                                    effect='blur'
                                    style={{ width: '100%', objectFit: 'cover', height: "100%", borderRadius: "0px 5px 5px 0px" }}
                                    alt={'Room_image'}
                                    height={"100%"}
                                    src={item.img} 
                                    width={"100%"} />

                                </div>

                            </div>
                        )) : <Skeleton />
                }

            </div>

            <Footer />

            <LoginDialog />

        </div>
    );


}

export default Landingpage;