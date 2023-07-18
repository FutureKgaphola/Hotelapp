import LoginDialog from "./LoginDialog";
import NavBar from "./Navbar";
import Footer from "./footer";
import admin from '../media/admin.jpg';
import RoomsTable from "./RoomsTable";
import { useEffect,useState } from "react";
import {collection,onSnapshot
} from 'firebase/firestore';
import { db } from '../Dbconfig/db';
import AddRoomLDialog from "./AddRoomDialog";
import { useNavigate } from "react-router-dom";
import { AdminRouteProtector } from "../Routeprotector/Protector";


const Bookings = () => {
    const navigate=useNavigate();
    const Goback=()=>{
        navigate('/');
    }
    const [res,setResevations]=useState(false);
    const [maxAvailable,SetmaxAvailable]=useState(0);
    const [maxOccupied,SetmaxOccupied]=useState(0);

    const ShowResevations=()=>
    {
        if(!res){
            setResevations(true);
        }else{
            setResevations(false);
        }
    }

    useEffect(() => {
        AdminRouteProtector();

        let max=0;
        const colRef = collection(db, "Rooms");
        onSnapshot(colRef, (snapshot) => {
            max=0;
            snapshot?.docs.forEach((doc) => {
                max=max+parseInt(doc.data().left);
            });
            SetmaxAvailable(max);
        })

        let maxres=0;
        const col_Ref = collection(db, "Reservations");
        onSnapshot(col_Ref, (snapshot) => {
            maxres=0;
            snapshot?.docs.forEach((doc) => {
                maxres=maxres+1;
            });
            SetmaxOccupied(maxres);
        })
        

    }, [])
    
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
                            <h1 className="text-danger">{maxAvailable}</h1>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-15%', height: '50%', padding: '0', margin: '0', borderRadius: '5px', zIndex: '5', backgroundColor: 'black' }}>
                            <h4 style={{ color: 'white', marginTop: '10%' }}>Rooms available</h4>
                        </div>
                    </div>

                    <div className="row" style={{ padding: '0', margin: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '5px', margin: '0', borderRadius: '5px 5px 0px 0px', backgroundColor: 'whitesmoke' }}>
                            <h1 className="text-success">{maxOccupied}</h1>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-15%', height: '50%', padding: '0', margin: '0', borderRadius: '5px', zIndex: '5', backgroundColor: 'black' }}>
                            <h4 style={{ color: 'white', marginTop: '10%' }}>Rooms occupied</h4>
                        </div>
                    </div>

                </div>
            </div>
                <button onClick={() => Goback()}
                style={{ borderRadius: '9px', margin: '5px', backgroundColor: 'white', color: 'black',fontFamily:'fantasy' }}
                type="button" className="btn btn-sm">Go back Home</button> 

                <button
                data-bs-toggle="modal" data-bs-target="#AddRoomModal"
                style={{ borderRadius: '9px', margin: '5px', backgroundColor: 'white', color: 'black',fontFamily:'fantasy' }}
                type="button" className="btn btn-sm">+Add rooms</button> 
                

                <button onClick={()=>ShowResevations()}
                style={{ borderRadius: '9px', margin: '5px', backgroundColor: 'white', color: 'black',fontFamily:'fantasy' }}
                type="button" className="btn btn-sm">Reservations</button>  

            <RoomsTable res={res}/>

            <Footer />
            <LoginDialog />
            <AddRoomLDialog />

        </div>
    );
}

export default Bookings;