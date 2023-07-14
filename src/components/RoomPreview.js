import { useParams } from "react-router-dom";
import LoginDialog from "./LoginDialog";
import NavBar from "./Navbar";
import Footer from "./footer";
import { useEffect, useState } from "react";
import { db } from '../Dbconfig/db';
import {
    onSnapshot,
    doc
} from 'firebase/firestore';
import { message } from 'antd';

const RoomPreview = () => {
    const { _id } = useParams();
    const [RoomType, SetRoomType] = useState('');
    const [MaxRooms, SetMaxRooms] = useState('0');
    const [MaxBeds, SetMaxBeds] = useState('');
    const [MaxShowers, SetMaxShowers] = useState('');
    const [Available, SetAvailable] = useState('no');
    const [RoomImage, SetRoomImage] = useState(null);
    //const [RoomName, SetRoomName] = useState(null);
    const [cost, Setcost] = useState('');

    useEffect(() => {
        const colRef = doc(db, "Rooms", _id);
        onSnapshot(colRef, (snapshot) => {
            try {
                SetRoomType(snapshot.data().roomtype.trim());
                SetMaxRooms(snapshot.data().left.trim());
                SetMaxBeds((snapshot.data().contents[0].substring(0, (snapshot.data().contents[0]).indexOf("X"))).trim());
                SetMaxShowers((snapshot.data().contents[1].substring(0, (snapshot.data().contents[1]).indexOf("X"))).trim());
                SetAvailable(snapshot.data().isavailable.trim());
                SetRoomImage(snapshot.data().img.trim());
                //SetRoomName(snapshot.data().filename.trim());
                Setcost(snapshot.data().cost);

            } catch (error) {
                message.error(String(error));
            }

        })

    }, [_id]);
    return (
        <div className="container" style={{ backgroundColor: 'white', height: '100%' }}>
            <NavBar />


            <div className="row" style={{ margin: '5px', padding: '0', borderRadius: "0px 5px 5px 0px", backgroundColor: '#306832' }}>
                <div className="col" style={{ margin: '5px' }}>
                    <div className="card-body">
                        <strong style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}><span style={{ color: '#306832', fontStyle: 'italic', fontSize: '20px' }}>{RoomType}</span></strong>
                        <div style={{ background: 'rgba(51, 49, 49, 0.46)', borderRadius: '5px', padding: '5px' }}>
                            <ul>
                                <li style={{ color: 'white' }} >{MaxBeds+" X Bed(s)"}</li>
                                <li style={{ color: 'white' }} >{MaxShowers+" X Shower(s)"}</li>

                            </ul>
                            <span style={{margin:'5px'}} class="badge rounded-pill bg-light text-dark">{MaxRooms+" Rooms available"}</span>
                        </div>

                        {Available && <button style={{ borderRadius: '9px', margin: '5px', width: '65px', backgroundColor: 'white', borderColor: 'black', color: 'black' }} type="button" className="explore btn btn-sm">Book</button>}
                        <span class="badge bg-dark">R{cost}</span>
                    </div>
                    <span style={{margin:'5px'}} class="badge rounded-pill bg-warning text-dark">Free WiFi</span>
                    <span style={{margin:'5px'}} class="badge rounded-pill bg-warning text-dark">Free parking</span>
                    <span style={{margin:'5px'}} class="badge rounded-pill bg-warning text-dark">Smoking Area</span>
                    <span style={{margin:'5px'}} class="badge rounded-pill bg-warning text-dark">24-hour front desk</span>
                    <span style={{margin:'5px'}} class="badge rounded-pill bg-light text-dark">Other services are negotiatable at front desk</span>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                    <img style={{ width: '100%', objectFit: 'cover', height: "100%", borderRadius: "0px 5px 5px 0px" }} src={RoomImage} alt="Card cap" />
                </div>

            </div>

            <Footer />
            <LoginDialog />
        </div>


    );
}

export default RoomPreview;