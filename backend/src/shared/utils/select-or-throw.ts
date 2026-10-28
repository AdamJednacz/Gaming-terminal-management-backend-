export const selectOrThrow = async <T>(
  selectResult: Promise<T>,
  error: Error,
) => {
  const entity = await selectResult;
  if (!entity) {
    throw error;
  }
  return entity;
};
