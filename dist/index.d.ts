declare module 'mz-graph' {

    export type Label = string|number;

    export interface IVertex<T> {
        label: Label;
        edgeWeight: T;
    }

    export type AdjacencyList<T> = Map<Label, IVertex<T>[]>;
    export interface IGraph<T> {
        addVertex: (label: Label) => void;
        getVertex: (label: Label) => IVertex<T>[]|null;
        hasVertex: (label: Label) => boolean;
        addEdge: (source: Label, destination: Label, edgeWeight?: T) => void;
        printGraph: () => void;

        bfs: (callback: (label: Label, startLabel?: Label) => void) => void;
        dfs: (callback: (label: Label, startLabel?: Label) => void) => void;
        dfsRecursive: (callback: (label: Label) => void, startLabel?: Label) => void;

        hasCycle: () => boolean;
        findShortestPathDijkstra: (startLabel: Label) => Map<Label, number>;
    }

    export type AdjacencyMatrix<T> = T[][];
    export interface IMatrix<T> {
        getMatrix: () => AdjacencyMatrix<T>;
        addEdge: (source: number, destination: number, weight: T) => void;
        printGraph: () => void;
        bfs: (callback: (row: number, col: number, value: T) => void) => void;
        dfs: (callback: (row: number, col: number, value: T) => void) => void;
    }

    export interface IAdjacencyListOptions<T> {
        isDirected?: boolean;
        initial?: { [key: Label]: IVertex<T>[] };
    }

    export const graph: <T>(options: IAdjacencyListOptions<T>) => IGraph<T>;

    export interface IAdjacencyMatrixOptions<T> {
        isDirected?: boolean;
        rowsCount?: number;
        columnsCount?: number;
        defaultValue?: T;
        initial?: T[][];
    }

    export const matrix: <T>(options: IAdjacencyMatrixOptions<T>) => IMatrix<T>;
}