import { async } from "@firebase/util"
import { getProviders, signIn as signIntoProvider } from "next-auth/react";
import Image from "next/image";
import Header from "../../components/Header";

const signIn =( { providers } ) => {
  return (
    <>
    <Header />
    <div className='flex flex-col items-center justify-center min-h-screen py-2 px-14 text-center space-y-2'>
      <Image  
        src='https://links.papareact.com/t4i'
        height={250}
        width={250}
        objectFit='contain'
      />
      
      <div className='space-y-3'>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            
              <button 
                onClick={() => signIntoProvider(provider.id, { callbackUrl: '/' })}
                className='p-5 bg-gray-500 rounded-full text-white text-center cursor-pointer'
              >
                Sign in with {provider.name}
              </button>
            </div>
          
        ))}
      </div>
    </div>
    </>
  )
}

// Middle Server (SSR)
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default signIn