import { useState, useEffect } from 'react';
import { loadContent } from '@/utils/contentLoader';
import { devLog, devError } from '@/utils/devLogger';

export function useContent() {
    const [content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchContent() {
            devLog('useContent: Starting to fetch content');
            try {
                const data = await loadContent();
                devLog('useContent: Content loaded:', data);
                if (data) {
                    setContent(data);
                    devLog('useContent: Content successfully set to state');
                } else {
                    setError('No content available');
                    devLog('useContent: No content available');
                }
            } catch (err) {
                setError('Failed to load content');
                devError('useContent: Error loading content:', err);
            } finally {
                setIsLoading(false);
                devLog('useContent: Loading finished');
            }
        }

        fetchContent();
    }, []);

    devLog('useContent: Returning content:', content);
    return { content, isLoading, error };
}
