import { IconButton } from '@mui/material'
import React from 'react'
import { useSession } from 'next-auth/react'
import { AppsRounded, Menu, Search } from '@mui/icons-material'
import Image from 'next/image'
import doc_image from './doc_image.png'
import { signOut } from 'next-auth/react'



function Header() {
  const { data: session } = useSession();

  
  
  return (
    <div className='flex bg-white text-gray-900 px-5 py-4 space-x-4 sticky top-0 items-center z-50 shadow-md justify-between'>
      <div className='flex'>
        <IconButton >
          <Menu />
        </IconButton>
        <Image src={doc_image} width={40} height={40} />
        <h1 className='hidden md:!inline text-3xl text-gray-500'>Docs</h1>
      </div>
      <div className=' relative grow hidden md:!inline-flex max-w-3xl bg-gray-200 space-x-2 p-3 rounded-lg'>
        <Search />
        <input type="text" placeholder='Search' className='grow bg-gray-200 md:inline-flex outline-none' />
      </div>
      <div className='flex space-x-2 items-center'>
        <img src={session?.user?.image} className='w-8 h-8 rounded-full cursor-pointer' onClick={() => { signOut() }} />
        <p>{session?.user?.name}</p>
      </div>

    </div>
  )
}

export default Header
