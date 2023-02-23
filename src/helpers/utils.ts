export function getPaginationPayload(page: number, limit: number) {
  return {
    limit,
    offset: (page - 1) * limit,
  };
}
