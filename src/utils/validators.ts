import { ValidProps } from '@/types/props';

export const inputValid = ({ value, regex }: ValidProps) => regex.test(value.trim());
