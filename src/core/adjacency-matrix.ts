import {
    AdjacencyMatrix,
    IMatrix,
    Label,
    IAdjacencyMatrixOptions
} from '../interfaces';

/**
 * Adjacency Matrix Representation
 */
export const matrix = <T>(options: IAdjacencyMatrixOptions<T>) : IMatrix<T> => {

    const verticesNumber = (options.initial ? options.initial.length : options.verticesNumber) ?? 2;

    let adjacencyMatrix: AdjacencyMatrix<T> = Array(verticesNumber);

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
        for (let r = 0; r < verticesNumber; r++) {
            console.log(adjacencyMatrix[r].map(value => ((value === null || value === undefined) ? '-' : value)).join(' '));
        }
    };

    /**
     * Entry Point.
     */
    (() => {
        if(options.initial) {
            adjacencyMatrix = options.initial;
            return;
        }

        // If no initial value is defined ---> init an empty array.
        for(let r=0; r<verticesNumber; r++) {
            adjacencyMatrix[r] = Array(verticesNumber);

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
