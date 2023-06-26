import { useRouter } from "next/router";
import { firestore } from "../../lib/FirebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs, where, query } from 'firebase/firestore';

export default function GenrePage() {
    const router = useRouter();
    const { genreId } = router.query;
    const [posts, setPosts] = useState<{}[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            if (firestore === undefined || genreId === undefined) {
                return;
            }
                console.debug('1↓');
                console.debug(genreId);
                const q = query(collection(firestore, 'genres', genreId, 'posts'));
                const querySnapshot = await getDocs(q);
                const postsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(postsData);
            // const querySnapshot = await firestore.collection('genres').doc(genreId).collection('posts').get();
            // const postsData = querySnapshot.docs.map((doc) => doc.data());
        };

        fetchPosts();

    }, [genreId]);

    console.debug(posts);
    console.debug('genreIdページのpostデータ');

    const handlePostClick = () => {
        router.push(`/genres/${genreId}/${postId}`);
    };

    return (
        <div>
            <h1>Post List</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id} onClick={() => handlePostClick(post.id)}>
                        {console.debug(post.contents)}
                        {console.debug('↑')};
                        {post.contents.map((content) => (
                            <p key={content.id}>{content.title}</p>
                        ))}
                        {/* 表示の部分を確認する */}
                    </li>
                ))}
            </ul>
        </div>
    );
}