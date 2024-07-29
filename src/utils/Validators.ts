import { validProps } from '../types/props';

export const inputValid = ({ value, regex }: validProps) => regex.test(value.trim());
