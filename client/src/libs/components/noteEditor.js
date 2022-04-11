import React, { useContext, useEffect, useRef, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { LoginContext } from "../hooks/loginHook";


function NoteEditor(props) {
    const loginCont = useContext(LoginContext);
    const editorRef = useRef(null);
    const [noteContent, setNoteContent] = useState(null);

    useEffect(() => {
        let apiUrl = 'https://fn-noteapp-server.azurewebsites.net';

        let completeApi = `${apiUrl}/api/GetNoteContent?email=${encodeURIComponent(loginCont.loginState.email)}&note=${encodeURIComponent(props.noteName)}`;

        fetch(completeApi, {
            method: "GET"
        })
            .then(res => res.text())
            .then(data => {
                setNoteContent(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    let contentDisp = null
    if (noteContent !== null) {
        contentDisp = <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={noteContent}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
    }

    return <div>
        Edititing Note {props.noteName}

        {contentDisp}
    </div>
}

export default NoteEditor;