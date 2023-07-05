import { redirect } from "react-router-dom";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

export async function Resetaction({ request }) {
    //the word request must always be written like this because it is reserved.
    const data = await request.formData();

    var re = /\S+@\S+\.\S+/;
    if (data.get('editemail').trim().length < 1 || re.test(data.get('editemail').trim()) === false) {
        return { erroremail: 'Please input a valid email.' }
    }

    const submission = {
        email: data.get('editemail')
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth, submission.email).then(() => {
        alert('Password reset link has been sent to :' + submission.email);
    }).catch((err) => {
        alert(err);
    });


    return redirect('/Forgtpassword');
}