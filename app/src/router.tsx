import { Link, Outlet, createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  title: string
  author: string
}

const rootRoute = createRootRoute({
  component: () => (
    <div className="mx-auto max-w-2xl p-6">
      <nav className="mb-6 flex gap-4 text-blue-600">
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
      </nav>
      <Outlet />
    </div>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <h1 className="text-3xl font-bold">React + TypeScript + Tailwind + TanStack Router</h1>,
})

function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then(setPosts)
      .catch(console.error)
  }, [])
  return (
    <ul className="list-disc pl-6">
      {posts.map((p) => (
        <li key={p.id}>
          {p.title} <span className="text-gray-500">by {p.author}</span>
        </li>
      ))}
    </ul>
  )
}

const postsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/posts', component: Posts })

export const router = createRouter({ routeTree: rootRoute.addChildren([indexRoute, postsRoute]) })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
