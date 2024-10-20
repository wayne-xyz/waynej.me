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
