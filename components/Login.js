import React from 'react'
import DescriptionIcon from '@mui/icons-material/Description';
import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';

function Login() {
  return (
    <div className='flex flex-col items-center min-h-screen w-full justify-center'>

      <DescriptionIcon className='h-20 w-20 text-blue-500' />
      <h1 className='text-xl'>Docs</h1>
      <Button onClick={() => signIn()} className="w-44 mt-6" variant='outlined'>Login</Button>
      <div
        className="text-base bg-[#3B82F6] text-white
          py-4 px-12 absolute bottom-0 w-full"
      >
        <strong>Disclaimer:</strong> This is not the official Google Docs. It is
        a redesign, built purely for educational purpose.
      </div>
    </div>
  )
}


export default Login
