import dynamic from 'next/dynamic';
import { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw, EditorProps } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { firestore } from '../lib/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

const PostForm = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const savePost = async () => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const html = convertToHTML(rawContentState);

        try {
            if (firestore === undefined) {
                return;
            }
            const genreDoc = await addDoc(collection(firestore, 'genres'), {});
            await addDoc(collection(firestore, 'posts'), {
                contents: html,
                genreRef: genreDoc.id,
            });
            // firestore.collection('posts').add({
            //     contents: html,
            //     genreRef: genreDoc.id,
            // });
            console.debug('保存成功');
        } catch (error) {
            console.debug('保存失敗');
        }
    };

    return (
        <div>
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
            />
            <button onClick={savePost}>投稿を保存</button>
        </div>
    );
};

export default PostForm;