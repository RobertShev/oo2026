import React, { useEffect } from 'react'
import { useStore } from '@/context/StoreContext'

function Shops() {
  const { posts, fetchPosts, isLoading } = useStore()

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <div className="flex flex-col gap-6 pt-4">
      <h1 className="text-xl font-semibold">Our shops</h1>
      {isLoading && posts.length === 0 && <div>Loading posts…</div>}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <article key={post.id} className="rounded-md border p-4">
            <h2 className="font-semibold capitalize">{post.title}</h2>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Shops
