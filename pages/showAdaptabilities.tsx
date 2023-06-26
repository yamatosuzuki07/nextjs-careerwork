import { firestore, auth } from "../lib/FirebaseConfig";
import { collection, query, doc, where, getDocs, DocumentData, QueryDocumentSnapshot, CollectionReference } from 'firebase/firestore';
import React from "react";
import { useState, useEffect, useCallback } from "react";

const ShowAdaptabilitiesPage = () => {
    const [adaptabilitiesArray, setAdaptabilitiesArray] = useState<DocumentData[]>([]);
    const [swotAnalyticsArray, setSwotAnalyticsArray] = useState<DocumentData[]>([]);
    // const [swotAnalyticsColRef, setSwotAnalyticsColRef] = useState<DocumentData | null>(null);

    const adaptaFetchData = useCallback(async (adaptaColRef: CollectionReference<DocumentData>) => {
        try {
            const adaptaQuerySnapShot = await getDocs(adaptaColRef);
            // const swotQuerySnapShot = await getDocs(swotAnalyticsColRef);
            const adaptaData: DocumentData[] = [];
            adaptaQuerySnapShot.forEach((doc) => {
                adaptaData.push(doc.data());
            });
            setAdaptabilitiesArray(adaptaData);



            // const order = ['社会', '業界', '職種', 'プライベート'];

            // adaptabilitiesColRef.sort((a, b) => {
            //     const indexA = order.indexOf(a.perspective);
            //     const indexB = order.indexOf(b.perspective);

            //     return indexA - indexB;
            // });
            // console.debug(adaptabilitiesColRef);
        } catch (error) {
            console.debug('エラー', error);
        }
    }, []);

    const swotFetchData = useCallback(async (swotAnalyticsColRef: CollectionReference<DocumentData>) => {
        try {
            const swotQuerySnapShot = await getDocs(swotAnalyticsColRef);
            const swotData: DocumentData[] = [];
            swotQuerySnapShot.forEach((doc) => {
                swotData.push(doc.data());
            });
            setSwotAnalyticsArray(swotData);
            // console.debug(swotAnalyticsArray);

        } catch (error) {
            console.debug('エラー', error);
        }

    }, [])

    useEffect(() => {
        const user = auth?.currentUser;
        if (firestore === undefined || !user) {
            return;
        }
        const userDocRef = doc(firestore, 'users', user.uid);
        const adaptaColRef = collection(userDocRef, 'adaptabilities');
        const swotAnalyticsColRef = collection(userDocRef, 'swotAnalytics');

        adaptaFetchData(adaptaColRef);
        swotFetchData(swotAnalyticsColRef);

    }, [adaptaFetchData, swotFetchData]);

    return (
        <div>
            <div>
                <h1>アダプタビリティ</h1>
            </div>
            <div>
                <h2>社会変化に目を向ける</h2>
            </div>
            <div>
                <table>
                    <tr>
                        <th>観点</th>
                        <th>3〜5年後に起こり得る変化は？</th>
                        <th>変化を知るためにできる小さな行動</th>
                    </tr>
                    <tr>
                        {adaptabilitiesArray.map((value, index) => (
                            <React.Fragment key={index}>
                                <td>{value.perspective}</td>
                                <td>{value.change}</td>
                                <td>{value.action}</td>
                            </React.Fragment>
                        ))}
                    </tr>
                </table>
            </div>
            <div>
                <h2>自分SWOT分析</h2>
            </div>
            <div>
                {swotAnalyticsArray.map((value, index) => (
                    <React.Fragment key={index}>
                        <p>自分の強み:{value.strongPoint}</p>
                        <p>自分の弱み:{value.weakPoint}</p>
                        <p>キャリアにおける機会（チャンス）:{value.chance}</p>
                        <p>キャリアにおける脅威（リスク）:{value.risk}</p>
                    </React.Fragment>
                ))}
            </div>

        </div>

    )
}

export default ShowAdaptabilitiesPage;
