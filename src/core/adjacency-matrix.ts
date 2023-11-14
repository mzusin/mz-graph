import {
    AdjacencyList,
    AdjacencyMatrix,
    IGraph,
    IMatrix,
    INode,
    Label,
    IAdjacencyListOptions,
    IAdjacencyMatrixOptions
} from '../interfaces';

/**
 * Adjacency Matrix Representation
 */
export const matrix = <T>(options: IAdjacencyMatrixOptions<T>) : IMatrix<T> => {

    const adjacencyMatrix: AdjacencyMatrix<T> = Array(options.verticesNumber);

    const getMatrix = () => {
        return adjacencyMatrix;
    };

    const addEdge = (source: Label, destination: Label, weight: T) => {
        // @ts-ignore
        adjacencyMatrix[source][destination] = weight;

        if(!options.isDirected) {
            // @ts-ignore
            adjacencyMatrix[destination][source] = weight;
        }
    };

    const printGraph = () => {
        for (let r = 0; r < options.verticesNumber; r++) {
            console.log(adjacencyMatrix[r].map(value => ((value === null || value === undefined) ? '-' : value)).join(' '));
        }
    };

    /**
     * Entry Point.
     */
    (() => {
        for(let r=0; r<options.verticesNumber; r++) {
            adjacencyMatrix[r] = Array(options.verticesNumber);

            if(options.defaultValue !== undefined) {
                adjacencyMatrix[r].fill(options.defaultValue);
            }
        }
    })();

    return {
        getMatrix,
        addEdge,
        printGraph,
    };
};
