# Graphs

Typescript implementation of graphs.

**Adjacency List Representation**

```ts
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

    bfs: (callback: (label: Label) => void, startLabel?: Label) => void;
    dfs: (callback: (label: Label) => void, startLabel?: Label) => void;
    dfsRecursive: (callback: (label: Label, startLabel?: Label) => void) => void;

    hasCycle: () => boolean;
}

export interface IAdjacencyListOptions<T> {
    isDirected?: boolean;
    initial?: { [key: Label]: IVertex<T>[] };
}

export const graph: <T>(options: IAdjacencyListOptions<T>) => IGraph<T>;
```

Usage example:

```ts
const myGraph: IGraph<number> = graph<number>({
    isDirected: true,
    initial: {
        A: [{ label: 'B', edgeWeight: 10 }],
        B: [{ label: 'C', edgeWeight: 20 }],
        C: [],
    }
});

// or

const myGraph: IGraph<number> = graph<number>({
    isDirected: false
});

// add/get a vertex
myGraph.addVertex('A'); // or use a number myGraph.addVertex(10);
console.log(myGraph.getVertex('A'));

// add an edge
myGraph.addVertex('B');
myGraph.addVertex('C');
myGraph.addEdge('A', 'B', 10);
myGraph.addEdge('B', 'C');

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

console.log(myGraph.hasCycle()); // true or false
```

**Adjacency Matrix Representation**

```ts
export type AdjacencyMatrix<T> = T[][];

export interface IMatrix<T> {
    getMatrix: () => AdjacencyMatrix<T>;
    addEdge: (source: number, destination: number, weight: T) => void;
    printGraph: () => void;
    bfs: (callback: (row: number, col: number, value: T) => void) => void;
    dfs: (callback: (row: number, col: number, value: T) => void) => void;
}

export interface IAdjacencyMatrixOptions<T> {
    isDirected?: boolean;
    rowsCount?: number;
    columnsCount?: number;
    defaultValue?: T;
    initial?: T[][];
}

export const matrix: <T>(options: IAdjacencyMatrixOptions<T>) => IMatrix<T>;
```

Usage example:

```ts
const myGraph: IMatrix<number> = matrix<number>({
    initial: [
        [2, 1],
        [1, 2],
    ]
});

// or

// create a matrix 2x2 with default value 0
const myGraph: IMatrix<number> = matrix<number>({
    isDirected: false,
    rowsCount: 2,
    columnsCount: 2,
    defaultValue: 0,
});

// add edge, row = 0, col = 1, weight = 5
myGraph.addEdge(0, 1, 5);

// get matrix
const res = myGraph.getMatrix();

// print the matrix
myGraph.printGraph();

myGraph.bfs((row: number, col: number, value: number) => {
    console.log(row, col, value);
});

myGraph.dfs((row: number, col: number, value: number) => {
    console.log(row, col, value);
});
```
