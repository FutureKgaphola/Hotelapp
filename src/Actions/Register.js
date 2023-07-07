import { redirect } from "react-router-dom";
import {doc,setDoc,
} from 'firebase/firestore';
import { db } from '../Dbconfig/db';
import { message } from 'antd';
import { createUserWithEmailAndPassword,getAuth } from "firebase/auth";
export async function RegisterAction({request})
{
    const data = await request.formData();
    var re = /\S+@\S+\.\S+/;
    if (data.get('edit_email').trim().length < 1 || re.test(data.get('edit_email').trim()) === false) {
        return { errormail: 'Please input a valid email.' }
    }
    if (!data.get('edit_phone').trim().length > 9  && !data.get('edit_phone').trim().length < 11) {
        return { errorphone: 'Please input a valid phone number of 10 digits.' }
    }
    if (data.get('edit_pass').trim().length < 6) {
        return { errorpass: 'Please input a valid of atlest 6 charecters.' }
    }
    if (data.get('edit_name').trim().length < 1) {
        return { errorname: 'Please input a valid name' }
    }

    const submission={
        email:data.get('edit_email'),
        phone:data.get('edit_phone'),
        name:data.get('edit_name')
    }
    const auth=getAuth();
    const adduser=document.querySelector('.adduser');
    const btnSignup=document.querySelector('.btnSignup');
    btnSignup.innerHTML='Submitting...';
    btnSignup.disabled=true;

   createUserWithEmailAndPassword(auth,submission.email.trim(),data.get('edit_pass')).then((result)=>{
        setDoc(doc(db,'Users',result.user.uid.trim()),submission)
        .then(()=>{
            adduser.reset();
            btnSignup.innerHTML='Register';
            message.success('succesfully Registered.');
            btnSignup.disabled=false;

        }).catch((err)=>{
            btnSignup.innerHTML='Register';
            btnSignup.disabled=false;
            console.log(err);
            message.error(String(err));
        })

    }).catch((authError)=>{
        btnSignup.innerHTML='Register';
        btnSignup.disabled=false;
        message.error(String(authError));
    });

    

    /*const colRef = collection(db, "Users");
    addDoc(colRef,submission).then(()=>{
        adduser.reset();
        console.log('succesful');
    }).catch((err)=>{
        console.log(err);
    })*/
    
    return redirect('/Register');
}