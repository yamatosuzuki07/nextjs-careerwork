import { useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '../lib/FirebaseConfig';
// import '../styles/globals.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // const auth = getAuth();
            if (auth === undefined) {
                return;
            }
            await signInWithEmailAndPassword(auth, email, password);
            console.log('ログインに成功！');
            const user = auth.currentUser;
            console.debug(user);
            router.push('/setup');
        } catch (error) {
            setError(true);
            console.error('ログインに失敗しました。', error);
        }
    };

    return (
        <div>
            <section className="p-login">
                <h1 className="p-login__logo">
                    <a href="../pages/login.tsx">
                        <Image src="/images/logo.svg" alt="キャリアワークアウト" width={307.58} height={26.592} />
                    </a>
                </h1>
                <div className="c-box">
                    <h2 className="c-title01">ログイン</h2>
                    <form action="" method="post" onSubmit={handleLogin}>
                        {error ? (
                            <>
                                <div className="c-alert c-alert__danger">
                                    <Image src="/images/icon_danger.svg" alt="" width={15} height={15} />
                                    メールアドレスまたはパスワードに誤りがあります。
                                </div>
                                <div className="c-form__group">
                                    <label htmlFor="mail" className="c-form__label mb-8">メールアドレス</label>
                                    <input type="email" value={email} name="mail" id="mail" className="c-textBox c-textBox__error" onChange={(e) => setEmail(e.target.value)} />
                                    <p className="c-errorText">メールアドレスを入力してください</p>
                                </div>
                                <div className="c-form__group">
                                    <label htmlFor="password" className="c-form__label mb-8">パスワード</label>
                                    <input type="password" value={password} name="password" id="password" className="c-textBox c-textBox__error" onChange={(e) => setPassword(e.target.value)} />
                                    <p className="c-errorText">パスワードを入力してください</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="c-form__group">
                                    <label htmlFor="mail" className="c-form__label mb-8">メールアドレス</label>
                                    <input type="email" value={email} name="mail" id="mail" className="c-textBox" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="c-form__group">
                                    <label htmlFor="password" className="c-form__label mb-8">パスワード</label>
                                    <input type="password" value={password} name="password" id="password" className="c-textBox" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </>
                        )}
                        <div className="c-form__group">
                            <div className="c-checkBox">
                                <input type="checkbox" name="login" id="login" value="login" className="c-checkBox__input" />
                                <label htmlFor="login" className="c-checkBox__label">ログイン状態を保持する</label>
                            </div>
                        </div>
                        <button type="submit" className="c-btn c-btn__primary c-btn__lg c-btn__full p-login__btn">ログイン</button>
                    </form>
                    <p className="p-login__passwordForget">
                        <a href="" className="c-textLink">パスワードをお忘れの方はこちら</a>
                    </p>
                </div>
                <p className="p-login__credit">提供会社：4designs株式会社&emsp;監修：一般社団法人プロティアン・キャリア協会</p>
            </section>
            <div className="l-footer">
                <p>
                    <a href="" className="l-footer__link">利用規約</a>
                    <span>/</span>
                    <a href="" className="l-footer__link">プライバシーポリシー</a>
                </p>
                <p className="l-footer__copyright">© 4designs Inc.</p>
            </div>
        </div>
    );
};

export default Login;
