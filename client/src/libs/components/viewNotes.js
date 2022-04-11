import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../hooks/loginHook";
import NoteCard from "./noteCard";
import NoteEditor from "./noteEditor";

function NoteViewer(props) {
    const loginCont = useContext(LoginContext);
    const [notes, setNotes] = useState(null);

    useEffect(() => {
        let apiUrl = 'https://fn-noteapp-server.azurewebsites.net';

        let completeApi = `${apiUrl}/api/GetNotes?email=${encodeURIComponent(loginCont.loginState.email)}`;

        fetch(completeApi, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            setNotes(data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    let notDisp = null;
    if(notes !== null) {
        notDisp = notes.map(note => {
            return <NoteCard 
                {...note}
                noteSelect={props.setActiveNote}
                key={note.name}
            />
        })
    }

    return <div>
        {notDisp}
    </div>
}

function ViewNotes() {
    const loginCont = useContext(LoginContext);
    const [activeNote, setActiveNote] = useState(null);

    if (loginCont.loginState === null) {
        return null
    }

    let activeNoteDisplay = null;
    if(activeNote) {
        //TODO create note view
        activeNoteDisplay = <NoteEditor key={activeNote} noteName={activeNote} />
    }

    return <div>
        <NoteViewer setActiveNote={setActiveNote} />
        {activeNoteDisplay}
    </div>
}

export default ViewNotes;