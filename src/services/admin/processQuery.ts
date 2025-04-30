import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function postProcessQuery(inputPrompt: string) {
  try {
    const response = await axiosInstance.post('/process_query', {
      query: inputPrompt,
    });
    return response;
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    throw error;
  }
}
