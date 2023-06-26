import React, { useState } from 'react';
// import MyApp from './_app';
import firebase from 'firebase/app';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { getAuth, Auth } from "firebase/auth";
import { auth } from "../lib/FirebaseConfig";

function generatePassword() {
  const password = Math.floor(10000000 + Math.random() * 90000000).toString();
  return password;
}

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [kanaName, setKanaName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleRegistration = async () => {
    const password = generatePassword();

    try {
      // authはgetAuth()で取得した値
      // const auth = getAuth();
      if (auth === undefined) {
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const db = getFirestore();
      await addDoc(collection(db, "users"), {
        name,
        kanaName,
        age,
        gender,
        email,
        department,
        position,
        remarks,
        userId: user.uid
      });
      console.log('Registration successful!');

      if (user) {
        await sendPasswordResetEmail(auth, email);
        console.log('メールの送信に成功!');
      } else {
        console.log('メールの送信に失敗しました。');
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <form>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Kana Name:
        <input type="text" value={kanaName} onChange={(e) => setKanaName(e.target.value)} />
      </label>
      <label>
        Age:
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <label>
        Gender:
        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Department:
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
      </label>
      <label>
        Position:
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
      </label>
      <label>
        Remarks:
        <input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
      </label>
      <button type="button" onClick={handleRegistration}>登録する</button>
    </form>
  );
};

export default RegistrationForm;
