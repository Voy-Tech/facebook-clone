import Image from 'next/image';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import HeaderIcon from './HeaderIcon';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {

  const { data: session } = useSession();

  console.log(session)

  return (
    <div className='flex items-center p-2 lg:px-5 shadow-md sticky top-0 z-50 bg-white'>
      {/* Left */}
      <div className='flex items-center'>
        <Image 
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed" 
        />

        <div className='flex ml-2 items-center rounded-full bg-gray-100 p-2'>
          <SearchIcon className='h-6 text-gray-600' />
          <input 
            className='hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholderbg-gray-500 flex-shrink'
            type='text' 
            placeholder='Search Facebook
          '/>
        </div>
      </div>
      {/* Center */}
      <div className='flex justify-center flex-grow'>
        <div className='flex space-x-6 md:space-x-2'>
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/* Right */}
      {session ? (
      <div className='flex items-center sm:space-x-2 justify-end'>

        {/* Profile Pic */}
        <div className='flex items-center sm:space-x-2 rounded-full p-1 hover:bg-gray-200'>
          
          <img 
            onClick={signOut}
            src={session?.user?.image}
            alt='profile pic'
            className='h-7 rounded-full cursor-pointer'
          />
          <p className='whitespace-nowrap font-semibold pr-3' >{session?.user?.name}</p>
        </div>
        <ViewGridIcon className='icon' />
        <ChatIcon className='icon' />
        <BellIcon className='icon' />
        <ChevronDownIcon className='icon' />
      </div>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </div>
    
  )
}

export default Header