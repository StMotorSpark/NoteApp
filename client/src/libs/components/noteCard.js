import React from "react";


function NoteCard(props) {
    return <div onClick={() => {
        props.noteSelect(props.name)
    }}>
        {props.name}
        {props.created}
    </div>
}

export default NoteCard;