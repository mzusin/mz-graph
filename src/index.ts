import { test } from './core/main';

const api = {
    ...test,
};

declare global {
    interface Window {
        mzGraph: typeof api,
    }
}

window.mzGraph = window.mzGraph || api;

export * from './core/main';