import { useState } from "react";
import { firestore, auth } from "../lib/FirebaseConfig";
import { collection, doc, addDoc } from "firebase/firestore";

const AdaptabilitiesPage = () => {
    const [socialChange, setSocialChange] = useState('');
    const [socialAction, setSocialAction] = useState('');
    const [industryChange, setIndustryChange] = useState('');
    const [industryAction, setIndustryAction] = useState('');
    const [professionalChange, setProfessionalChange] = useState('');
    const [professionalAction, setProfessionalAction] = useState('');
    const [privateChange, setPrivateChange] = useState('');
    const [privateAction, setPrivateAction] = useState('');
    const [strongPoint, setStrongPoint] = useState('');
    const [weakPoint, setWeakPoint] = useState('');
    const [chance, setChance] = useState('');
    const [risk, setRisk] = useState('');


    const user = auth?.currentUser;
    console.debug(user?.uid);

    const handleSave = async () => {
        try {
            if (firestore === undefined || !user) {
                return;
            }
            const userDocRef = doc(firestore, 'users', user.uid);
            const swotAnalyticsColRef = collection(userDocRef, 'swotAnalytics');
            const adaptabilitiesColRef = collection(userDocRef, 'adaptabilities');
            await addDoc(adaptabilitiesColRef, {
                perspective: '社会',
                change: socialChange,
                action: socialAction
            });
            await addDoc(adaptabilitiesColRef, {
                perspective: '業界',
                change: industryChange,
                action: industryAction
            });
            await addDoc(adaptabilitiesColRef, {
                perspective: '職種',
                change: professionalChange,
                action: professionalAction
            });
            await addDoc(adaptabilitiesColRef, {
                perspective: 'プライベート',
                change: privateChange,
                action: privateAction
            });

            const newswotAnalyticsDoc = await addDoc(swotAnalyticsColRef, {
                strongPoint: strongPoint,
                weakPoint: weakPoint,
                chance: chance,
                risk: risk,
            });
            console.debug('成功、adaptabilities');
        } catch (error) {
            console.debug('失敗、adaptabilities', error);
        };
    };

    return (
        <div>
            <div>
                <h1>アダプタビリティ</h1>
                <h3>社会変化に目を向ける</h3>
                <p>
                    <label>社会</label>
                </p>
                <label>
                    変化の理由:
                    <input type="text" value={socialChange} onChange={(e) => setSocialChange(e.target.value)}/>
                </label>
                <label>
                    具体的な行動:
                    <input type="text" value={socialAction} onChange={(e) => setSocialAction(e.target.value)}/>
                </label>
                <p>
                    <label>業界</label>
                </p>
                <label>
                    変化の理由:
                    <input type="text" value={industryChange} onChange={(e) => setIndustryChange(e.target.value)}/>
                </label>
                <label>
                    具体的な行動:
                    <input type="text" value={industryAction} onChange={(e) => setIndustryAction(e.target.value)}/>
                </label>
                <p>
                    <label>職種</label>
                </p>
                <label>
                    変化の理由:
                    <input type="text" value={professionalChange} onChange={(e) => setProfessionalChange(e.target.value)} />
                </label>
                <label>
                    具体的な行動:
                    <input type="text" value={professionalAction} onChange={(e) => setProfessionalAction(e.target.value)} />
                </label>
                <p>
                    <label>プライベート</label>
                </p>
                <label>
                    変化の理由:
                    <input type="text" value={privateChange} onChange={(e) => setPrivateChange(e.target.value)} />
                </label>
                <label>
                    具体的な行動:
                    <input type="text" value={privateAction} onChange={(e) => setPrivateAction(e.target.value)} />
                </label>
            </div>
            <h1>自分SWOT分析</h1>
            <label>
                自分の強み:
                <input type="text" value={strongPoint} onChange={(e) => setStrongPoint(e.target.value)} />
            </label>
            <label>
                自分の弱み:
                <input type="text" value={weakPoint} onChange={(e) => setWeakPoint(e.target.value)} />
            </label>
            <label>
                キャリアにおける機会（チャンス）:
                <input type="text" value={chance} onChange={(e) => setChance(e.target.value)} />
            </label>
            <label>
                キャリアにおける脅威（リスク）:
                <input type="text" value={risk} onChange={(e) => setRisk(e.target.value)} />
            </label>
            <button onClick={handleSave}>保存する</button>
        </div >
    );

};

export default AdaptabilitiesPage;