"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContentModal } from '@/components/ContentModal';
import { usePost } from '@/hooks/usePost';
import { devLog } from '@/utils/devLogger';

export default function PostPage({ params }) {
  const router = useRouter();
  const { selectedPost, isModalOpen, isLoading, error, openPost, closePost } = usePost();
  
  useEffect(() => {
    async function loadParams() {
      const { id } = await params;
      console.log('PostPage rendered with id:', id);
      if (id) {
        openPost(id);
      }
    }
    loadParams();
  }, [params, openPost]);

  const handleClose = () => {
    closePost();
    router.push('/');  
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedPost) return <div>Post not found</div>;

  return (
    <div>
      <ContentModal 
        isOpen={isModalOpen}
        onClose={handleClose}
        post={selectedPost}
      />
    </div>
  );
}
