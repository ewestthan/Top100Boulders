import {db} from "../firebase/initFirebase";
import { uid } from 'uid';
import { set, ref, onValue } from 'firebase/database';
import React, { useContext, useEffect, useRef, useState } from 'react';

const Testing = () => {
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        
        onValue(ref(db, 'b264b344b6e/dataSource'), snapshot => {
        const data = snapshot.val()
        if(data !== null){
          setDataSource(data)
        }
        
        })
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