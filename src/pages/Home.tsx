import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonBadge } from '@ionic/react';
import './Home.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { db as dexieDb, Fruit } from '../firebase/dexie';
import { useNetwork } from '../hooks/useNetwork';
import { useLiveQuery } from 'dexie-react-hooks';
import TaskInput from '../components/TaskInput';
import TaskList, { Task } from '../components/TaskList';
import ContactInput from '../components/ContactInput';
import ContactList from '../components/ContactList';
import ContactItem, { Contact } from '../components/ContactItem';
import FruitInput from '../components/FruitInput';
import FruitList from '../components/FruitList';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

const TASKS_KEY = 'todos';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const isOnline = useNetwork();
  const history = useHistory();

  const fruits = useLiveQuery(async () => {
    return await dexieDb.fruits.toArray();
  }) || [];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Tasks
  useEffect(() => {
    const raw = localStorage.getItem(TASKS_KEY);
    if (raw) {
      try {
        setTasks(JSON.parse(raw));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Contacts - Load from Firebase on mount
  useEffect(() => {
    if (isOnline) {
      loadContactsFromFirebase();
    }
  }, [isOnline]);

  const loadContactsFromFirebase = async () => {
    try {
      const contactsRef = collection(db, 'contacts');
      const snapshot = await getDocs(contactsRef);
      setContacts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Omit<Contact, 'id'> })));
    } catch (err) {
      console.error('Error loading contacts:', err);
    }
  };

  const addContact = async (name: string, email: string) => {
    if (!isOnline) return;
    try {
      const contactsRef = collection(db, 'contacts');
      await addDoc(contactsRef, { name, email });
      await loadContactsFromFirebase();
    } catch (err) {
      console.error('Error adding contact:', err);
    }
  };

  const deleteContact = async (id: string) => {
    if (!isOnline) return;
    try {
      await deleteDoc(doc(db, 'contacts', id));
      setContacts(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  // Fruits
  const addFruit = async (name: string, color: string) => {
    await dexieDb.fruits.add({ name, color });
  };

  const deleteFruit = async (id: number) => {
    await dexieDb.fruits.delete(id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Challenge 06</IonTitle>
          <IonBadge slot="end" color={isOnline ? 'success' : 'danger'}>
            {isOnline ? 'Online' : 'Offline'}
          </IonBadge>
          <IonButton slot="end" fill="clear" onClick={handleLogout}>
            Logout
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Challenge 06</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ padding: '1rem' }}>
          {/* Contacts - Firebase */}
          <div style={{ marginBottom: '2rem' }}>
            <h2>Contactos (Firebase)</h2>
            <ContactInput onAdd={addContact} disabled={!isOnline} />
            <ContactList contacts={contacts} onDelete={deleteContact} disabled={!isOnline} />
          </div>

          {/* Tasks */}
          <div style={{ marginBottom: '2rem' }}>
            <h2>Tareas (RealTime)</h2>
            <TaskInput onAdd={addTask} />
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
          </div>

          {/* Fruits - Dexie */}
          <div style={{ marginBottom: '2rem' }}>
            <h2>Frutas (Dexie - Local)</h2>
            <FruitInput onAdd={addFruit} />
            <FruitList fruits={fruits} onDelete={deleteFruit} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
