import { Link, useNavigate, useParams } from "react-router-dom";
import LoginDialog from "./LoginDialog";
import hotel_with_background from '../media/hotel_with_background.jpg';
import NavBar from "./Navbar";
import Footer from "./footer";
import { DatePicker, Space, message } from 'antd';
import { useEffect, useState } from "react";
import { db } from '../Dbconfig/db';
import {
    addDoc, collection, onSnapshot, doc, setDoc
} from 'firebase/firestore';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { UserRouteProtector } from "../Routeprotector/Protector";

const { RangePicker } = DatePicker;
const RoomPreview = () => {
    const { _id,Authid } = useParams();
    const [RoomType, SetRoomType] = useState('');
    const [MaxRooms, SetMaxRooms] = useState('0');
    const [MaxBeds, SetMaxBeds] = useState('0');
    const [MaxShowers, SetMaxShowers] = useState('0');
    const [Available, SetAvailable] = useState('no');
    const [RoomImage, SetRoomImage] = useState(null);
    const [RoomName, SetRoomName] = useState(null);
    const [bookDate, SetbookDate] = useState("");
    const [Name, SetName] = useState('');
    const [Phone, SetPhone] = useState('');
    const [Email, SetEmail] = useState('');
    const [cost, Setcost] = useState('');
    const navigate=useNavigate();

    var setDate = (date, datecompined) => {
        if (datecompined[0] !== null && datecompined[1] !== null) {
            if (String(datecompined[0]).trim() && String(datecompined[1]).trim()) {
                SetbookDate("start date: " + datecompined[0] + " end date: " + datecompined[1]);
            }
        }

    }
   
    useEffect(() => {
        UserRouteProtector(); 
        const colRef = doc(db, "Rooms", _id);
        onSnapshot(colRef, (snapshot) => {
            try {
                SetRoomType(snapshot.data().roomtype.trim());
                SetMaxRooms(snapshot.data().left.trim());
                SetMaxBeds((snapshot.data().contents[0].substring(0, (snapshot.data().contents[0]).indexOf("X"))).trim());
                SetMaxShowers((snapshot.data().contents[1].substring(0, (snapshot.data().contents[1]).indexOf("X"))).trim());
                SetAvailable(snapshot.data().isavailable.trim());
                SetRoomImage(snapshot.data().img.trim());
                SetRoomName(snapshot.data().filename.trim());
                Setcost(snapshot.data().cost);

            } catch (error) {
                message.error(String(error));
                window.location.replace("/");
            }
        });

        var document= doc(db,"Users",Authid)
        
            onSnapshot(document,(snapshot)=>{
                try {
                    SetName(snapshot.data().name);
                    SetPhone(snapshot.data().phone);
                    SetEmail(snapshot.data().email);
                } catch (error) {
                
                    message.error(String(error));
                    window.location.replace("/");
                }
            });

    }, [_id,Authid]);
    

    var isAllOK = () => {
        var result = true;
        if (Name.trim() === "") {
            result = false;
        }
        if (Phone.trim() === "") {
            result = false;
        }

        if (Email.trim() === "") {
            result = false;

        } if (bookDate.trim() === "") {
            result = false;
        }
        return result;

    }

    const onsubmit=()=>{

        if(isAllOK())
        {
            var submission = {
                Name: Name,
                Phone: Phone,
                Email: Email,
                bookDate: bookDate,
                RoomBooked: RoomType,
                ownerId: Authid 
            }
            var update = {};
            if (parseInt(MaxRooms) - 1 < 1) {
                update = {
                    left: String(parseInt(MaxRooms) - 1),
                    isavailable: 'no'
                }
            } else {
                update = {
                    left: String(parseInt(MaxRooms) - 1),
                    isavailable: 'yes'
                }
            }

            setDoc(doc(db, 'Rooms', _id.trim()), update, { merge: true }).then(() => {
                const colRef = collection(db, "Reservations");
                addDoc(colRef, submission).then(() => {
                    const selfbooking = document.querySelector('.selfbooking');
                    selfbooking.reset();
                    message.success('Succesfully Booked a room.');
                    
                    SetName('');
                    SetPhone('');
                    SetEmail('');
                    SetbookDate('');
                    setTimeout(() => {
                        navigate('/');  
                    }, 3000);
                    
                }).catch((err) => {
                    message.error(String(err));
                })
            }).catch((err) => {
                message.error(String(err));
            });

        } else {
            message.error("Please select/re-select booking dates(s)");
        }
    }
    return (
        <div className="container" style={{ backgroundColor: 'white', height: '100%' }}>
            <NavBar />


            <div className="row" style={{ margin: '5px', padding: '0', borderRadius: "0px 5px 5px 0px", backgroundColor: '#306832' }}>
                <div className="col" style={{ margin: '5px' }}>
                    <div className="card-body">
                    <Link to={'/'} style={{margin:'3px'}}><span className="badge bg-dark text-light">{"<- Go Back"}</span></Link>
                        <strong style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}><span style={{ color: '#306832', fontStyle: 'italic', fontSize: '20px' }}>{RoomType}</span></strong>
                        <div style={{ background: 'rgba(51, 49, 49, 0.46)', borderRadius: '5px', padding: '5px' }}>
                            <ul>
                                <li style={{ color: 'white' }} >{MaxBeds+" X Bed(s)"}</li>
                                <li style={{ color: 'white' }} >{MaxShowers+" X Shower(s)"}</li>

                            </ul>
                            <span style={{margin:'5px'}} className="badge rounded-pill bg-light text-dark">{MaxRooms+" Rooms available"}</span>
                        </div>

                        <form className="selfbooking">
                            <Space direction="vertical" size={10}>
                                        <RangePicker
                                            aria-required
                                            onCalendarChange={(date, datecompined) => setDate(date, datecompined)} />
                            </Space>

                            {Available && MaxRooms && Available!=='no' && MaxRooms!=='0' && Authid && <button onClick={()=>onsubmit()} style={{ borderRadius: '9px', margin: '5px', width: '65px', backgroundColor: 'white', borderColor: 'black', color: 'black' }} type="button" className="explore btn btn-sm">Book</button>}

                        </form>
                        
                        <span className="badge bg-dark">R{cost+" per night"}</span>
                    </div>
                    <span style={{margin:'5px'}} className="badge rounded-pill bg-warning text-dark">Free WiFi</span>
                    <span style={{margin:'5px'}} className="badge rounded-pill bg-warning text-dark">Free parking</span>
                    <span style={{margin:'5px'}} className="badge rounded-pill bg-warning text-dark">Smoking Area</span>
                    <span style={{margin:'5px'}} className="badge rounded-pill bg-warning text-dark">24-hour front desk</span>
                    <span style={{margin:'5px'}} className="badge rounded-pill bg-light text-dark">Other services are negotiatable at front desk</span>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                <LazyLoadImage
                    key={RoomName}
                    placeholderSrc={hotel_with_background}
                    effect='blur'
                    visibleByDefault={RoomImage === hotel_with_background}
                    style={{ width: '100%', objectFit: 'cover', height: "100%", borderRadius: "0px 5px 5px 0px" }}
                    alt={'Room_image'}
                    height={"100%"}
                    src={RoomImage} 
                    width={"100%"} />
                </div>

            </div>

            <Footer />
            <LoginDialog />
        </div>


    );
}

export default RoomPreview;