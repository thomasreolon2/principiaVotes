export const formatDate = (dateStr) => {
  if (!dateStr) return null; 
  const [day, month, year] = dateStr.split('/');
  if (!day || !month || !year) return null; 
  return `${year}-${month}-${day}`;
};

