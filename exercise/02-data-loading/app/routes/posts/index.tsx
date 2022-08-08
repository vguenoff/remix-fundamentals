import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData, Link } from "@remix-run/react"
import { getPostListItems } from "~/models/posts.server"

export async function loader() {
    const posts = await getPostListItems()

    return json({ posts })
    // return json({ posts: posts.map((p) => ({ slug: p.slug, title: p.title })) })
}

export default function Posts() {
    const { posts } = useLoaderData<typeof loader>()

    return (
        <main>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link
                            to={post.slug}
                            className="text-blue-600 underline"
                        >
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}
