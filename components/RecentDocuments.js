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
      <div className='flex items-center mx-auto px-10 py-2 max-w-4xl justify-between'>
        <h1 className='grow mr-10 font-semibold text-lg'>Recent Documents</h1>
        <p className='text-sm text-gray-600 mr-10'>Date Created</p>
      </div>
      {snapshot?.docs.map((doc)=>(
        <>
        <RecentDocument key={doc.id} id={doc.id} name={doc.data().name} timestamp={doc.data().timestamp} />
        
        </>
      ))}
    </div>
  )
}

export default RecentDocuments
