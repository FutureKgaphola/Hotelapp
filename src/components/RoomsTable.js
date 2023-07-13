import { useEffect, useState } from "react";
import bedimage from '../media/restbed.jpg';
import { DatePicker, Space, message } from 'antd';
import { db } from '../Dbconfig/db';
import { handleDelete } from '../Handlers/Handles';
import {
    addDoc, collection, onSnapshot, doc, setDoc
} from 'firebase/firestore';
import searchicon from '../media/search.png';
import { Link } from "react-router-dom";


const { RangePicker } = DatePicker;

const RoomsTable = () => {
    const [Name, SetName] = useState('');
    const [Phone, SetPhone] = useState('');
    const [Email, SetEmail] = useState('');
    const [bookDate, SetbookDate] = useState('');
    var [chalets, setchalet] = useState([]);
    const [search, setsearch] = useState('');


   
    const [book, setBook] = useState({
        isform: false,
        item: null
    });
    var setDate = (date, datecompined) => {

        if (String(datecompined[0]).trim() && String(datecompined[1]).trim()) {
            SetbookDate("start date: " + datecompined[0] + " end date:" + datecompined[1]);
        }
    }
    var Goback=()=>{
        setBook({
            isform: false,
            item: null
        });
    }

    var isAllOK = () => {
        var result = true;
        if (Name.trim() === null) {
            result = false;
        }
        if (Phone.trim() === null) {
            result = false;
        }

        if (Email.trim() === null) {
            result = false;

        } if (bookDate.trim() === null) {
            result = false;
        }
        return result;

    }
    const bookroom = (e) => {

        e.preventDefault();
        var submission = {
            Name: Name,
            Phone: Phone,
            Email: Email,
            bookDate: bookDate,
            RoomBooked: book.item.roomtype
        }
        var update = {};
        if (parseInt(book.item.left) - 1 < 1) {
            update = {
                left: String(parseInt(book.item.left) - 1),
                isavailable: 'no'
            }
        } else {
            update = {
                left: String(parseInt(book.item.left) - 1),
                isavailable: 'yes'
            }
        }


        if (isAllOK()) {
            setDoc(doc(db, 'Rooms', book.item.id.trim()), update, { merge: true }).then(() => {
                const colRef = collection(db, "Reservations");
                addDoc(colRef, submission).then(() => {
                    const bookingform = document.querySelector('.bookingform');
                    bookingform.reset();
                    message.success('Succesfully Booked a room.');
                    setBook({
                        isform: false,
                        item: null
                    });
                    SetName('');
                    SetPhone('');
                    SetEmail('');
                    SetbookDate('');
                }).catch((err) => {
                    message.error(String(err));
                })
            }).catch((err) => {
                message.error(String(err));
            })

        } else {
            message.error("Some fields did not meet the requirement(s)");
        }

    }

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
            });

        })


    }, [])

    return (
        <div>

            {
                !book.isform ?
                    <div>
                        <div style={{ display: 'flex', padding: '2px', backgroundColor: 'black', borderRadius: '20px', margin: '5px' }}>
                            <img src={searchicon} height={'25px'} style={{ marginLeft: '5px', alignSelf: 'center' }} alt="search" />
                            <input value={search} onChange={(e) => setsearch(e.target.value)} style={{ marginLeft: '6px', margin: '15px' }} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        </div>
                        <table className="table table-dark table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Room Name</th>
                                    <th scope="col">Availability</th>
                                    <th scope="col">No. available</th>
                                    <th scope="col">Set booking</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    chalets.filter((value) => {
                                        return search.toLowerCase() === '' ? value : value.roomtype.toLowerCase().includes(search);
                                    }).map((item) => (
                                        <tr key={item.id}>
                                            <th scope="row">{item.roomtype}</th>
                                            <td>{item.isavailable}</td>
                                            <td>{item.left}</td>

                                            <td>
                                                {
                                                    item.isavailable === "yes" &&
                                                    <button onClick={() => setBook({
                                                        isform: true,
                                                        item: item
                                                    })}
                                                        className="btn btn-success">Book</button>
                                                }


                                            </td>

                                            <td>
                                            <Link 
                                            to={`/Update/${item.id}`}
                                            className="btn btn-warning">Edit</Link>


                                            </td>

                                            <td>
                                                {
                                                    item.isavailable === "yes" &&
                                                    <button 
                                                    onClick={() => handleDelete(item.id,item.filename)}
                                                        className="btn btn-danger">Delete</button>
                                                }


                                            </td>


                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>

                    </div>

                    :
                    <div className="row" style={{ padding: '5%' }}>
                        <div className="col-lg-6 col-sm-0">
                            <div className="row" style={{
                                backgroundImage: `url(${bedimage})`,
                                backgroundSize: 'cover',
                                height: '380px',
                                backgroundRepeat: 'no-repeat',
                            }}>

                                <div className="row d-flex align-items-center"
                                >
                                    <div className="col-lg-6 col-md-6 col-sm-0">
                                        <div className="row"
                                            style={{
                                                alignSelf: 'center',
                                                margin: '0.5%',

                                                background: 'rgba(51, 49, 49, 0.46)',
                                            }}>
                                            <div className="col-lg-12">
                                                <span style={{ color: 'white', fontFamily: 'cursive', fontSize: "65px" }}>Marula bookings </span>
                                                <strong style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}><span style={{ color: '#306832', fontStyle: 'italic', fontSize: '20px' }}>LIFE STYLE</span></strong>

                                            </div>
                                            <div className="col-col-lg-12">
                                                <h4 style={{ color: 'white' }}>let's get your details</h4>
                                                <h4 style={{ color: 'white' }}> and get an experience</h4>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col">
                                        ...
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12" style={{ backgroundColor: 'black', padding: '8px', borderRadius: '5px' }}>
                            <form className="bookingform">
                                <div className="form-group">
                                    <label style={{ color: 'white' }} htmlFor="exampleInputEmail1">Name and Surname</label>
                                    <input
                                        value={Name}
                                        onChange={(e) => SetName(e.target.value)}
                                        type="text" className="form-control" id="name" name="_name" aria-describedby="emailHelp" placeholder="Name and Surname" />
                                    <small style={{ color: 'white' }} className="form-text text-muted">We'll never share your Name.</small>
                                </div>
                                <div className="form-group">
                                    <label style={{ color: 'white' }} htmlFor="exampleInputEmail1">Email address</label>
                                    <input
                                        value={Email}
                                        name="_email"
                                        onChange={(e) => SetEmail(e.target.value)}
                                        type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <small style={{ color: 'white' }} className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label style={{ color: 'white' }} htmlFor="exampleInputEmail1">Phone</label>
                                    <input
                                        value={Phone}
                                        name="_phone"
                                        onChange={(e) => SetPhone(e.target.value)}
                                        type="tel" className="form-control" id="phone" aria-describedby="emailHelp" placeholder="Phone" />
                                    <small style={{ color: 'white' }} className="form-text text-muted">We'll never share your phone number.</small>
                                </div>
                                <Space direction="vertical" size={12}>
                                    <RangePicker
                                        onCalendarChange={(date, datecompined) => setDate(date, datecompined)} />
                                </Space>

                                <button onClick={(e) => bookroom(e)}
                                    style={{ borderRadius: '9px', margin: '5px', backgroundColor: '#306832', color: 'white' }}
                                    type="button" className="btn btn-sm">book</button>

                                <button onClick={() => Goback()}
                                    style={{ borderRadius: '9px', margin: '5px', backgroundColor: 'white', color: 'black',fontFamily:'fantasy' }}
                                    type="button" className="btn btn-sm">Go back</button>

                            </form>
                        </div>

                    </div>

            }

        </div>



    );
}

export default RoomsTable;