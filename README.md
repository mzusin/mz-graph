# Graphs

Typescript implementation of graphs.

**Adjacency List Representation**

```ts
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
}

export const graph: <T>(isDirected: boolean) => IGraph<T>;
```

Usage example:

```ts
const myGraph: IGraph<number> = graph<number>(false); // true for directed graph
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
```

**Adjacency Matrix Representation**

```ts
export type AdjacencyMatrix<T> = T[][];

export interface IMatrix<T> {
    getMatrix: () => AdjacencyMatrix<T>;
    addEdge: (source: string|number, destination: string|number, weight: T) => void;
    printGraph: () => void;
}
export const matrix: <T>(verticesNumber: number, isDirected: boolean, defaultValue?: T | undefined) => IMatrix<T>;
```

Usage example:

```ts
// create a matrix 2x2 with default value 0
const myGraph: IMatrix<number> = matrix<number>(2, false, 0); // true for directed graph

// add edge, row = 0, col = 1, weight = 5
myGraph.addEdge(0, 1, 5);

// get matrix
const res = myGraph.getMatrix();

// print the matrix
myGraph.printGraph();
```
