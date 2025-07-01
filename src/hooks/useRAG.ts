/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import ragApiService from '../services/admin/ragApiService'; // Assuming this service is also typed

// Define interfaces for structured data to ensure type safety

/**
 * Represents the status of a file upload operation.
 */
interface UploadStatus {
  success: boolean;
  message: string;
  documentCount?: number;
  chunksCreated?: number;
  timestamp?: string;
}

/**
 * Represents the result of a RAG query.
 * The structure should be adjusted to match your actual API response.
 */
interface QueryResult {
  // Example structure:
  answer: string;
  source_documents: {
    page_content: string;
    metadata: Record<string, any>;
  }[];
  // Add other properties from your API response as needed
}

/**
 * Defines the return type of the useRAG hook.
 */
interface UseRAGReturn {
  // State
  isLoading: boolean;
  error: string | null;
  uploadStatus: UploadStatus | null;
  queryResult: QueryResult | null;

  // Actions
  uploadData: (data: any) => Promise<any>;
  fetchAndUpload: (apiEndpoint: string, fetchOptions?: RequestInit) => Promise<any>;
  query: (searchQuery: string, maxResults?: number) => Promise<QueryResult | null>;

  // Utilities
  clearError: () => void;
  clearUploadStatus: () => void;
  clearQueryResult: () => void;
}

/**
 * Custom hook for RAG (Retrieval-Augmented Generation) operations.
 * Provides state management and functions for uploading data and querying the RAG system.
 */
export function useRAG(): UseRAGReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);

  // Clear error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Clear upload status
  const clearUploadStatus = useCallback(() => {
    setUploadStatus(null);
  }, []);

  // Clear query result
  const clearQueryResult = useCallback(() => {
    setQueryResult(null);
  }, []);

  // Upload JSON data to RAG
  const uploadData = useCallback(async (data: any) => {
    setIsLoading(true);
    setError(null);
    setUploadStatus(null);

    try {
      const result = await ragApiService.uploadJSONToRAG(data);
      const newUploadStatus: UploadStatus = {
        success: true,
        message: result.message,
        documentCount: result.document_count,
        chunksCreated: result.chunks_created,
        timestamp: result.timestamp,
      };
      setUploadStatus(newUploadStatus);
      return result;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred during upload.';
      setError(errorMessage);
      setUploadStatus({
        success: false,
        message: errorMessage,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data from an API and upload it to RAG
  const fetchAndUpload = useCallback(
    async (apiEndpoint: string, fetchOptions: RequestInit = {}) => {
      setIsLoading(true);
      setError(null);
      setUploadStatus(null);

      try {
        const result = await ragApiService.fetchAndUploadToRAG(apiEndpoint, fetchOptions);
        const newUploadStatus: UploadStatus = {
          success: true,
          message: result.uploadResult.message,
          documentCount: result.uploadResult.document_count,
          chunksCreated: result.uploadResult.chunks_created,
          timestamp: result.uploadResult.timestamp,
        };
        setUploadStatus(newUploadStatus);
        return result;
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'An unexpected error occurred during fetch and upload.';
        setError(errorMessage);
        setUploadStatus({
          success: false,
          message: errorMessage,
        });
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Query the RAG system
  const query = useCallback(
    async (searchQuery: string, maxResults: number = 5): Promise<QueryResult | null> => {
      if (!searchQuery.trim()) {
        setError('Query cannot be empty');
        return null;
      }

      setIsLoading(true);
      setError(null);
      setQueryResult(null);

      try {
        const result: QueryResult = await ragApiService.queryRAG(searchQuery, maxResults);
        setQueryResult(result);
        return result;
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unexpected error occurred during the query.';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    // State
    isLoading,
    error,
    uploadStatus,
    queryResult,

    // Actions
    uploadData,
    fetchAndUpload,
    query,

    // Utilities
    clearError,
    clearUploadStatus,
    clearQueryResult,
  };
}
