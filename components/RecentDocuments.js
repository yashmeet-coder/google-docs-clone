import { collection, getDocs, orderBy } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import {useCollection} from 'react-firebase-hooks/firestore'
import { db } from '@/firebase'
import { query } from 'firebase/firestore'
import React from 'react'
import RecentDocument from './RecentDocument'

const RecentDocuments = () => {
  const { data: session } = useSession();
  
  
 const [snapshot] = useCollection(
  query(collection(db,"userDocs",session?.user?.email,"docs"),orderBy("timestamp","desc"))
 )
  return (
    <div className='mt-6'>
      {snapshot?.docs.map((doc)=>(
        <>
        <RecentDocument key={doc.id} id={doc.id} name={doc.data().name} timestamp={doc.data().timestamp} />
        <hr className='max-w-4xl mx-auto bg-black' />
        </>
      ))}
    </div>
  )
}

export default RecentDocuments
