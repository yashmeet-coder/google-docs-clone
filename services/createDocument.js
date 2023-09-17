
import { Firestore, Timestamp, serverTimestamp } from "firebase/firestore"
import {db} from "../firebase"
import { doc, setDoc,getDocs } from "firebase/firestore"
import { collection,addDoc,getDoc} from "firebase/firestore"
import { useRouter } from "next/router"
import { get } from "draft-js/lib/DefaultDraftBlockRenderMap"


export const createDocument = async(name,email) => {

    // const document = doc(db,"userDocs",email,"docs",name)
    const docSnap = await getDocs(collection(db,"userDocs",email,"docs"));
    var exists = false;
    docSnap.forEach((doc) => {if(doc.data().name == name){exists = true;}});
    if(!exists){
    const docRef = await addDoc(collection(db,"userDocs",email,"docs"),{
        name: name,
        timestamp: serverTimestamp()
    });
}
else{
    console.log("already exists");
}
}
// else{
//     console.log("already exists");
// }
//     console.log("written");
// }
