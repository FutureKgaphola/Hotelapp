import { db } from '../Dbconfig/db';
import {
    addDoc, collection
} from 'firebase/firestore';
import { message } from 'antd';
import { useState } from 'react';
import companyimage from '../media/hotel.png';
import {getDownloadURL, ref,uploadBytes} from 'firebase/storage';
import {storage} from "../Dbconfig/db";
import { v4 } from 'uuid';

const AddRoomLDialog = () => {
    const [imageupload,setimageupload]=useState(null);
    const [RoomType,SetRoomType]=useState('');
    const [MaxRooms,SetMaxRooms]=useState('');
    const [MaxBeds,SetMaxBeds]=useState('');
    const [MaxShowers,SetMaxShowers]=useState('');
    const [Available,SetAvailable]=useState('no');
    const [isAtribute,SetAtributeTarget]=useState(null);
    const uploadImage=(event)=>{
        if(imageupload==null) return;
        var filename=imageupload.name+v4();
        var filepath=`Hotels/${filename}`;
        const imageRef=ref(storage,filepath);
        message.info('Attempting to add you room. this may take some time please wait....',4);
        uploadBytes(imageRef,imageupload).then(()=>{
            
            getDownloadURL(ref(storage,filepath)).then((url)=>{
        
                if (isAllOK()) {
                    var submission = {
                        roomtype: RoomType,
                        contents:[MaxBeds+' X Bed(s)', MaxShowers+' X Shower(s)'] ,
                        isavailable: Available,
                        left: MaxRooms,
                        img:url,
                        filename:filename
                    }
                    const colRef = collection(db, "Rooms");
                        addDoc(colRef, submission).then(() => {
                            const addroom = document.querySelector('.addroom');
                            addroom.reset();
                            message.success('Succesfully created a room.');
                            event.target.setAttribute('bs-dismiss', 'modal');
                            SetRoomType('');
                            SetMaxRooms('');
                            SetMaxBeds('');
                            SetMaxShowers('');
                            SetAvailable('no');
                            setimageupload(null);
                            isAtribute.target.removeAttribute('checked');
        
                        }).catch((err) => {
                            message.error(String(err));
                        })
        
                } else {
                    message.error("Some fields did not meet the requirement(s)");
                } 
            }).catch((err)=>{
                message.error(String(err));
            })
            
        }).catch((err)=>{
            message.error(String(err));
        })

    }

    const ischecked=(event)=>{
        SetAtributeTarget(event);
        
        if(String(Available)==="no" && !event.target.hasAttribute('checked'))
        {
            SetAvailable('yes');
            
            event.target.setAttribute('checked', '');
        }else{
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

        } 
        if (MaxShowers.trim() === null) {
            result = false;
        }
        
        return result;

    }

    const AddRoom =(event)=>{
        event.preventDefault();
        uploadImage(event);
    }

    return (
        <div className="modal fade" id="AddRoomModal" tabIndex="-1" aria-labelledby="AddRoomModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="AddRoomModalLabel">Adding rooms</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div className="card-body p-4 p-lg-5 text-black">

                            <div className="d-flex align-items-center mb-3 pb-1">

                                <img src={companyimage} alt={'logo'} style={{ width: "50px", height: "50px" }} />
                                <span className="h1 fw-bold mb-0">Marula </span>
                                <strong style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}><span style={{ color: '#306832', fontStyle: 'italic', fontSize: '20px' }}>LIFE STYLE</span></strong>
                            </div>

                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Add a room into your system</h5>

                            <form className='addroom'>
                                <div className="form-outline mb-4">
                                    <input   
                                        type="text"
                                        required
                                        onChange={(e)=>SetRoomType(e.target.value)}
                                        name="editroomtype"
                                        placeholder='Room type'
                                        className="form-control form-control-lg" />
                                </div>
                                <label style={{ color: 'black' }} htmlFor="editleft">Maximum no. of rooms</label>
                                <div className="form-outline mb-4">
                                    <input
                                        onChange={(e)=>SetMaxRooms(e.target.value)}
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
                                        onChange={(e)=>SetMaxBeds(e.target.value)}
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
                                        onChange={(e)=>SetMaxShowers(e.target.value)}
                                        type="number"
                                        required
                                        id="showers"
                                        name="showers"
                                        placeholder='Maximum no. of showers (per/room)'
                                        className="form-control form-control-lg" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label">Default file input example</label>
                                    <input onChange={(event)=>setimageupload(event.target.files[0])} className="form-control" type="file" id="formFile"/>
                                </div>

                                <div className="form-check form-switch">
                                <input
                                onChange={(e)=>ischecked(e)}
                                className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Add and make available : {Available}</label>
                                </div>
     
                                <div className="pt-1 mb-4">
                                    <button 
                                    onClick={(e)=>AddRoom(e)}
                                        style={{ borderRadius: '9px', margin: '5px', backgroundColor: '#306832', color: 'white' }} type="button" data-bs-dismiss="modal" className="btn btn-lg">Add Room</button>
                                </div>


                            </form>

                        </div>

                    </div>


                </div>
            </div>
        </div>
    );
}

export default AddRoomLDialog;