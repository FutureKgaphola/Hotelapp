import { Form, useParams } from "react-router-dom";
import LoginDialog from "./LoginDialog";
import NavBar from "./Navbar";
import Footer from "./footer";
import { message } from 'antd';
import companyimage from '../media/hotel.png';
import { useEffect, useState } from "react";
import {collection,onSnapshot,doc,setDoc} from 'firebase/firestore';
import { db } from "../Dbconfig/db";

const Profile = () => {

    const { _id } = useParams();
    const [data, setReservs] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dataError,SetError]=useState({
        errorphone:null,
        errorname:null
    });

useEffect(() => {
    var colRef= collection(db,"Reservations");
    let reservations = [];
    onSnapshot(colRef,(snapshot)=>{
        reservations = [];
        snapshot.forEach((doc)=>{
            if(String(doc.data().ownerId)===String(_id)){
                reservations.push(
                    {id:doc.id , ...doc.data()}
                )
            }
        })  
        setReservs(reservations);
    })

    var document= doc(db,"Users",_id)
    onSnapshot(document,(snapshot)=>{
        setName(snapshot.data().name);
        setPhone(snapshot.data().phone);
    })

},[_id]);

const onUpdateSubmit=(e)=>{
    e.preventDefault();
    
    if (phone.trim().length < 10 || phone.trim().length > 10) {
        SetError({
            errorphone:'Please input a valid phone number of 10 digits.',
            errorname:null
        });
        return;
    }
    
    if (name.trim().length < 1) {
        SetError({
            errorphone:null,
            errorname:'Please input a valid name' 
        });
        return;
    }

    var update = {
        name: name,
        phone:phone
    }

    setDoc(doc(db,'Users',_id.trim()),update,{merge:true}).then(() => {
        const updateperson=document.querySelector('.updateperson');
        updateperson.reset();
        SetError({
            errorphone:null,
            errorname:null 
        });
        message.success('Updated Succesfully.');

    }).catch((err) => {
        message.error(String(err));
    });

}

    return (

        <div className="container" style={{ backgroundColor: 'white', height: '100%' }}>
            <NavBar />
            <section className="">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "0rem" }}>
                                <div className="row g-0">
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            <div className="d-flex align-items-center mb-3 pb-1">

                                                <img src={companyimage} alt={'logo'} style={{ width: "50px", height: "50px" }} />
                                                <span className="h1 fw-bold mb-0">Marula </span>
                                                <strong style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}><span style={{ color: '#306832', fontStyle: 'italic', fontSize: '20px' }}>LIFE STYLE</span></strong>

                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign up for an account</h5>

                                            <Form method="post" onSubmit={(e)=>onUpdateSubmit(e)} className="updateperson">{/*find the function associated with this route. here you must pass the route to this page*/}
                                            <div className="form-outline mb-4">
                                                    <input
                                                        value={name}
                                                        onChange={(e)=>setName(e.target.value)}
                                                        type="text"
                                                        required
                                                        placeholder="Name"
                                                        name="edit_name"
                                                        id="form_name" className="form-control form-control-lg" />
                                                    
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        value={phone}
                                                        onChange={(e)=>setPhone(e.target.value)}
                                                        type="tel"
                                                        maxLength={10}
                                                        required
                                                        placeholder="+27"
                                                        name="edit_phone"
                                                        id="form_phone" className="form-control form-control-lg" />
                                                    
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button type='submit'
                                                        style={{ borderRadius: '9px', margin: '5px', backgroundColor: '#306832', color: 'white' }} className="btn btn-lg">Update</button>
                                                </div>
                                                {dataError && dataError.errorphone && <p>{dataError.errorphone}</p>}
                                                {dataError && dataError.errorname && <p>{dataError.errorname}</p>}

                                            </Form>

                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-5 d-block d-md-block table-wrapper-scroll-y my-custom-scrollbar">
                                        <h3 style={{margin:'5px'}}>Bookings</h3>
                                        <table className="table table-success table-hover table-responsive table table-bordered table-striped mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Client Name</th>
                                                    <th scope="col">Phone</th>
                                                    <th scope="col">Room</th>
                                                    <th scope="col">Booking Date</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data?.map((user)=>(
                                                        <tr key={user.id}>
                                                            <th scope="row">{user.Name}</th>
                                                            <td>{user.Phone}</td>
                                                            <td>{user.RoomBooked}</td>
                                                            <td>{user.bookDate}</td>
                                                        </tr>
                                                        
                                                    ))
                                                    
                                                        
                                                   
                                                }

                                            </tbody>
                                        </table>
                                    </div>

                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <LoginDialog />
        </div>
    );
}

export default Profile;