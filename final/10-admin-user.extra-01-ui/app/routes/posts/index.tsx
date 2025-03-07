import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { getPostListItems } from "~/models/post.server"
import { useOptionalAdminUser } from "~/utils"

export const loader = async () => {
    return json({
        posts: await getPostListItems(),
    })
}

export default function Posts() {
    const { posts } = useLoaderData<typeof loader>()
    const adminUser = useOptionalAdminUser()
    return (
        <main>
            <h1>Posts</h1>
            {adminUser ? (
                <Link to="admin" className="text-red-600 underline">
                    Admin
                </Link>
            ) : null}
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link
                            to={post.slug}
                            className="text-blue-600 underline"
                            prefetch="intent"
                        >
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}
