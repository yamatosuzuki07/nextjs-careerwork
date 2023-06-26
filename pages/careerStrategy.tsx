import { firestore, auth } from "../lib/FirebaseConfig";
import { useState } from "react";
import { collection, doc, addDoc, terminate } from "firebase/firestore";

const CareerStrategy = () => {
    const [realization, setRealization] = useState('');
    const [personalGoal, setPersonalGoal] = useState('');
    const [organizationGoal, setOrganizationGoal] = useState('');
    const [contact, setContact] = useState('');
    const [futureType, setFutureType] = useState('');
    const [value, setValue] = useState('');
    const [summary, setSummary] = useState('');
    const [vision, setVision] = useState('');
    const [awareness, setAwareness] = useState('');
    // termを定義する
    const [issuesType, setIssuestype] = useState('');
    const [issuesReason, setIssuesReason] = useState('');
    const [monthVision, setMonthVision] = useState('');
    const [monthReason, setMonthReason] = useState('');
    const [futureFormData, setFutureFormData] = useState(['', '', '']);


    const user = auth?.currentUser;

    const handleInputChange = (e, index) => {
        const updateInputChange = [...futureFormData];
        updateInputChange[index] = e.target.value;
        setFutureFormData(updateInputChange);
    };

    const handleSave = async () => {
        if (firestore === undefined || !user) {
            return;
        }

        try {
            const userDocRef = doc(firestore, 'users', user.uid);
            const selfUnderstandingSubColRef = collection(userDocRef, 'selfUnderstanding');
            await addDoc(selfUnderstandingSubColRef, {
                realization: realization,
                personalGoal: personalGoal,
                organizationGoal: organizationGoal,
                contact: contact
            });

            const aboutFutureSubColRef = collection(userDocRef, 'aboutFuture');
            await addDoc(aboutFutureSubColRef, {
                futureType: futureType,
                value: value
            });

            const summarySubColRef = collection(userDocRef, 'summary');
            await addDoc(summarySubColRef, {
                summary: summary
            });

            const accumulationSubColRef = collection(userDocRef, 'accumulation');
            const accumulationDocRef = await addDoc(accumulationSubColRef, {
                vision: vision,
                awareness: awareness,
                // term: terminate,
            });

            const careerIssuesSubColRef = collection(accumulationDocRef, 'careerIssues');
            await addDoc(careerIssuesSubColRef, {
                issuesType: issuesType,
                issuesReason: issuesReason
            });

            const visionSubColRef = collection(accumulationDocRef, 'vision');
            await addDoc(visionSubColRef, {
                monthVision: monthVision,
                monthReason: monthReason
            });

            console.debug('成功！！');
        } catch (error) {
            console.debug('失敗！', error);
        }
    };

    return (
        <form>
            <div>
            <h2>自己理解（アイデンティティのまとめ）</h2>
                <label>
                    ライフラインチャートからの気づき（過去への意味づけ、その時発揮された強み、価値観）:
                    <input type="text" value={realization} onChange={(e) => setRealization(e.target.value)} />
                </label>
                <label>
                    個人のパーパス:
                    <input type="text" value={personalGoal} onChange={(e) => setPersonalGoal(e.target.value)} />
                </label>
                <label>
                    企業または組織のパーパス
                    <input type="text" value={organizationGoal} onChange={(e) => setOrganizationGoal(e.target.value)} />
                </label>
                <label>
                    個人と組織のパーパスの接点
                    <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
                </label>
            </div>
            <div>
            <h2>将来のスキル・人脈（各項目は1つ以上入力してください）</h2>
                <label>
                    磨きたいスキル:
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                    {/* <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} /> */}
                </label>
                <label>
                    獲得したい経験:
                    <input type="email" value={tasks} onChange={(e) => setTasks(e.target.value)} />
                </label>
            </div>
            <label>
                強化したい人材ネットワーク（社内）:
                <input type="text" value={businessCapital} onChange={(e) => setBusinessCapital(e.target.value)} />
            </label>
            <label>
                強化したい人材ネットワーク（社外）:
                <input type="text" value={socialCapital} onChange={(e) => setSocialCapital(e.target.value)} />
            </label>
            <label>
                学び得たことキャリアの教訓など:
                <input type="text" value={carrerLessons} onChange={(e) => setCarrerLessons(e.target.value)} />
            </label>
        </form>
    )
}

export default CareerStrategy;
