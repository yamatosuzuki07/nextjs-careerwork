import { useRouter } from "next/router";
import { firestore } from "../../../lib/FirebaseConfig";
import { useEffect, useState } from "react";

export default function PostDetailPage() {
    const router = useRouter();
    const { genreId, postId } = router.query;
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (firestore === undefined) {
                return;
            }
            const docRef = firestore.collection('genres').doc(genreId).collection('posts').doc(postId);
            const docSnapshot = await docRef.get();
            if (docSnapshot.exists) {
                setPost(docSnapshot.data());
            }
        };

        fetchPost();
    }, [genreId, postId]);

    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{post.images}</h1>
            <p>{post.contents}</p>
        </div>
    );
};