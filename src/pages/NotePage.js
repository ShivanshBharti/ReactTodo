import React, {useState,useEffect}  from 'react'
// import notes from '../assets/data';
import { Link } from 'react-router-dom';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = ({match, history}) => {
    let noteID = match.params.id
    // let note = notes.find(note => note.id === Number(noteID))
    let[note,setNote] = useState(null)

    useEffect(() => {
        getNote()
    },[noteID])

    let getNote = async() => {
        if(noteID === 'new') return
        let response = await fetch(`http://127.0.0.1:8000/notes/${noteID}`)
        let data= await response.json()
        setNote(data)
    }


    let createNote = async()=> {
        await fetch(`http://127.0.0.1:8000/notes/`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }



    let updateNote = async()=> {
        await fetch(`http://127.0.0.1:8000/notes/${noteID}`, {
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }


    let deleteNote = async() => {
        await fetch(`http://127.0.0.1:8000/notes/${noteID}`, {
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        history.push('/')

    }

    let handleSubmit = () => {

        if(noteID !== 'new' && !note.body){
            deleteNote()
        } else if(noteID !== 'new') {
            updateNote()
        } else if (noteID === 'new' && note !== null){
            createNote()
        }

        history.push('/')
    }

    console.log("noteID:",noteID);
    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <ArrowLeft onClick={handleSubmit}/>
                    </Link>
                </h3>
                {noteID !== 'new' ?(
                    <button onClick={deleteNote}>Delete</button>
                ):(
                    <button onClick={handleSubmit}>Done</button>
                )}
                
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}>

            </textarea>
        </div>
    )
}

export default NotePage
