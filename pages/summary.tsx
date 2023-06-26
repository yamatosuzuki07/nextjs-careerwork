/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { firestore, auth } from "../lib/FirebaseConfig";
import { collection, getDocs, doc, query, where, DocumentData } from 'firebase/firestore';
import { SetStateAction, useEffect, useState } from "react";
import { User } from "firebase/auth";
import Link from "next/link";

export default function IndexPage() {
    const router = useRouter();
    const [genres, setGenres] = useState<DocumentData[] | string[]>([]);
    const [posts, setPosts] = useState<DocumentData[]>([]);
    const [user, setUser] = useState<User>();
    const [userData, setUserData] = useState<DocumentData | null>(null);
    const [managementArray, setManagementArray] = useState<DocumentData[]>([]);
    const [adaptabilityArray, setAdaptabilityArray] = useState<DocumentData[]>([]);
    const [identityArray, setIdentityArray] = useState<DocumentData[]>([]);


    useEffect(() => {
        auth?.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            if (user === undefined) {
                return;
            }

            if (user && firestore) {
                const q = query(collection(firestore, 'users'), where('userId', '==', user.uid));
                const querySnapShot = await getDocs(q);
                querySnapShot.forEach((doc) => {
                    setUserData(doc.data());
                })
            } else {
                console.debug('errorが発生');
            }
        };

        fetchUserData();

    }, [user])


    useEffect(() => {
        const fetchGenre = async () => {
            if (firestore === undefined) {
                return;
            };

            const genresSnapShots = await getDocs(collection(firestore, 'genres'));
            const genresDoc = genresSnapShots.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            for (const genreDoc of genresDoc) {
                console.debug('for文の中----', genreDoc);
                const q = query(collection(firestore, 'posts'), where('genreId', '==', genreDoc.id));
                const postSnapShot = await getDocs(q);

                console.debug('for文の中post-----', postSnapShot.docs);
                // filterの掛け方

                postSnapShot.forEach((doc) => {
                    console.debug('postのデータ', doc.data());
                    if (doc.data().genreId === 'daKICnRYVg5YHiHfSRAT') {
                        setManagementArray(managementArray => [...managementArray, doc.data()]);
                    } else if (doc.data().genreId === 'vMoF2XgnhEAeIR356NzC') {
                        setAdaptabilityArray(adaptabilityArray => [...adaptabilityArray, doc.data()]);
                    } else {
                        setIdentityArray(identityArray => [...identityArray, doc.data()]);
                    }
                })
            }

            setGenres(genresDoc);
        };
        fetchGenre();
    }, []);

    console.debug('------', identityArray);
    console.debug('------', managementArray);
    console.debug('------', adaptabilityArray);
    console.debug('----===', genres);



    const handleGenreClick = (genreId) => {
        router.push(`genres/${genreId}`);
    };



    return (
        <div>
            {userData ? (
                <>
                    <header>
                        <h1>Career Workout</h1>
                        <div>
                            <img src={userData.profileImage} alt="Profile" width="100" height="100" />
                            <p>{userData.name}▼</p>
                        </div>
                        <div>
                            <nav>
                                <ul>
                                    <li>
                                        <Link href="/">
                                            ホーム
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/summary">
                                            プロティアンを学ぶ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/values">
                                            アイデンティティ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/adaptabilities">
                                            アダプタビリティ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/">
                                            キャリア戦略
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </header>

                    <h1>Genre List</h1>
                    <ul>
                        <>
                            {genres && genres.map((genre) => {
                                <li key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                                    <p>{genre.genreName}</p>
                                    {identityArray.map((identity) => {
                                        return <div key={identity.title}>{identity.title}</div>
                                    })}
                                </li>
                            })}
                        </>
                        <p>アイデンティティ</p>
                        {identityArray.map((identity) => {
                            return <div key={identity.title}>{identity.title}</div>
                        })}
                        <p>アダプタビリティ</p>
                        {adaptabilityArray.map((adapta) => {
                            return <div key={adapta.title}>{adapta.title}</div>
                        })}
                        <p>マネジメント</p>
                        {managementArray.map((management) => {
                            return <div key={management.title}>{management.title}</div>
                        })}
                        {/* <>
                        {genres && genres.map((genre) => {
                            posts.map((post) => {
                                console.debug('map内のpost-----', post.genreId);
                                console.debug('map内のgenre-----', genre.id);
                                    return (
                                        <li key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                                            <p>{genre.genreName}</p>
                                        </li>
                                    );
                                } else {
                                    console.debug('失敗-----');
                                    return;
                                }
                            });
                            // console.debug('return文のmatchPosts', matchPosts);
                            // if (posts.includes(genre.genreId)) {
                            //     return <li key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                            //         {genre.genreName}
                            //         {posts.map((post) => {
                            //             { post.images }
                            //             { post.title }
                            //             { post.contents }
                            //         })}
                            //     </li>
                            // }
                            // <li key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                            //     {genre.genreName}
                            //     {posts.map((post) => {
                            //         { post.images }
                            //         { post.title }
                            //         { post.contents }
                            //     })}
                            // </li>
                        })}
                    </> */}
                    </ul>
                </>
            ) : (
                <p>userDataが空</p>
            )}
        </div>
    );
}
