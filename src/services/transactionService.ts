// src/services/transactionService.ts
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getDeviceId } from './deviceId';

export async function addTransaction(transaction: any) {
  const deviceId = await getDeviceId();

  const transactionsRef = collection(
    db,
    'users',
    deviceId,
    'transactions'
  );

  await addDoc(transactionsRef, transaction);
}

export async function fetchTransactions() {
  const deviceId = await getDeviceId();

  const querySnapshot = await getDocs(
    collection(db, 'users', deviceId, 'transactions')
  );

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function deleteTransaction(id: string) {
  const deviceId = await getDeviceId();

  const ref = doc(
    db,
    "users",
    deviceId,
    "transactions",
    id
  );

  await deleteDoc(ref);
}
