// src/hooks/usePost.js
import { useState, useCallback } from 'react';
import { loadPostDetails } from '@/utils/postLoader';

export function usePost() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const openPost = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const postDetails = await loadPostDetails(id);
      setSelectedPost(postDetails);
      setIsModalOpen(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const closePost = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPost(null);
  }, []);

  return {
    selectedPost,
    isModalOpen,
    isLoading,
    error,
    openPost,
    closePost
  };
}

