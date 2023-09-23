import React, { Fragment } from 'react'
import Description from '@mui/icons-material/Description'
import Link from 'next/dist/client/link'
import { Delete, DeleteOutline, HighlightOff, RemoveCircle, RemoveCircleOutline } from '@mui/icons-material'
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
            <div className='cursor-pointer flex items-center mx-auto px-8 py-2 max-w-4xl justify-between'>
                <Description className='h-6 w-8 text-blue-500' />
                <h1 className='flex-grow w-10 pl-2 pr-8 mr-10 font-semibold text-md'>{name}</h1>
                <p className='text-sm text-gray-600'>{timestamp?.toDate().toDateString()}</p>
                <button onClick={deleteDocument}>
                <RemoveCircleOutline className='h-5 w-5 ml-5 text-blue-500 hover:text-red-400 transition ease-in-out' />
                </button>
            </div>
        </Link>
        <hr className='max-w-4xl mx-auto bg-black' />
        </Fragment>

    )
}

export default RecentDocument
