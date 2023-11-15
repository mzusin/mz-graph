export type Label = string|number;

export interface INode<T> {
    label: Label;
    value?: T;
}

export type AdjacencyList<T> = Map<Label, INode<T>[]>;
export interface IGraph<T> {
    addVertex: (vertex: INode<T>) => void;
    getVertex: (label: Label) => INode<T>[]|null;
    addEdge: (vertex1: INode<T>, vertex2: INode<T>) => void;
    printGraph: () => void;

    bfs: (callback: (label: Label) => void) => void;
    dfs: (callback: (label: Label) => void) => void;
    dfsRecursive: (callback: (label: Label) => void) => void;
}

export type AdjacencyMatrix<T> = T[][];
export interface IMatrix<T> {
    getMatrix: () => AdjacencyMatrix<T>;
    addEdge: (source: number, destination: number, weight: T) => void;
    printGraph: () => void;
    bfs: (callback: (row: number, col: number) => void) => void;
}

export interface IAdjacencyListOptions<T> {
    isDirected?: boolean;
    initial?: { [key: Label]: INode<T>[] };
}

export interface IAdjacencyMatrixOptions<T> {
    isDirected?: boolean;
    rowsCount?: number;
    columnsCount?: number;
    defaultValue?: T;
    initial?: T[][];
}


