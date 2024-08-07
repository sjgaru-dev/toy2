import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';

import { db } from '@/api';

export interface GenIdProps {
  collectionName: string;
  selectValue?: 'next' | 'now';
}

enum ESelectValue {
  now,
  next,
}

export const getCollectionId = async ({
  collectionName,
  selectValue = 'next',
}: GenIdProps): Promise<number> => {
  const fetchResult = await getDocs(
    query(collection(db, collectionName), orderBy('id', 'desc'), limit(1))
  );
  const data = fetchResult.docs[0].data();
  const lastId = data.id;

  return Number(lastId) + ESelectValue[selectValue];
};
