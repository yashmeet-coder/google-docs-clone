import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import TextEditor from '@/components/TextEditor'
import Header from '@/components/Header'
import CreateDocument from '@/components/CreateDocument'
import {useSession} from 'next-auth/react'
import Login from '@/components/Login'
import { getSession } from 'next-auth/react'
import RecentDocuments from '@/components/RecentDocuments'
import RecentDocument from '@/components/RecentDocument'




// const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {data:session,status} = useSession();
  if(!session) return <Login />
  else
  return (
    <main className='bg-white'>
    <Header />
    <CreateDocument/>
    <RecentDocuments />
    </main>
  )
}

