import { AnyObject } from '@/types';
import { UseFormSetError, FieldValues, FieldPath } from 'react-hook-form';

/**
 * Sleep forcefully
 * @param ms : number
 * @returns unknown
 */
export function sleep(ms = 2000): Promise<unknown> {
  console.log('Kindly remember to remove `delay`');
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Set Hook form validation error
 * @param setError UseFormSetError<TPayload>
 * @param errors AnyObject
 */
export const setServerFormErrors = <TPayload extends FieldValues>(
  setError: UseFormSetError<TPayload>,
  errors: AnyObject
): void => {
  for (const [name, errorMsg] of Object.entries(errors)) {
    setError(name as FieldPath<TPayload> | `root.${string}` | 'root', {
      type: 'server',
      message: errorMsg as string,
    });
  }
};
