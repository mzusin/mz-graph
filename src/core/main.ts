import { AdjacencyList, AdjacencyMatrix, IGraph, IMatrix, INode } from '../interfaces';

/**
 * Adjacency List Representation
 */
export const graph = <T>(isDirected: boolean) : IGraph<T> => {
    const adjacencyList: AdjacencyList<T> = new Map();

    const addVertex = (vertex: INode<T>) => {
        if(adjacencyList.has(vertex.label)) return;
        adjacencyList.set(vertex.label, []);
    };

    const getVertex = (label: string|number) : INode<T>[]|null => {
        return adjacencyList.get(label) ?? null;
    };

    const addEdge = (source: INode<T>, destination: INode<T>) => {
        adjacencyList.get(source.label)?.push(destination);

        if(!isDirected) {
            adjacencyList.get(destination.label)?.push(source);
        }
    };

    const printGraph = () => {
        for (const [vertex, neighbors] of adjacencyList.entries()) {
            const neighborString = neighbors.map(neighbor => neighbor.label).join(', ');
            console.log(`${vertex} -> [${neighborString}]`);
        }
    };

    return {
        addVertex,
        getVertex,
        addEdge,
        printGraph,
    };
};

/**
 * Adjacency Matrix Representation
 */
export const matrix = <T>(verticesNumber: number, isDirected: boolean, defaultValue: T|undefined = undefined) : IMatrix<T> => {

    const adjacencyMatrix: AdjacencyMatrix<T> = Array(verticesNumber);

    const getMatrix = () => {
        return adjacencyMatrix;
    };

    const addEdge = (source: string|number, destination: string|number, weight: T) => {
        // @ts-ignore
        adjacencyMatrix[source][destination] = weight;

        if(!isDirected) {
            // @ts-ignore
            adjacencyMatrix[destination][source] = weight;
        }
    };

    const printGraph = () => {
        for (let r = 0; r < verticesNumber; r++) {
            console.log(adjacencyMatrix[r].map(value => ((value === null || value === undefined) ? '-' : value)).join(' '));
        }
    };

    /**
     * Entry Point.
     */
    (() => {
        for(let r=0; r<verticesNumber; r++) {
            adjacencyMatrix[r] = Array(verticesNumber);

            if(defaultValue !== undefined) {
                adjacencyMatrix[r].fill(defaultValue);
            }
        }
    })();

    return {
        getMatrix,
        addEdge,
        printGraph,
    };
};

// weighted and unweighted graph