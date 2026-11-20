import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, User } from '../types/types';
import { simpleHash } from '../utils/hash';

//read and write any list in AsyncStorage.

async function load<T>(key: string): Promise<T[]> {
  const json = await AsyncStorage.getItem(key);
  return json ? JSON.parse(json) : [];
}

async function save<T>(key: string, list: T[]) {
  await AsyncStorage.setItem(key, JSON.stringify(list));
}

export async function register(username: string, email: string, password: string) {
  const users = await load<User>('users');
  if (users.find((u) => u.email === email)) {
    throw new Error('Email already registered');
  }
  const user = { id: Date.now().toString(), username, email, password: simpleHash(password) };
  await save('users', [...users, user]);
  return user;
}

export async function login(email: string, password: string) {
  const users = await load<User>('users');
  const user = users.find((u) => u.email === email && u.password === simpleHash(password));
  if (!user) throw new Error('Wrong email or password');
  return user;
}

export async function updateUser(user: User, password?: string) {
  const users = await load<User>('users');
  const updated = { ...user, password: password ? simpleHash(password) : user.password };
  await save('users', users.map((u) => (u.id === user.id ? updated : u)));
  return updated;
}

export async function getNotes(userId: string) {
  const notes = await load<Note>('notes');
  return notes.filter((n) => n.userId === userId);
}

export async function addNote(note: Omit<Note, 'id' | 'createdAt'>) {
  const notes = await load<Note>('notes');
  const newNote = { ...note, id: Date.now().toString(), createdAt: new Date().toISOString() };
  await save('notes', [...notes, newNote]);
}

export async function editNote(note: Note) {
  const notes = await load<Note>('notes');
  const edited = { ...note, updatedAt: new Date().toISOString() };
  await save('notes', notes.map((n) => (n.id === note.id ? edited : n)));
}

export async function deleteNote(id: string) {
  const notes = await load<Note>('notes');
  await save('notes', notes.filter((n) => n.id !== id));
}