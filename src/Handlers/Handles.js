import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../Dbconfig/db';
import { message } from 'antd';
import { getStorage, ref, deleteObject } from "firebase/storage";



export function handleDelete(key,filename)
{
    const storage = getStorage();
    const desertRef = ref(storage, `Hotels/${filename.trim()}`);
    message.info('Attempting to remove room. this may take some time please wait....',4);
    deleteObject(desertRef).then(() => {
        deleteDoc(doc(db,"Rooms",key)).then(()=>{
            message.success('Removed a room');
        }).catch((err)=>{
            message.error(String(err));
        });
      }).catch((error) => {
        message.error(String(error));
      });

}
