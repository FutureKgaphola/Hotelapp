import { redirect } from "react-router-dom";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { message } from 'antd';

export async function Resetaction({ request }) {
    
    const data = await request.formData();

    var re = /\S+@\S+\.\S+/;
    if (data.get('forgoteditemail').trim().length < 1 || re.test(data.get('forgoteditemail').trim()) === false) {
        return { erroremail: 'Please input a valid email.' }
    }
    if (String(data.get('forgoteditemail').trim()).toLocaleLowerCase()==="admin@marula.co.za") {
        return { erroremail: 'You are not authorized to reset this account.' }
    }
    const submission = {
        email: data.get('forgoteditemail')
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth, submission.email).then(() => {
        message.success('Password reset link has been sent to :' + submission.email);
    }).catch((err) => {  
        message.error(String(err));
    });


    return redirect('/Forgtpassword');
}