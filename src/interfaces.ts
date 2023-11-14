export interface INode<T> {
    label: string|number;
    value: T;
}

export type AdjacencyList<T> = Map<string|number, INode<T>[]>;
export interface IGraph<T> {
    addVertex: (vertex: INode<T>) => void;
    getVertex: (label: string|number) => INode<T>[]|null;
    addEdge: (vertex1: INode<T>, vertex2: INode<T>) => void;
    printGraph: () => void;
    inorderRecursive: (callback: (label: string|number) => void) => void;
}

export type AdjacencyMatrix<T> = T[][];
export interface IMatrix<T> {
    getMatrix: () => AdjacencyMatrix<T>;
    addEdge: (source: string|number, destination: string|number, weight: T) => void;
    printGraph: () => void;
}


