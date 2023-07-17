import { db } from '../Dbconfig/db';
import {
    onSnapshot,
    doc,
    setDoc
} from 'firebase/firestore';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import companyimage from '../media/hotel.png';
import NavBar from './Navbar';
import Footer from './footer';
import LoginDialog from './LoginDialog';
import { useNavigate, useParams } from 'react-router-dom';
import { getStorage, ref, deleteObject, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';

const Update = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [RoomType, SetRoomType] = useState('');
    const [MaxRooms, SetMaxRooms] = useState('');
    const [MaxBeds, SetMaxBeds] = useState('');
    const [MaxShowers, SetMaxShowers] = useState('');
    const [Available, SetAvailable] = useState('no');
    const [RoomImage, SetRoomImage] = useState(null);
    const [imageupload, setimageupload] = useState(null);
    const [RoomName, SetRoomName] = useState(null);
    const [Cost, SetCost] = useState('0');

    const setpickedImage = (file) => {
        if (file == null) return;

        const url = URL.createObjectURL(file);
        SetRoomImage(url);
        setimageupload(file);
    }

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
                SetRoomName(snapshot.data().filename.trim());
                SetCost(snapshot.data().cost.trim());

            } catch (error) {
                message.error(String(error));
            }
        });

    }, [_id]);


    const ischecked = (event) => {

        if (String(Available) === "no" && !event.target.hasAttribute('checked')) {
            SetAvailable('yes');

            event.target.setAttribute('checked', '');
        } else {
            SetAvailable('no');
            event.target.removeAttribute('checked');
        }
    }

    var isAllOK = () => {
        var result = true;
        if (RoomType.trim() === null) {
            result = false;
        }
        if (MaxRooms.trim() === null) {
            result = false;
        }

        if (MaxBeds.trim() === null) {
            result = false;

        } if (MaxShowers.trim() === null) {
            result = false;
        }
        if (Cost.trim() === "0" || Cost.trim() === "") {
            result = false;
        }
        return result;

    }
    const Goback = () => {
        navigate('/Bookings');
    }

    const AddRoom = (event) => {
        event.preventDefault();

        if (imageupload !== null && RoomImage !== null) {
            //remove image then upload new one it again n get url n name
            const storage = getStorage();
            const desertRef = ref(storage, `Hotels/${RoomName.trim()}`);
            message.info('Attempting to update room. this may take some time please wait....', 4);
            deleteObject(desertRef).then(() => {

                var filename = imageupload.name + v4();
                var filepath = `Hotels/${filename}`;
                const imageRef = ref(storage, filepath);
                uploadBytes(imageRef, imageupload).then(() => {
                    getDownloadURL(ref(storage, filepath)).then((url) => {
                        var update = {}
                        if (String(url) !== null && String(filename) !== null) {
                            update = {
                                roomtype: RoomType,
                                contents: [MaxBeds + ' X Bed(s)', MaxShowers + ' X Shower(s)'],
                                isavailable: Available,
                                left: MaxRooms,
                                img: url,
                                filename: filename,
                                cost: Cost.replace(",", ".")
                            }
                        } else {
                            update = {
                                roomtype: RoomType,
                                contents: [MaxBeds + ' X Bed(s)', MaxShowers + ' X Shower(s)'],
                                isavailable: Available,
                                left: MaxRooms,
                                cost: Cost.replace(",", ".")
                            }
                        }

                        if (isAllOK()) {

                            setDoc(doc(db, 'Rooms', _id.trim()), update, { merge: true }).then(() => {
                                const updateroom = document.querySelector('.updateroom');
                                updateroom.reset();
                                SetRoomType('');
                                SetMaxRooms('');
                                SetMaxBeds('');
                                SetMaxShowers('');
                                SetAvailable('');
                                SetCost('0');
                                navigate('/Bookings');
                                message.success('Updated Succesfully.');


                            }).catch((err) => {
                                message.error(String(err));
                            });

                        } else {
                            message.error("Some fields did not meet the requirement(s)");
                        }

                    }).catch((err) => {
                        message.error(String(err));
                    });

                }).catch((err) => {
                    message.error(String(err));
                });

            }).catch((error) => {
                message.error(String(error));
                window.location.reload(true);
            });
        } else {
            var update = {}
            update = {
                roomtype: RoomType,
                contents: [MaxBeds + ' X Bed(s)', MaxShowers + ' X Shower(s)'],
                isavailable: Available,
                left: MaxRooms,
                cost: Cost.replace(",", ".")
            }
            if (isAllOK()) {

                setDoc(doc(db, 'Rooms', _id.trim()), update, { merge: true }).then(() => {
                    const updateroom = document.querySelector('.updateroom');
                    updateroom.reset();
                    SetRoomType('');
                    SetMaxRooms('');
                    SetMaxBeds('');
                    SetMaxShowers('');
                    SetAvailable('');
                    SetCost('0');
                    navigate('/Bookings');
                    message.success('Updated Succesfully.');

                }).catch((err) => {
                    message.error(String(err));
                });

            } else {
                message.error("Some fields did not meet the requirement(s)");
            }
        }
    }

    return (

        <div className="container" style={{ backgroundColor: 'white', height: '100%' }}>
            <NavBar />
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <img src={companyimage} alt={'logo'} style={{ width: "50px", height: "50px" }} />
                        <h1 className="modal-title fs-5" id="AddRoomModalLabel">Updating a rooms</h1>
                        <button onClick={() => Goback()}
                            style={{ borderRadius: '9px', margin: '5px', backgroundColor: 'white', color: 'black', fontFamily: 'fantasy' }}
                            type="button" className="btn btn-sm">Go back</button>
                    </div>
                    <div className="modal-body">

                        <div className="card-body p-4 p-lg-5 text-black">

                            <div className="d-flex align-items-center mb-3 pb-1">

                                <img src={RoomImage} alt={'room'} style={{ width: "100%", height: "300px", borderRadius: '5px' }} />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Select Room image</label>
                                <input onChange={(event) => setpickedImage(event.target.files[0])} className="form-control" type="file" id="formFile" />
                            </div>

                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Updating a room of your system</h5>

                            <form className='updateroom'>
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        required
                                        value={RoomType}
                                        onChange={(e) => SetRoomType(e.target.value)}
                                        name="editroomtype"
                                        placeholder='Room type'
                                        className="form-control form-control-lg" />
                                </div>
                                <label style={{ color: 'black' }} htmlFor="editleft">Maximum no. of rooms</label>
                                <div className="form-outline mb-4">
                                    <input
                                        value={MaxRooms}
                                        onChange={(e) => SetMaxRooms(e.target.value)}
                                        type="number"
                                        required
                                        id="editleft"
                                        name="editleft"
                                        placeholder='Maximum no. of rooms'
                                        className="form-control form-control-lg" />
                                </div>
                                <label style={{ color: 'black' }} htmlFor="beds">Maximum no. of beds in each room</label>
                                <div className="form-outline mb-4">
                                    <input
                                        value={MaxBeds}
                                        onChange={(e) => SetMaxBeds(e.target.value)}
                                        type="number"
                                        required
                                        id="beds"
                                        name="beds"
                                        placeholder='Maximum no. of beds (per/room)'
                                        className="form-control form-control-lg" />
                                </div>
                                <label style={{ color: 'black' }} htmlFor="showers">Maximum no. of showers in each room</label>
                                <div className="form-outline mb-4">
                                    <input
                                        value={MaxShowers}
                                        onChange={(e) => SetMaxShowers(e.target.value)}
                                        type="number"
                                        required
                                        id="showers"
                                        name="showers"
                                        placeholder='Maximum no. of showers (per/room)'
                                        className="form-control form-control-lg" />
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        value={Cost}
                                        onChange={(e) => SetCost(e.target.value)}
                                        type="text"
                                        required
                                        id="cost"
                                        name="cost"
                                        placeholder='Cost per night'
                                        className="form-control form-control-lg" />
                                </div>

                                <div className="form-check form-switch">
                                    <input
                                        onChange={(e) => ischecked(e)}
                                        className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Add and make available : {Available}</label>
                                </div>

                                <div className="pt-1 mb-4">
                                    <button
                                        onClick={(e) => AddRoom(e)}
                                        style={{ borderRadius: '9px', margin: '5px', backgroundColor: '#306832', color: 'white' }} type="button" data-bs-dismiss="modal" className="btn btn-lg">Update Room</button>
                                </div>

                            </form>

                        </div>

                    </div>

                </div>
            </div>
            <Footer />
            <LoginDialog />
        </div>
    );
}

export default Update;