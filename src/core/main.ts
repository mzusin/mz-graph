import { AdjacencyList, IGraph, INode } from '../interfaces';

export const graph = <T>(isDirected: boolean) : IGraph<T> => {
    const adjacencyList: AdjacencyList<T> = new Map();

    const addVertex = (vertex: INode<T>) => {
        if(adjacencyList.has(vertex.label)) return;
        adjacencyList.set(vertex.label, []);
    };

    const addEdge = (vertex1: INode<T>, vertex2: INode<T>) => {
        adjacencyList.get(vertex1.label)?.push(vertex2);

        if(!isDirected) {
            adjacencyList.get(vertex2.label)?.push(vertex1);
        }
    };

    const printGraph = () => {
        for (const [vertex, neighbors] of adjacencyList.entries()) {
            const neighborString = neighbors.join(', ');
            console.log(`${vertex} -> [${neighborString}]`);
        }
    };

    return {
        addVertex,
        addEdge,
        printGraph,
    };
};

// Adjacency list representation
// Adjacency matrix representation

// directed and undirected graphs

// weighted and unweighted graph