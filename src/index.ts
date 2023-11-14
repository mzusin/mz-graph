import { graph } from './core/adjacency-list';
import { matrix } from './core/adjacency-matrix';

const api = {
    ...graph,
    ...matrix,
};

declare global {
    interface Window {
        mzGraph: typeof api,
    }
}

window.mzGraph = window.mzGraph || api;

export * from './core/adjacency-list';
export * from './core/adjacency-matrix';