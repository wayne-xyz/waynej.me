// src/utils/postLoader.js
let contentCache = null;
import { devLog, devError } from '@/utils/devLogger';

export async function loadContent() {
    devLog('loadContent function called');

    if (contentCache) {
        devLog('Returning cached content');
        return contentCache;
    }

    try {
        devLog('Attempting to load content from file');
        const content = await import('/public/content.json');
        devLog('Content loaded successfully:', content);

        contentCache = content.default;
        devLog('Content cached:', contentCache);

        return contentCache;
    } catch (error) {
        devError('Error loading content:', error);
        return null;
    }
}

export async function loadPostDetails(id) {
    devLog(`loadPostDetails function called for id: ${id}`);
    const content = await loadContent();

    if (!content) {
        devError('Content not loaded');
        return null;
    }

    try {
        const post = content.posts.find(p => p.id === parseInt(id));
        if (!post) {
            devError(`Post not found for id: ${id}`);
            throw new Error('Post not found');
        }
        devLog(`Post found:`, post);
        return post;
    } catch (error) {
        devError(`Error loading post ${id}:`, error);
        return null;
    }
}
