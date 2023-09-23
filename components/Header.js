import { IconButton, Link } from '@mui/material'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { AppsRounded, LogoutOutlined, Menu, Search } from '@mui/icons-material'
import Image from 'next/image'
import doc_image from './doc_image.png'
import { signOut } from 'next-auth/react'
import { db } from '@/firebase'
import { query, collection, orderBy } from 'firebase/firestore'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'



function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [snapshot] = useCollectionOnce(
    query(collection(db, "userDocs", session?.user?.email, "docs"), orderBy("timestamp", "desc"))
  )

  const filterResults = (e) => {
    if (e.target.value === '') {
      setShow(false);
    }
    else{
    setShow(true);
    const search = e.target.value;
    const results = snapshot?.docs?.filter(doc => doc.data().name.includes(search));
    setSearchResults(results);
  }}




  return (
    <div className='flex bg-white text-gray-900 px-5 py-4 space-x-4 sticky top-0 items-center z-50 shadow-md justify-between'>
      <div className='flex items-center'>
        <IconButton >
          <Menu />
        </IconButton>
        <Image src={doc_image} width={60} height={50} />
        <h1 className='hidden md:!inline text-2xl text-gray-700 tracking-tighter'>Docs</h1>
      </div>
      <div className=' relative grow bg-gray-200 max-w-3xl rounded-md'>
        <div className='grow hidden md:!inline-flex bg-gray-200 space-x-2 p-3 rounded-lg'>
          <Search />
          <input type="text" placeholder='Search' className='grow bg-gray-200 md:inline-flex outline-none' onChange={filterResults}  />
        </div>
        {show &&

          <div className=' absolute top-12 bg-white w-full p-2 rounded-lg shadow-lg'>{
            searchResults.map((doc) => (
              <>
                <h1 className="cursor-pointer" onClick={()=>{ router.push({pathname: "/docs/[name]", query:{name:doc.id}})}}>{doc.data().name}</h1>
                <hr className='bg-gray-200' />
              </>
            ))
          }
          </div>
        }
        </div>
        <div className='flex space-x-2 items-center'>
          <img src={session?.user?.image} className='w-8 h-8 rounded-full cursor-pointer' />
          <p className='hidden md:block'>{session?.user?.name}</p>
          <LogoutOutlined className='cursor-pointer' onClick={() => { signOut() }} />
        </div>
  
    </div>
      )
}


export default Header
