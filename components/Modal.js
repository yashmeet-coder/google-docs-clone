import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { createDocument } from "@/services/createDocument";
import {useSession} from 'next-auth/react'
 
export function DialogDefault({ open, handler }) {
  const [name,setName] = useState('');
  const {data:session} = useSession();
 
  return (
    <>
      <Dialog open={open} handler={handler}>
        <DialogHeader>Create a New Document</DialogHeader>
        <DialogBody divider>
          <input type="text" placeholder="Enter name of document" className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none" onChange={(e)=>{setName(e.target.value)}}/>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handler}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" className="text-white" onClick={handler}>
            <span onClick={()=>{createDocument(name,session?.user?.email)}}>Create</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}