export const catchErrorHandler = (e: unknown, requestsName: string) => {
  if (e instanceof Error) {
    console.error(`${requestsName} error:`, e.message);
    throw e;
  } else {
    console.error('Unexpected error:', e);
    throw new Error('An unexpected error occurred');
  }
};
