import { Note } from '../types/types';

// Pinned notes first, then by date added newest first unless told otherwise

export function sortNotes(notes: Note[], newestFirst = true) {
  return [...notes].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return newestFirst ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt);
  });
}