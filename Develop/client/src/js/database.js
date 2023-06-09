import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
  console.log('In putDb ');
  const pwaDb = await openDB('jate', 1);
  const txn = pwaDb.transaction('jate', 'readwrite');
  const str = txn.objectStore('jate');
  const req = str.put({ id: 1, value: content });
  const res = await req;
  console.log('putDb result =  ', res.value);
 }

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('In getDb');
  const pwaDb = await openDB('jate', 1);
  const txn = pwaDb.transaction('jate', 'readonly');
  const str = txn.objectStore('jate');
  const req = str.get(1);
  const res = await req;
  res
    ? console.log('data got from the database', res.value)
    : console.log('data not found in the database');
  return res?.value;
} 

initdb();
