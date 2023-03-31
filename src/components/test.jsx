import {db} from "../firebase/initFirebase";
import { uid } from 'uid';
// import { set, ref, onValue } from 'firebase/database';
import {collection, doc, getDoc, setDoc} from 'firebase/firestore'

import React, { useContext, useEffect, useRef, useState } from 'react';

const Testing = () => {
    const [dataSource, setDataSource] = useState([])
    const mainTableRef = collection(db, 'MainTable')
    const docSnap =  getDoc(mainTableRef)
    useEffect(() => {
        

        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
        
    }, [])

//   const writeToDatabase = () => {
    
//     set(ref(db, `/${uuid}`),{
//       dataSource,
//       uuid,
//     });
//   }
  return (
      <div>
          {console.log(dataSource)}
      </div>
  );
};

export default Testing