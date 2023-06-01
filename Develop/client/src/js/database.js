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
  const txn = jateDb.transaction('jate', 'readwrite');
  const str = txn.objectStore('jate');
  const req = str.put({ id: 1, value: content });
  const res = await req;
  console.log('putDb result =  ', res.value);
 }

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
