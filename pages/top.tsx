/* eslint-disable @next/next/no-img-element */
import { firestore, auth } from '../lib/FirebaseConfig';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { User, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { connectStorageEmulator } from 'firebase/storage';
import Image from 'next/image';
import router from 'next/router';

const MyPage = () => {
    const [userData, setUserData] = useState<DocumentData | null>(null);
    const [user, setUser] = useState<User>();
    const [showGuide, setShowGuide] = useState(false);

    useEffect(() => {
        auth?.onAuthStateChanged((user) => {
            console.debug(user);
            if (user) {
                setUser(user);
                console.debug('ユーザーが存在する', user);
            }
        })
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            // if (auth) {
            // const user = auth.currentUser;
            // auth.onAuthStateChanged(async () => {
            if (!user) {
                console.debug('currentUser:', user)
            }

            if (user && firestore) {
                console.debug('top画面のif文の中に入ったよ!');
                const q = query(collection(firestore, 'users'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setUserData(doc.data());
                    setShowGuide(doc.data().satisfaction === '100');
                    console.debug('if文の中のprofileImage', doc.data().profileImage);
                });
            } else {
                console.debug(user);
                console.debug('存在しない失敗');
            }
            // });
            // }
        };


        fetchData();
    }, [user]);

    const handleLogout = async () => {
        try {
            if (auth === undefined) {
                return;
            }
            await signOut(auth);
            router.push('/login');

            console.debug('ログアウトに成功した!!');
        } catch (error) {
            console.debug('ログアウト時にエラーが発生しました！', error);
        }
    };

    console.debug('ログイン後の画面表示の画像', userData);
    console.debug('ログイン後の画面表示の画像', userData?.profileImage);
    return (
        <div className="l-main__container">
            <section className="l-sidebar">
                <div className="l-sidebar__inner">
                    <h1 className="l-sidebar__logo">
                        <a href="">
                            <Image src="/images/logo.svg" alt="キャリアワークアウト" width={307.58} height={26.592} />
                        </a>
                    </h1>
                    <div className="l-sidebar__user">
                        {userData ? (
                            userData.profileImage ? 
                            <div>
                                <Image src={userData.profileImage} alt="" className="l-sidebar__userPhoto" width={96} height={96} />
                                <p className="l-sidebar__userName">{userData.name}</p>
                            </div> :
                            <div>
                                <Image src={"images/icon_default.svg"} alt="" className="l-sidebar__userPhoto" width={96} height={96} />
                                <p className="l-sidebar__userName">{userData.name}</p>
                            </div>
                        ) : (<p>userDataが空</p>)}
                    </div>
                    <nav className="l-sidebar__nav">
                        <ul>
                            <li className="active">
                                <a href="">
                                    <Image src="images/icon_home.svg" className="l-sidebar__nav__icon" alt="" width={24} height={25} />ホーム
                                </a>
                                <span className="l-sidebar__nav__shape"></span>
                            </li>
                            <li>
                                <Link href="/summary">
                                    <Image src="images/icon_study.svg" className="l-sidebar__nav__icon" alt="" width={24} height={24} />プロティアンを学ぶ
                                </Link>
                                <span className="l-sidebar__nav__shape"></span>
                            </li>
                            <li>
                                <Link href="">
                                    <Image src="images/icon_heart.svg" className="l-sidebar__nav__icon" alt="" width={24} height={24} />アイデンティティ
                                </Link>
                                <span className="l-sidebar__nav__shape"></span>
                            </li>
                            <li>
                                <Link href="/adaptabilities">
                                    <Image src="images/icon_adaptability.svg" className="l-sidebar__nav__icon" alt="" width={24} height={28} />アダプタビリティ
                                </Link>
                                <span className="l-sidebar__nav__shape"></span>
                            </li>
                            <li>
                                <Link href="">
                                    <Image src="images/icon_flag.svg" className="l-sidebar__nav__icon" alt="" width={24} height={24} />キャリア戦略
                                </Link>
                                <span className="l-sidebar__nav__shape"></span>
                            </li>
                            <li>
                                <Link href="">
                                    <Image src="images/icon_setting.svg" className="l-sidebar__nav__icon" alt="" width={24} height={24} />設定
                                </Link>
                                <span className="l-sidebar__nav__shape"></span>
                            </li>
                            <li>
                                <Link href="#" onClick={handleLogout}>
                                    <Image src="images/icon_logout.svg" className="l-sidebar__nav__icon" alt="" width={24} height={24} />ログアウト
                                </Link>
                                <span className="l-sidebar__nav__shape"></span>
                            </li>
                        </ul>
                    </nav>
                    <nav className="l-footer">
                        <p>
                            <a href="" className="l-footer__link">利用規約</a>
                            <span>/</span>
                            <a href="" className="l-footer__link">プライバシーポリシー</a>
                        </p>
                        <p className="l-footer__copyright">© 4designs Inc.</p>
                    </nav>
                </div>
            </section>
            <section className="l-main">
                <div className="c-box p-beforeTraining">
                    <div className="p-beforeTraining__text">
                        <p className="p-beforeTraining__thanks">
                            入力ありがとうございました！
                        </p>
                        <div className="p-beforeTraining__score">
                            {userData ? (
                                <div>
                                    {userData.name}さんの現在のキャリア満足度は
                                    <b>{userData.satisfaction}</b>/100点です。
                                </div>
                            ) : (
                                <p>userDataが空</p>
                                // strongは使用しない、div/a/p/h関連
                            )}
                        </div>
                        {!showGuide && (
                            <p className="p-beforeTraining__guide">この点数が100点に近づくように、キャリアワークアウトがお手伝いします。<br />
                                以下の手順で今後のキャリア戦略を設定しましょう。</p>
                        )}
                        {showGuide && (
                            <p className="p-beforeTraining__guide">さらに満足度を高めるために、キャリアワークアウトがお手伝いします。</p>
                        )}
                    </div>
                    <div className="p-beforeTraining__steps">
                        <div className="dots">
                            <Image src="images/steps_dots.svg" alt="" width={17} height={421} />
                        </div>
                        <div className="p-beforeTraining__number step01">
                            <p>01</p>
                        </div>
                        <div className="p-beforeTraining__number step02">
                            <p>02</p>
                        </div>
                        <div className="p-beforeTraining__number step03">
                            <p>03</p>
                        </div>
                        <div className="p-beforeTraining__number step04">
                            <p>04</p>
                        </div>
                        <div className="p-beforeTraining__description description01">
                            <h2>プロティアンを学ぶ</h2>
                            <p>プロティアン・キャリアとは何か、そしてプロティアン・キャリアを形成するためにに必要なことを動画・テキストで学びます。</p>
                            <div><Image src="images/icon_study_orange.svg" alt="" width={62} height={54} /></div>
                        </div>
                        <div className="p-beforeTraining__description description02">
                            <h2>自分のアイデンティティを確認する</h2>
                            <p>これまでのあなたのキャリアを振り返り、学び得たことや価値観を書き出してみましょう。</p>
                            <div><Image src="images/icon_heart_orange.svg" alt="" width={60} height={60} /></div>
                        </div>
                        <div className="p-beforeTraining__description description03">
                            <h2>自分のアダプタビリティを知る</h2>
                            <p>自分自身の強み・弱みを整理し、これからの社会や業界に起こる変化にどう適応していくか考えてみましょう。</p>
                            <div><Image src="images/icon_adaptability_orange.svg" alt="" width={51} height={61} /></div>
                        </div>
                        <div className="p-beforeTraining__description description04">
                            <h2>キャリア戦略を考える</h2>
                            <p>自分のアイデンティティ、アダプタビリティを踏まえて、明日からできる行動を考えてみましょう。</p>
                            <div><Image src="images/icon_flag_orange.svg" alt="" width={56} height={56} /></div>
                        </div>
                    </div>
                    <p className="p-beforeTraining__leadingText">それでは次のステップへ進みましょう！</p>
                    <Link href="/summary" className="c-btn c-btn__primary p-beforeTraining__btn">
                        次のステップへ
                    </Link>
                </div>
            </section >
        </div >

    );
};

export default MyPage;

// function getFirestoreData() {
//     throw new Error('Function not implemented.');
// }
