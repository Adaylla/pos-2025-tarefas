import { useEffect, useState } from 'react'
import { getPosts } from '../api/client'

export function PostList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts().then(setPosts)
  }, [])

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.slice(0, 10).map(post => ( // Pega os 10 primeiros
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}