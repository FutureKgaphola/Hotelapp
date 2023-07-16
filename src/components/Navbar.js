import { Link, useNavigate } from 'react-router-dom';
import companyimage from '../media/hotel.png';
import MoreButtons from './MoreButtons';
import { message } from 'antd';
import { signInWithEmailAndPassword,getAuth } from "firebase/auth";
import { useEffect, useState } from 'react';


const auth=getAuth();
export function onLogin(event,email,password,setpassword,setEmail){
    event.preventDefault();
    
    if(String(email)!=="" && String(password)!=="")
    {
        signInWithEmailAndPassword(auth,email,password).then((res)=>
        {
            event.target.innerHTML="welcome, "+res.user.email;
            event.target.disabled=true;
            setpassword('');
            setEmail('');
            
            setTimeout(() => {
                event.target.disabled=false;
                event.target.innerHTML="Login";
            }, 2000);
            //event.target.setAttribute('data-bs-dismiss', 'modal');
        }).catch((err)=>{
            setpassword('');
            event.target.innerHTML=err;
            setTimeout(() => {
                event.target.disabled=false;
                event.target.innerHTML="Login";
            }, 2000);
            
        });
    }
}

export function sign_out(props){
    
    auth.signOut().catch((err) => {

        message.error(String(err));
    });
    props.props(null);
}


const NavBar = () => {
    const navigate=useNavigate();

    const [isAuth,setAuth]=useState({
        authEmail:null,
        authId:null,
    });

    useEffect(() => {
        auth.onAuthStateChanged(user=>{
            if(user)
            {
                try {
                    setAuth({
                        authEmail:user.email,
                        authId:user.uid,
                    });

                } catch (error) {
                    console.log(error);
                }
            }
        })

    }, []);

    var goHome=()=>{
        navigate('/');
    }


    return (
        <div className="row" style={{ height: '10%',backgroundColor:'whitesmoke' }}>
            <div className="col" style={{ textAlign: 'left'}}>
                <img src={companyimage}
                onClick={()=>goHome()}
                    alt='..'
                    width={"65px"}
                    height={"65px"} />
            </div>

            <div id='logindiv' className="col" style={{ textAlign: 'right' }}>
                {isAuth && isAuth.authId ? <MoreButtons props={setAuth} isAuth={isAuth} /> : <button style={{ borderRadius: '9px', margin: '5px', borderColor: 'black', color: 'black' }} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm">sign in</button>}
                
                <Link to={'/Register'} style={{ borderRadius: '9px', margin: '5px', backgroundColor: '#306832', color: 'white' }} type="button" className="btn btn-sm">sign up</Link>
            </div>
        </div>
    );
}

export default NavBar;