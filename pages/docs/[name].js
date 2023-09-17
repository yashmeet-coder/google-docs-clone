import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "draft-js/dist/Draft.css";
import firebase from 'firebase/app';
import { db } from '@/firebase';
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import {doc,getDoc,setDoc,collection} from "firebase/firestore";
import Login from '@/components/Login';
// import { getFirestore,collection,doc,getDocs, getDocsFromCache } from 'firebase/firestore';
import 'firebase/firestore';
// import firestore from '@/firebase';
import { initializeApp } from "firebase/app";
import { EditorState, convertToRaw,convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState } from 'react-draft-wysiwyg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDocumentOnce,useDocument } from 'react-firebase-hooks/firestore';
import { Description } from '@mui/icons-material';
// import { getFirestore } from 'firebase/firestore';
// import { Editor } from 'react-draft-wysiwyg';

const Editor = dynamic(
	async () => {
		const { Editor } = await import("react-draft-wysiwyg");
		return Editor;
	},
	{
		ssr: false,
	}
);

const TextEditor = () => {
    const router = useRouter();
    const name = router.query.name;

    const {data:session} = useSession();
	if(!session) return <Login />
  
  const [editorState, setEditorState] = useState();

  const [snapshot] = useDocumentOnce(
    doc(db,"userDocs",session?.user?.email,"docs",name)
  )

  useEffect(()=>{
    if(snapshot?.data()?.editorState){
      setEditorState(EditorState.createWithContent(convertFromRaw(snapshot?.data()?.editorState)))
    }
  },[snapshot])

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const docRef = doc(db,"userDocs",session?.user?.email,"docs",router.query.name);
    const content = convertToRaw(editorState.getCurrentContent());
    setDoc(docRef,{
      editorState : content
    },{
      merge: true
    })
  }
  return (
    <div>
      <header className='flex items-center space-x-2'>
        <Description className='h-16 w-10 cursor-pointer text-blue-500' onClick={()=>router.push("/")}/>
        <div className='flex-col'>
          <h1 className='flex-grow w-10 pr-8 mr-10 font-semibold text-lg'>{snapshot?.data()?.name}</h1>
          <div className='flex text-gray-500 space-x-2'>
            <p>File</p>
            <p>Edit</p>
            <p>View</p>
            <p>Insert</p>
            <p>Format</p>
          </div>
        </div>
        <div className='absolute right-2'>
          <img src={session?.user?.image} className='w-10 h-10 rounded-full' />
        </div>
      </header>
      <div className='bg-[#F8F9FA] min-h-screen pb-8 text-black'>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="sticky top-0 z-50 !justify-center"
          wrapperClassName="wrapperClassName"
          editorClassName="bg-white mt-6 shadow-lg w-4/5 lg:w-3/5 mx-auto p-6 border mb-10 min-h-screen text-black"
        />
      </div>
      </div>
  )
}

export default TextEditor

