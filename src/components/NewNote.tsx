import React from 'react';
import { NoteData, Tag } from '../types/types';
import NoteForm from './NoteForm';

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
  }

const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
    return(
        <>
            <h1 className='mb-4'>New Note</h1>
            <NoteForm
                onSubmit={onSubmit}
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </>
    );
};

export default NewNote;
