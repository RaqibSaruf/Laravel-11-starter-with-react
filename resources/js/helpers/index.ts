/**
 *
 * @param ms : number
 * @returns unknown
 */
export function delayResponse(ms = 2000): Promise<unknown> {
  console.log('Kindly remember to remove `delay`');
  return new Promise((resolve) => setTimeout(resolve, ms));
}
