import { useState } from 'react';

function DynamicForm() {
    const [forms, setForms] = useState<{ field1: string; field2: string; }[]>([]);
    const [test, setTest] = useState({});


    const addForm = () => {
        setForms([...forms, { field1: '', field2: '' }]);
        setTest({ test: 'test', test1: 'test' });
        console.debug(test);
        console.debug(forms);
    };

    const removeForm = (index) => {
        setForms(forms.filter((_, i) => i !== index));
        console.debug(forms);
    };

    const handleInputChange = (index, field, value) => {
        const updatedForms = [...forms];
        updatedForms[index][field] = value;
        setForms(updatedForms);
    };

    const handleSubmit = () => {
        // フォームデータの送信処理を行う
        console.log(forms);
    };

    return (
        <div>
            {forms.map((form, index) => (
                <div key={index}>
                    <label>
                        Field 1:
                        <input
                            type="text"
                            value={form.field1}
                            onChange={(e) => handleInputChange(index, 'field1', e.target.value)}
                        />
                    </label>
                    <label>
                        Field 2:
                        <input
                            type="text"
                            value={form.field2}
                            onChange={(e) => handleInputChange(index, 'field2', e.target.value)}
                        />
                    </label>
                    <button onClick={() => removeForm(index)}>削除</button>
                </div>
            ))}
            <h2>社会変化に目を向ける</h2>
            <ul>
                <li>観点: 3〜5年後に起こり得る変化は？</li>
                <li>変化を知るためにできる小さな行動</li>
                <li>
                    社会:
                    <ul>
                        <li>データ</li>
                        <li>データ</li>
                    </ul>
                </li>
                <li>
                    業界:
                    <ul>
                        <li>データ</li>
                        <li>データ</li>
                    </ul>
                </li>
                <li>
                    職種:
                    <ul>
                        <li>データ</li>
                        <li>データ</li>
                    </ul>
                </li>
                <li>
                    プライベート:
                    <ul>
                        <li>データ</li>
                        <li>データ</li>
                    </ul>
                </li>
            </ul>
            <button onClick={addForm}>追加</button>
            <button onClick={handleSubmit}>送信</button>
        </div>
    );
}

export default DynamicForm;