import React from 'react'
import { useRouter } from 'next/router';
import Login from '@/components/Login';
import { useSession } from 'next-auth/react';
import {doc} from 'firebase/firestore'; 
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import TextEditor from '@/components/TextEditor';
import { db } from '@/firebase';
// import {getSession} from 'next-auth/react';

const Doc = () => {
  const router = useRouter();
  const name = router.query.name || null;

  let { data: session } = useSession();
  const [snapshot,loading] = useDocumentOnce(
    doc(db,"userDocs",session?.user?.email,"docs",name)
  );

  return (
    <div>
      <TextEditor snapshot={snapshot} loading={loading} />
    </div>
  )
}

export default Doc

