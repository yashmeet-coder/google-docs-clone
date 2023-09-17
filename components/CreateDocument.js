import React, { useState } from 'react'
import docs_blank from './docs_blank.png'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Image from 'next/image'
import { DialogDefault } from './Modal';

const CreateDocument = () => {
  const [open,setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  
  return (
    <div className='px-8 md:px-16 py-8 bg-gray-200 space-y-4'>
      <div>
        <h1 className='text-xl'>Start a new document</h1>
      </div>
      <button onClick={handleOpen}>
        <Image src={docs_blank} width={130} h={130} className='hover:border border-blue-500 rounded-sm cursor-pointer'/>
      </button>
      <DialogDefault open={open} handler={handleOpen} />
    </div>
  )
}

export default CreateDocument
