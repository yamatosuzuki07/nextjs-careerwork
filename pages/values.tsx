import { useState } from 'react';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { firestore, auth } from '../lib/FirebaseConfig';
import { valuesTags } from '../lib/enum';

const Identity = () => {
    const [period, setPeriod] = useState('');
    const [mainEvent, setMainEvent] = useState('');
    const [businessCapital, setBusinessCapital] = useState('');
    const [socialCapital, setSocialCapital] = useState('');
    const [lesson, setLesson] = useState('');
    const [date, setDate] = useState('');
    const [satisfaction, setSatisfaction] = useState('');
    const [effort, setEffort] = useState('');
    const [formCount, setFormCount] = useState(1);
    const [tag, setTag] = useState('');
    const [events, setEvents] = useState([{ date: '12/12', satisfaction: 70, effort: 'test' }, { date: '5/12', satisfaction: 90, effort: 'testtesttestetste' }]);
    const [careerCharts, setCareerCharts] = useState([{
        period: '',
        mainEvent: '',
        businessCapital: '',
        socialCapital: '',
        lesson: ''
    }, {
        period: '',
        mainEvent: '',
        businessCapital: '',
        socialCapital: '',
        lesson: ''
    }]);

    const user = auth?.currentUser;

    const handleAddForm = () => {
        setEvents([
            ...events,
            { date: '3/12', satisfaction: 40, effort: 'testaaaa' }
        ]);
    };

    const handleAddCareerForm = () => {

    };

    const handleDeleteForm = (index) => {
        console.debug(index);
        if (events.length > 1) {
            events.splice(index, 1);
            setEvents([...events]);
            // ↑確認
        }
    };

    const handleInputChange = (event, index) => {
        const newEvents = [...events];
        const { name, value } = event.target;
        newEvents[index][name] = value;
        setEvents(newEvents);
    }


    const handleSave = async () => {

        if (firestore === undefined || !user) {
            return;
        }
        try {
            const userDocRef = doc(firestore, 'users', user.uid);
            const carriersSubColRef = collection(userDocRef, 'carriers');
            const carriersDocRef = await addDoc(carriersSubColRef, {
                period: period,
                mainEvent: mainEvent,
                businessCapital: businessCapital,
                socialCapital: socialCapital,
                lesson: lesson
            });

            console.debug('carriesサブコレクション作成、ドキュメント作成完了');

            const eventsSubColRef = collection(carriersDocRef, 'events');
            console.debug('作成前の', events);
            events.forEach(async (test) => {
                await addDoc(eventsSubColRef, {
                    date: test.date,
                    satisfaction: test.satisfaction,
                    effort: test.effort
                });
            })

            console.debug('eventsサブコレクション作成、ドキュメント作成完了');


        } catch (error) {
            console.debug('エラーが発生', error);
        }

    };

    return (
        <div>
            <form>
                {careerCharts.map((careerChart, index) => (

                ))}
                    <label>
                        期間:
                        <input type="text" value={period} onChange={(e) => setPeriod(e.target.value)} />
                    </label>
                    <label>
                        主な出来事:
                        <input type="text" value={mainEvent} onChange={(e) => setMainEvent(e.target.value)} />
                    </label>
                    {events.map((event, index) => (
                        <div key={index}>
                            <label>
                                年月:
                                <input type="text" name="date" value={event.date} onChange={event => handleInputChange(event, index)} />
                            </label>
                            <label>
                                満足度:
                                <input type="text" name="satisfaction" value={event.satisfaction} onChange={event => handleInputChange(event, index)} />
                            </label>
                            <label>
                                担当した仕事、取り組んだこと:
                                <input type="text" name="effort" value={event.effort} onChange={event => handleInputChange(event, index)} />
                            </label>
                            <button type="button" onClick={handleAddForm}>+追加する</button>
                            <button type="button" onClick={() => handleDeleteForm(index)}>削除</button>
                        </div>
                    ))}
                    <label>
                        ビジネス資本:
                        <input type="text" value={businessCapital} onChange={(e) => setBusinessCapital(e.target.value)} />
                    </label>
                    <label>
                        社会関係資本:
                        <input type="text" value={socialCapital} onChange={(e) => setSocialCapital(e.target.value)} />
                    </label>
                    <label>
                        学び得たことキャリアの教訓など:
                        <input type="text" value={lesson} onChange={(e) => setLesson(e.target.value)} />
                    </label>
                    <p>
                        <button type="button" onClick={handleAddCareerForm}>+追加する</button>
                        <button type="button" onClick={handleSave}>保存</button>
                    </p>
            </form>
        </div>
    );
};

export default Identity;