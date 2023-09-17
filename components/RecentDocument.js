import React, { Fragment } from 'react'
import Description from '@mui/icons-material/Description'
import Link from 'next/dist/client/link'
import { Delete } from '@mui/icons-material'
import { deleteDoc,doc } from 'firebase/firestore'
import {useSession} from 'next-auth/react'
import { db } from '@/firebase'

const RecentDocument = ({ id, name, timestamp }) => {

    const {data:session} = useSession();

    async function deleteDocument(e){
        e.preventDefault();
        await deleteDoc(doc(db,"userDocs",session?.user?.email,"docs",id))
        console.log("deleted");
    }
    return (
        <Fragment>
        <Link href={`/docs/${id}`}>
            <div className='cursor-pointer flex items-center mx-auto p-4 max-w-4xl justify-between'>
                <Description className='h-8 w-10 text-blue-500' />
                <h1 className='flex-grow pl-5 w-10 pr-8 mr-10 font-semibold text-lg'>{name}</h1>
                <p>{timestamp?.toDate().toDateString()}</p>
                <button onClick={deleteDocument}>
                <Delete className='h-6 w-10 ml-4 text-gray-500' />
                </button>
            </div>
        </Link>
        </Fragment>

    )
}

export default RecentDocument
