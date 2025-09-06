import { useState, useEffect } from 'react';
import { LoadingState } from '@/types';

/**
 * Custom hook for managing async operations with loading, error, and success states
 */
export function useAsyncOperation<T>() {
  const [state, setState] = useState<LoadingState & { data?: T }>({
    isLoading: false,
    error: null,
    success: false,
    data: undefined,
  });

  const execute = async (asyncFn: () => Promise<T>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null, success: false }));
    
    try {
      const result = await asyncFn();
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        data: result, 
        success: true 
      }));
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage, 
        success: false 
      }));
      throw error;
    }
  };

  const reset = () => {
    setState({
      isLoading: false,
      error: null,
      success: false,
      data: undefined,
    });
  };

  return {
    ...state,
    execute,
    reset,
  };
}