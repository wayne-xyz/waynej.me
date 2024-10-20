const isDev = process.env.NODE_ENV === 'development';

export function devLog(...args) {
    if (isDev) {
        console.log(...args);
    }
}

export function devError(...args) {
    if (isDev) {
        console.error(...args);
    }
}

export function devWarn(...args) {
    if (isDev) {
        console.warn(...args);
    }
}

export function devInfo(...args) {
    if (isDev) {
        console.info(...args);
    }
}

