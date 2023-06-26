import { User } from 'firebase/auth';
import { auth, firestore } from '../lib/FirebaseConfig';
import { useContext, useEffect, useState } from 'react';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';

const Header = () => {
    const [user, setUser] = useState<User>();
    const [userData, setUserData] = useState<DocumentData>();
    useEffect(() => {
        auth?.onAuthStateChanged((user) => {
            console.debug(user)
            if (user) {
                setUser(user)
            }
        })
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

    return (
        <header>
            <h1>Career Workout</h1>
            {userData.name && (
                <div>
                    <p>Welcome, {currentUser.username}!</p>
                    <img src={currentUser.profileImage} alt="Profile" />
                </div>
            )}
        </header>
    )
}