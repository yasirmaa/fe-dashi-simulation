import { config } from '@/lib/config';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const RAG_API_BASE_URL = config.api.ragBaseUrl;

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

// Fetch data from REST API and upload to RAG
// @param {string} apiEndpoint - Source API endpoint
// @param {Object} fetchOptions - Options for fetch request
// @returns {Promise<Object>} Upload result

export async function fetchDataFromAPI(endpoint: string, options = {}) {
  try {
    const response = await fetch(`http://localhost:3000/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function uploadJSONToRAG(data: any) {
  const formData = new FormData();

  if (data instanceof File) {
    // If it's already a File object
    formData.append('file', data);
  } else {
    // If it's a JSON object, convert to File
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const file = new File([blob], 'data.json', { type: 'application/json' });
    formData.append('file', file);
  }

  try {
    const response = await fetch(`${RAG_API_BASE_URL}/data_ingestion`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading JSON to RAG API:', error);
    throw error;
  }
}

export async function fetchAndUploadToRAG(apiEndpoint: string, fetchOptions = {}) {
  try {
    // Step 1: Fetch data from REST API
    console.log('Fetching data from:', apiEndpoint);
    const data = await fetchDataFromAPI(apiEndpoint, fetchOptions);

    console.log('Data fetched successfully:', data);
    // Step 2: Upload to RAG API
    console.log('Uploading to RAG API...');
    const uploadResult = await uploadJSONToRAG(data);

    return {
      success: true,
      fetchedData: data,
      uploadResult: uploadResult,
    };
  } catch (error) {
    console.error('Error in fetchAndUploadToRAG:', error);
    throw error;
  }
}

export async function sendToRAG(endpoint: string) {
  const data = await fetchDataFromAPI(endpoint);

  const response = await fetch('http://127.0.0.1:8000/data_ingestion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: data,
      source_name: endpoint,
      secret_key: config.api.secretKeyAudash,
      metadata: { description: `${endpoint} data from API` },
    }),
  });

  return await response.json();
}

export async function generateChart(query: string) {
  try {
    const response = await fetch('http://127.0.0.1:8000/query_generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        secret_key: config.api.secretKeyAudash,
        limit: 10,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = new Error('Server error') as any;
      error.status = response.status;
      error.data = result;
      throw error;
    }

    return result;
  } catch (error) {
    console.error('❌ Error generating chart:', error);
    throw error;
  }
}

export default {
  uploadJSONToRAG,
  fetchDataFromAPI,
  fetchAndUploadToRAG,
  generateChart,
  sendToRAG,
};
