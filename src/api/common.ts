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
  const data = fetchResult.docs[0]?.data(); // fetchResult의 첫 번째 문서에서 데이터를 가져옴
  const lastId = data?.id || 0; // 데이터의 id가 존재하면 lastId에 할당, 없으면 0을 할당

  return Number(lastId) + ESelectValue[selectValue];
};
