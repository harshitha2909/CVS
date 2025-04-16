export const getPagination = (page = 1, limit = 50) => {
  const parsedPage = Math.max(1, parseInt(page.toString(), 10));
  const offset = (parsedPage - 1) * limit;
  return { offset, limit };
};
