import React from 'react';
import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from '../types/types';

type NoteLayoutProps = {
  notes: Note[]
}

export default function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams()
  const note = notes.find(n => n.id === id)

  if (note == null) return <Navigate to="/" replace />

  return <Outlet context={note} />
}

export function useNote() {
  return useOutletContext<Note>()
}