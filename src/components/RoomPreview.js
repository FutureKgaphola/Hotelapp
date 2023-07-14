import { useParams } from "react-router-dom";
import LoginDialog from "./LoginDialog";
import NavBar from "./Navbar";
import Footer from "./footer";
import { useEffect, useState } from "react";
import { db } from '../Dbconfig/db';
import {onSnapshot,
    doc,
    setDoc
} from 'firebase/firestore';
import { message } from 'antd';

const RoomPreview = () => {
    const {_id}=useParams();
    const [RoomType,SetRoomType]=useState('');
    const [MaxRooms,SetMaxRooms]=useState('');
    const [MaxBeds,SetMaxBeds]=useState('');
    const [MaxShowers,SetMaxShowers]=useState('');
    const [Available,SetAvailable]=useState('no');
    const [RoomImage,SetRoomImage]=useState(null);
    const [RoomName,SetRoomName]=useState(null);

    useEffect(()=>{
        const colRef= doc(db,"Rooms",_id);
    onSnapshot(colRef,(snapshot)=>{
            try {
                SetRoomType(snapshot.data().roomtype.trim());
                SetMaxRooms(snapshot.data().left.trim());
                SetMaxBeds((snapshot.data().contents[0].substring(0,(snapshot.data().contents[0]).indexOf("X"))).trim());
                SetMaxShowers((snapshot.data().contents[1].substring(0,(snapshot.data().contents[1]).indexOf("X"))).trim());
                SetAvailable(snapshot.data().isavailable.trim());
                SetRoomImage(snapshot.data().img.trim());
                SetRoomName(snapshot.data().filename.trim());
                
            } catch (error) {
                message.error(String(error));
            }

        })
        
    },[_id]);
    return ( 
    <div className="container" style={{ backgroundColor: 'white', height: '100%' }}>
         <NavBar />

         <Footer />
         <LoginDialog />
    </div>


     );
}
 
export default RoomPreview;