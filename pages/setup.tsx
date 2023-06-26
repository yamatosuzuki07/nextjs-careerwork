import { useState, useEffect, ChangeEventHandler, ChangeEvent, useRef } from 'react';
import { User, getAuth } from 'firebase/auth';
import { firebaseApp, auth, firestore, storage } from '../lib/FirebaseConfig';
import * as firebase from 'firebase/app';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, getDocs, getDoc, query, where, addDoc, updateDoc, DocumentData, DocumentReference } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Image from 'next/image';


const UserProfile = () => {
    const [profileData, setProfileData] = useState<DocumentData | null>(null);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [satisfaction, setSatisfaction] = useState('');
    const [fileINputVisible, setFileInputVisible] = useState(false);
    const [user, setUser] = useState<User>();
    const [error, setError] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const [value, setValue] = useState('');

    const handlePhotoClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        setProfileImage(file);
        console.debug('fileの中身', file.name);
        // object file.nameはstring
        if (!storage) {
            return;
        }
        const storageRef = ref(storage, `images/${file.name}`);
        const downloadURL = await getDownloadURL(storageRef);
        console.debug('downloadURL', downloadURL);
        setSelectedImage(downloadURL);
    };

    useEffect(() => {
        setValue(profileData?.satisfaction || '');
    }, [profileData?.satisfaction]);

    useEffect(() => {
        auth?.onAuthStateChanged((user) => {
            console.debug(user)
            if (user) {
                setUser(user)
            }
        })

    }, [])

    useEffect(() => {
        if (!user) {
            console.debug('currentUser:', user)
        }

        const fetchUserProfile = async () => {

            if (user && firestore) {
                const q = query(collection(firestore, 'users'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.debug("ドキュメントデータ", doc.data());
                    setProfileData(doc.data());
                });

            }
        };
        fetchUserProfile();

    }, [user]);

    const handleFormSubmit = async (event) => {
        console.debug('登録ボタンを押した！');

        event.preventDefault();


        if (!satisfaction) {
            setError(true);
            return;
        }

        console.debug('return後')

        if (!storage) {
            return;
        }

        let imageUrl;

        if (!profileData?.profileImage && !profileImage) {
            // ユーザー情報に画像の登録がなく、ローカルからの登録も存在しない
            // const defaultImagePath = '/images/icon_default.svg';
            // const file = await fetch(defaultImagePath);
            // const blob = await file.blob();
            // const storageRef = ref(storage, 'images/icon_default.svg');
            // await uploadBytes(storageRef, blob);
            // imageUrl = await getDownloadURL(storageRef);
            // console.debug('デフォルトの画像を保存処理', imageUrl);
            imageUrl = ""
        } else if (profileImage) {
            // ローカルからの画像選択があった場合
            const storageRef = ref(storage, `images/${profileImage.name}`);
            console.debug('登録ボタンクリック後のstorageRef', storageRef);
            await uploadBytes(storageRef, profileImage);
            console.debug(profileImage);
            console.debug(typeof profileImage);
            imageUrl = await getDownloadURL(storageRef);
            console.debug('ローカルから選択した画像を保存', imageUrl);
        } else if (profileImage === null) {
            imageUrl = profileData?.profileImage;
        }

        if (user && firestore) {
            const q = query(collection(firestore, 'users'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const docRef = querySnapshot.docs[0].ref;
            console.debug('imageUrlの中身確認', imageUrl)
            try {
                await updateDoc(docRef, {
                    profileImage: imageUrl,
                    satisfaction: satisfaction
                });
                router.push('/top');
            } catch (error) {
                console.debug('エラーが発生', error);
            }
        }

    };

    const handleValueChange = (e) => {
        setValue(e.target.value);
        setSatisfaction(e.target.value);
    }

    console.debug('valueの値を確認', profileData?.satisfaction || '');

    return (
        <section className="p-firstSetting">
            <div>
                <h1 className="p-firstSetting__logo">
                    <a href="">
                        <Image src="/images/logo.svg" alt="キャリアワークアウト" width={307.58} height={26.592} />
                    </a>
                </h1>
                <p className="c-title01">ようこそ、キャリアワークアウトへ！</p>
                <div className="c-box">
                    <form action="" method="post" onSubmit={handleFormSubmit}>
                        {error && (
                            <div className="c-alert c-alert__danger">
                                <Image src="images/icon_danger.svg" alt="" width={15} height={15} />
                                未入力または入力形式が誤っている項目があります。
                            </div>
                        )}
                        <p className="p-firstSetting__text">
                            こんにちは、{profileData?.name}さん。<br />
                            これから一緒にキャリアワークアウトを進めていきましょう。<br />
                            まずは、プロフィール画像の設定と現在のキャリア満足度を入力しましょう。
                        </p>
                        <table className="c-table">
                            <tbody>

                                <tr>
                                    <th>氏名</th>
                                    <td>{profileData?.name}</td>
                                </tr>
                                <tr>
                                    <th>メールアドレス</th>
                                    <td>{profileData?.email}</td>
                                </tr>
                                <tr>
                                    <th>所属</th>
                                    <td>{profileData?.department}</td>
                                </tr>
                                <tr>
                                    <th>プロフィール画像
                                        <span className="c-label c-label__option">任意</span>
                                    </th>
                                    <td>
                                        <div className="p-firstSetting__profilePhoto" onClick={handlePhotoClick}>
                                            {profileData?.profileImage && !selectedImage ? (
                                                <Image src={profileData.profileImage} id="user_icon" alt="デフォルトのユーザーアイコン" width={78} height={78} />
                                            ) : selectedImage ? (
                                                <Image src={selectedImage} id="user_icon" alt="デフォルトのユーザーアイコン" width={78} height={78} />
                                            ) : !profileData?.profileImage && !selectedImage ? (
                                                <Image src="images/icon_default.svg" id="user_icon" alt="デフォルトのユーザーアイコン" width={78} height={78} />
                                            ) : null
                                            }
                                        </div>
                                        <input id="file" ref={fileInputRef} type="file" style={{ display: 'none' }} name="FormFile" onChange={handleFileInputChange} />
                                        <button type="button" className="c-btn c-btn__secondary c-btn__sm" onClick={handlePhotoClick}>画像をアップロード</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        キャリア満足度
                                        <span className="c-label c-label__must">必須</span>
                                    </th>
                                    <td>
                                        <p className="p-firstSetting__question">現在のキャリア満足度は100点満点で何点ですか？</p>
                                        {error ? (
                                            <>
                                                <input type="text" name="score" className="c-textBox c-textBox__error" onChange={(e) => setSatisfaction(e.target.value)} />
                                                <span className="p-firstSetting__unit">点</span>
                                                <p className="c-errorText">入力してください</p>
                                            </>
                                        ) : profileData?.satisfaction ? (
                                            <>
                                                <input type="text" name="score" value={value} className="c-textBox" onChange={handleValueChange} />
                                                <span className="p-firstSetting__unit">点</span>
                                            </>
                                        ) : (
                                            <>
                                                <input type="text" name="score" className="c-textBox" onChange={(e) => setSatisfaction(e.target.value)} />
                                                <span className="p-firstSetting__unit">点</span>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" className="c-btn c-btn__primary c-btn__lg p-firstSetting__btn">登録する</button>
                    </form>
                </div>
                <div className="l-footer">
                    <p>
                        <a href="" className="l-footer__link">利用規約</a>
                        <span>/</span>
                        <a href="" className="l-footer__link">プライバシーポリシー</a>
                    </p>
                    <p className="l-footer__copyright">© 4designs Inc.</p>
                </div>
            </div>
        </section>

    );
};

// export default UserProfile;
// function get(profileData: DocumentReference<DocumentData>) {
//     throw new Error('Function not implemented.');
// }

export default UserProfile;