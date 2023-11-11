import { graph } from './core/main';

const api = {
    ...graph,
};

declare global {
    interface Window {
        mzGraph: typeof api,
    }
}

window.mzGraph = window.mzGraph || api;

export * from './core/main';