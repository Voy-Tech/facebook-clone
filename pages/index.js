import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Feed from '../components/Feed';
import Header from '../components/Header'
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import signIn from './auth/signin';

export default function Home( { session } ) {
  if (!session) return <Login />
  return (
    <div className=''>
      <Head>
        <title>Facebook</title>ś
      </Head>
    {/* Header */}
    <Header />
    <main className='flex bg-gray-100'>
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <Feed />
      {/* Widgets */}
      <Widgets />
    </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Get the User
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}