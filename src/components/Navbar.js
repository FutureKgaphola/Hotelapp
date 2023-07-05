import { Link } from 'react-router-dom';
import companyimage from '../media/hotel.png';
import MoreButtons from './MoreButtons';
import { signInWithEmailAndPassword,getAuth } from "firebase/auth";

const auth=getAuth();
export function onLogin(event,email,password,setpassword,setEmail){
    event.preventDefault();
    
    if(String(email)!=="" && String(password)!=="")
    {
        signInWithEmailAndPassword(auth,email,password).then((res)=>
        {
            event.target.innerHTML="welcome, "+res.user.email;
            sessionStorage.setItem("auth_id", res.user.uid);
            event.target.disabled=true;
            setpassword('');
            setEmail('');
            
            setTimeout(() => {
                event.target.disabled=false;
                event.target.innerHTML="Login";
            }, 2000);
        }).catch((err)=>{
            console.log(err);
            setpassword('');
            sessionStorage.setItem("auth_id", "");
            event.target.innerHTML=err;
            
        });
    }
}

export function sign_out(){
    auth.signOut().catch((error)=>{
        console.log(error);
        alert(error);
    });
}

auth.onAuthStateChanged(user=>{
    if(!user)
    {
        sessionStorage.setItem("auth_id", "");
    }
})

const NavBar = () => {
    
    return (
        <div className="row" style={{ height: '10%',backgroundColor:'whitesmoke' }}>
            <div className="col" style={{ textAlign: 'left'}}>
                <img src={companyimage}
                    alt='..'
                    width={"65px"}
                    height={"65px"} />
            </div>

            <div id='logindiv' className="col" style={{ textAlign: 'right' }}>
                {sessionStorage.getItem("auth_id") && <MoreButtons/>}
                <button style={{ borderRadius: '9px', margin: '5px', borderColor: 'black', color: 'black' }} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm">sign in</button>
                <Link to={'/Register'} style={{ borderRadius: '9px', margin: '5px', backgroundColor: '#306832', color: 'white' }} type="button" className="btn btn-sm">sign up</Link>
            </div>
        </div>
    );
}

export default NavBar;