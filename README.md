# Graphs

Typescript implementation of graphs.

**Adjacency List Representation**

```ts
export type Label = string|number;

export interface INode<T> {
    label: Label;
    value: T;
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

export interface IAdjacencyListOptions<T> {
    isDirected: boolean;
    initial?: { [key: Label]: INode<T>[] };
}

export const graph: <T>(options: IAdjacencyListOptions<T>) => IGraph<T>;
```

Usage example:

```ts
const myGraph: IGraph<number> = graph<number>({
    isDirected: true,
    initial: {
        A: [{ label: 'B', value: 10 }],
        B: [{ label: 'C', value: 20 }],
        C: [],
    }
});

// or

const myGraph: IGraph<number> = graph<number>({
    isDirected: false
}); // true for directed graph
const vertex: INode<number> = { label: 'A', value: 42 }; // or use number as label { label: 10, value: 42 }

// add/get a vertex
myGraph.addVertex(vertex);
console.log(myGraph.getVertex('A'));

// add an edge
const vertex1: INode<number> = { label: 'B', value: 42 };
const vertex2: INode<number> = { label: 'C', value: 99 };

myGraph.addVertex(vertex1);
myGraph.addVertex(vertex2);
myGraph.addEdge(vertex1, vertex2);

// print the graph
myGraph.printGraph();

myGraph.bfs((label: Label) => {
    console.log(label);
});

myGraph.dfs((label: Label) => {
    console.log(label);
});

myGraph.dfsRecursive((label: Label) => {
    console.log(label);
});
```

**Adjacency Matrix Representation**

```ts
export type AdjacencyMatrix<T> = T[][];

export interface IMatrix<T> {
    getMatrix: () => AdjacencyMatrix<T>;
    addEdge: (source: Label, destination: Label, weight: T) => void;
    printGraph: () => void;
}

export interface IAdjacencyMatrixOptions<T> {
    isDirected: boolean;
    verticesNumber: number;
    defaultValue?: T;
}

export const matrix: <T>(options: IAdjacencyMatrixOptions<T>) => IMatrix<T>;
```

Usage example:

```ts
// create a matrix 2x2 with default value 0
const myGraph: IMatrix<number> = matrix<number>({
    isDirected: false,
    verticesNumber: 2,
    defaultValue: 0,
}); // true for directed graph

// add edge, row = 0, col = 1, weight = 5
myGraph.addEdge(0, 1, 5);

// get matrix
const res = myGraph.getMatrix();

// print the matrix
myGraph.printGraph();
```
