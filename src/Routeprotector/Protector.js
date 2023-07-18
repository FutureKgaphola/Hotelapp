import { getAuth } from "firebase/auth";

export function AdminRouteProtector(){
    const auth=getAuth();
        auth.onAuthStateChanged(user=>{
            if(user)
            {
                if(sessionStorage.getItem("id")!==user.uid){
                    window.location.replace("/Unathorised");
                } 
                Admin(user);
            }else{
                window.location.replace("/Unathorised");
            }
        });
}

function Admin(user){
    if (String(user.email).toLocaleLowerCase()!=="admin@marula.co.za"){
        window.location.replace("/Unathorised");
    }
}


export function UserRouteProtector(){
    const auth=getAuth();
        auth.onAuthStateChanged(user=>{
            if(user)
            {
                if(sessionStorage.getItem("id")!==user.uid){
                    window.location.replace("/Unathorised");
                } 
                Client(user);
            }else{
                window.location.replace("/Unathorised");
            }
        });
}

function Client(user){
    if (String(user.email).toLocaleLowerCase()==="admin@marula.co.za"){
        window.location.replace("/Unathorised");
    }
}