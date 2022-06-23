import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { 
  CameraIcon,
  VideoCameraIcon,
 } from "@heroicons/react/solid";
import { useRef, useState } from 'react';
import { db, storage } from '../firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';

const InputBox = () => {
  
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const sendPost = async (e) => {
    
    e.preventDefault();

    if(loading) return;
    if(!inputRef.current.value) return;

    setLoading(true);

    // 1. Create a post and add to firestore 'posts' collection
    // 2. Get the post ID fro newly created post
    // 3. Upload the image to firebase storage with post ID
    // 4. Get a download URL from fb srorage and update the original post with image

    const docRef = await addDoc(collection(db, 'posts'), {
      message: inputRef.current.value,
      username: session?.user?.name,
      userImage: session?.user?.image,
      email: session?.user?.email,
      timestamp: serverTimestamp(),
    })

    console.log(filePickerRef)

    if(selectedFile) {

      const imageRef = ref(storage, `posts/${docRef.id}/image`);
  
      await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
        const downloadURL = await getDownloadURL(imageRef);
        
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL
        });
      });

    }


    inputRef.current.value = "",
    setLoading(false);
    setSelectedFile(null);

  }

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
  }

  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
      <div className='flex space-x-4 p-4 items-center'>
        {(session?.user?.image) && (
          <Image 
            className='rounded-full'
            src={session?.user?.image}
            width={40}
            height={40}
            layout='fixed'
          />
        )}
        <form className='flex flex-1'>
          <input
            className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
            ref={inputRef}
            type="text" 
            placeholder={`What's on your mind, ${session?.user?.name}?`}
          />
          <button hidden type='submit' onClick={sendPost}>
            Submit
          </button>
        </form>

        {selectedFile && (
          <div 
            onClick={removeImage} 
            className='flex flex-col filter hover:brightness-110 transition duration-150 hover:scale-105 cursor-pointer'>
            <img className='h-10 object-contain' src={selectedFile} alt="" />
            <p className='text-xs text-red-500 text-center'>Remove</p>
          </div>
        )}

      </div>

      <div className='flex justify-evenly p-3 border-t'>
        <div className='inputIcon'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
        </div>

        <div className='inputIcon' onClick={() => filePickerRef.current.click()}>
          <CameraIcon className='h-7 text-green-400' />
          <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
          <input 
            ref={filePickerRef} 
            type='file' 
            hidden 
            onChange={addImageToPost}
          />
        </div>

        <div className='inputIcon'>
          <EmojiHappyIcon className='h-7 text-yellow-300' />
          <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
        </div>

      </div>
    </div>
  )
}

export default InputBox