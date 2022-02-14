// eslint-disable-next-line import/prefer-default-export
export async function handleAsync<Result>(promise: Promise<Result>): Promise<{
  result?: Result;
  error?: Error;
}> {
  try {
    return { result: await promise };
  } catch (error) {
    return { error: error as Error };
  }
}
