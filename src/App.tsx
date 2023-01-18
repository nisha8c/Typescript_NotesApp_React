import React, { useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useLocalStorage } from "./useLocalStorage"
import NewNote from './components/NewNote'
import { NoteData, RawNote, Tag } from './types/types';
import { v4 as uuidV4 } from 'uuid';

function App() {
  const [ notes, setNotes ] = useLocalStorage<RawNote[]>("NOTES", []);
  const [ tags, setTags ] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...notes, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  const updateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  const deleteTag = (id: string) => {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<NoteList />}>Home</Route>

        <Route
          path='/new'
          element={
          <NewNote
            onSubmit={onCreateNote}
            onAddTag={addTag}
            availableTags={tags}
          />}>New
        </Route>

        <Route path='/:id' element={<h1>Hi</h1>}>
          <Route index element={<h1>Show</h1>} />
          <Route path='edit' element={<h1>Edit</h1>} />
        </Route>

        <Route path='*' element={<Navigate to='/'></Navigate>}>New</Route>
      </Routes>
    </Container>
    
  );
}

export default App;
