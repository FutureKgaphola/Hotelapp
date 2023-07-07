import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../Dbconfig/db';
import { message } from 'antd';

export function handleDelete(key)
{
    deleteDoc(doc(db,"Rooms",key)).then(()=>{
        message.success('remove a room');
    }).catch((err)=>{
        message.error(String(err));
    })
}
