import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

const Posts = () => {
  
  const [posts, setPosts] = useState([]);

  useEffect(
    () => 
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')), 
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );
  console.log(posts);
  
  return (
    <div>
      <div>
        {posts.map((post) => (
          <Post
            key={post.id}
            username={post.data().username}
            message={post.data().message}
            email={post.data().email}
            timestamp={post.data().timestamp}
            userImage={post.data().userImage}
            image={post.data().image}
          />
        ))}
      </div>
    </div>
  )
}

export default Posts