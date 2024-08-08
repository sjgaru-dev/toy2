import { addDoc, collection, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from '@/api';
import { getCollectionId } from '@/api/common';
import { FIRESTORE_COLLECTION, STORAGE_FOLDER } from '@/constants/api';
import { ApiResponse, PayrollResponseType, SalaryResponseType } from '@/types/api';
import { AttachProps, CorrectionProps, SalaryType } from '@/types/payroll';
import { getUID } from '@/utils/auth';
import { calcTax } from '@/utils/salary';

export const addCorrection = async (
  props: CorrectionProps
): Promise<ApiResponse<PayrollResponseType>> => {
  const id = await getCollectionId({
    collectionName: FIRESTORE_COLLECTION.salaryRequest,
    selectValue: 'next',
  });

  const data: CorrectionProps = {
    id,
    salaryId: await getCollectionId({
      collectionName: FIRESTORE_COLLECTION.salary,
      selectValue: 'now',
    }),
    userNo: await getUID(),
    requestDate: props.requestDate,
    status: props.status,
    subject: props.subject,
    content: props.content,
    type: props.type,
    attachFile: [],
  };

  const docRef = await addDoc(collection(db, FIRESTORE_COLLECTION.salaryRequest), data);
  const docId = docRef.id;

  if (props.attachFile) {
    const attachUrls = await Promise.all(
      props.attachFile.map(async (item) => {
        const url = await addAttach({ file: item, docId, data });
        return url;
      })
    );

    await updateDoc(docRef, { attach: attachUrls });
  }

  return { status: 'succeeded', response: true };
};

export const addAttach = async ({ file, docId, data }: AttachProps): Promise<string> => {
  const path = `${STORAGE_FOLDER.correction}/${data.userNo}/${docId}/${file.name}`;
  const locationRef = ref(storage, path);

  const result = await uploadBytes(locationRef, file);
  const url = await getDownloadURL(result.ref);

  return url;
};

export const getSalarys = async (): Promise<ApiResponse<SalaryResponseType>> => {
  const fetchResult = await getDocs(
    query(
      collection(db, FIRESTORE_COLLECTION.salary),
      where('userNo', '==', await getUID()),
      orderBy('id', 'desc')
    )
  );
  const salaryList: SalaryType[] = fetchResult.docs.map((doc) => ({ ...doc.data() }) as SalaryType);

  const addTaxSalaryList: SalaryType[] = salaryList.map(
    (item) =>
      ({
        ...item,
        receiveData: calcTax(item.paycheck) || '',
      }) as SalaryType
  );

  return { status: 'succeeded', response: addTaxSalaryList };
};

export const fetchCorrectionHistory = async () => {
  const querySnapshot = await getDocs(
    query(collection(db, FIRESTORE_COLLECTION.salaryRequest), orderBy('requestDate', 'desc'))
  );
  const history = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as CorrectionProps[];
  return { data: history };
};
