import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const syncData = () => api.get('/sync');
export const importSurvey = (data) => api.post('/import', data);
export const calculateVotes = () => api.get('/vote/calculate');
export const getUniqueSurveyIds = () => api.get('import/unique-ids');

export default api;
