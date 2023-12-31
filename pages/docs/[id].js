import React from 'react'
import { useRouter } from 'next/router';
import Login from '@/components/Login';
import { useSession } from 'next-auth/react';
import {doc} from 'firebase/firestore'; 
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import TextEditor from '@/components/TextEditor';
import { db } from '@/firebase';
import {getSession} from 'next-auth/react';
// import {getSession} from 'next-auth/react';

const Doc = ({user}) => {
  const router = useRouter();
  const name = router.query.id || null;
  const [snapshot,loading] = useDocumentOnce(
    doc(db,"userDocs",user?.email,"docs",name)
  );
  
  if(!snapshot?.data()?.name && !loading){
    router.push('/')
  }

  return (
    <div>
      <TextEditor snapshot={snapshot} loading={loading} />
    </div>
  )
}

export default Doc

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      props: {}
    }
  }
  const { user } = session;
  return {
    props: { user },
  }
}

