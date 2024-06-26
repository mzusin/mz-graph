import PriorityQueue from 'priorityqueuejs'; // https://github.com/janogonzalez/priorityqueuejs
import {
    AdjacencyList,
    IGraph,
    IVertex,
    Label,
    IAdjacencyListOptions,
} from '../interfaces';

/**
 * Adjacency List Representation
 */
export const graph = <T>(options: IAdjacencyListOptions<T>) : IGraph<T> => {
    const adjacencyList: AdjacencyList<T> = new Map();

    const addVertex = (label: Label) => {
        if(adjacencyList.has(label)) return;
        adjacencyList.set(label, []);
    };

    const hasVertex = (label: Label) : boolean => {
        return adjacencyList.has(label);
    };

    const getVertex = (label: Label) : IVertex<T>[]|null => {
        return adjacencyList.get(label) ?? null;
    };

    const addEdge = (source: Label, destination: Label, edgeWeight?: T) => {
        adjacencyList.get(source)?.push({
            label: destination,
            edgeWeight,
        });

        if(!options.isDirected) {
            adjacencyList.get(destination)?.push({
                label: source,
                edgeWeight
            });
        }
    };

    const printGraph = () => {
        for (const [vertex, neighbors] of adjacencyList.entries()) {
            const neighborString = neighbors.map(neighbor => {
                const weight = neighbor.edgeWeight !== undefined ? `(${ neighbor.edgeWeight })` : '';
                return `${ neighbor.label }${ weight }`;
            }).join(', ');
            console.log(`${vertex} -> [${neighborString}]`);
        }
    };

    /**
     * BFS (Breadth First Search)
     * Generally BFS is not implemented in graphs using recursion; this is something not standard.
     */
    const bfs = (callback: (label: Label) => void, startLabel?: Label) => {
        const visited: Set<Label> = new Set();

        const traverse = (startLabel: Label) => {

            const queue: (Label)[] = [ startLabel ];
            visited.add(startLabel);

            while (queue.length > 0) {
                const currentLabel = queue.shift() as Label;

                callback(currentLabel);

                const neighbors = getVertex(currentLabel) || [];
                for (const neighbor of neighbors) {
                    if(visited.has(neighbor.label)) continue;

                    visited.add(neighbor.label);
                    queue.push(neighbor.label);
                }
            }
        };

        if(startLabel !== undefined) {
            traverse(startLabel);
            return;
        }

        // handle disconnected nodes
        const labels = adjacencyList.keys();
        for (const label of labels) {
            if(visited.has(label)) continue;
            traverse(label);
        }
    };

    /**
     * DFS (Depth First Search)
     */
    const dfs = (callback: (label: Label) => void, startLabel?: Label) : void => {

        const visited: Set<Label> = new Set();

        const traverse = (startLabel: Label) => {

            const stack: (Label)[] = [ startLabel ];
            visited.add(startLabel);

            while (stack.length > 0) {
                const currentLabel = stack.pop() as Label;

                callback(currentLabel);

                const neighbors = getVertex(currentLabel) || [];
                for (const neighbor of neighbors) {
                    if(visited.has(neighbor.label)) continue;

                    visited.add(neighbor.label);
                    stack.push(neighbor.label);
                }
            }
        };

        if(startLabel !== undefined) {
            traverse(startLabel);
            return;
        }

        // handle disconnected nodes
        const labels = adjacencyList.keys();
        for (const label of labels) {
            if(visited.has(label)) continue;
            traverse(label);
        }
    };

    /**
     * DFS (Depth First Search)
     */
    const dfsRecursive = (callback: (label: Label) => void, startLabel?: Label) : void => {

        const visited: Set<Label> = new Set();

        const traverse = (label: Label) => {
            if(visited.has(label)) return;
            visited.add(label);

            callback(label);

            const neighbors = getVertex(label);
            if(!neighbors) return;

            for (const neighbor of neighbors) {
                traverse(neighbor.label);
            }
        };

        if(startLabel !== undefined) {
            traverse(startLabel);
            return;
        }

        // handle disconnected nodes
        const labels = adjacencyList.keys();
        for(const label of labels) {
            traverse(label);
        }
    };

    /**
     * The intuition:
     * We need to find a vertex that is visited and is not a parent (using DFS).
     */
    const hasCycleInUndirectedGraph = () : boolean => {
        const visited: Set<Label> = new Set();

        const traverse = (startLabel: Label) : boolean => {

            const stack: (Label)[] = [ startLabel ];
            visited.add(startLabel);

            while (stack.length > 0) {
                const currentLabel = stack.pop() as Label;

                const neighbors = getVertex(currentLabel) || [];
                for (const neighbor of neighbors) {
                    if(neighbor.label !== currentLabel && visited.has(neighbor.label)) return true;

                    visited.add(neighbor.label);
                    stack.push(neighbor.label);
                }
            }

            return false;
        };

        // handle disconnected nodes
        const labels = adjacencyList.keys();
        for (const label of labels) {
            if(visited.has(label)) continue;
            if(traverse(label)) return true;
        }

        return false;
    };

    /**
     * The intuition:
     * We need to find an edge directed to one of the visited vertices (using DFS).
     */
    const hasCycleInDirectedGraph = () : boolean => {
        const visited: Set<Label> = new Set();

        const traverse = (startLabel: Label) : boolean => {

            const stack: (Label)[] = [ startLabel ];
            visited.add(startLabel);

            while (stack.length > 0) {
                const currentLabel = stack.pop() as Label;

                const neighbors = getVertex(currentLabel) || [];
                for (const neighbor of neighbors) {
                    if(visited.has(neighbor.label)) return true;

                    visited.add(neighbor.label);
                    stack.push(neighbor.label);
                }
            }

            return false;
        };

        // handle disconnected nodes
        const labels = adjacencyList.keys();
        for (const label of labels) {
            if(visited.has(label)) continue;
            if(traverse(label)) return true;
        }

        return false;
    };

    const hasCycle = () : boolean => {
        if(options.isDirected) {
            return hasCycleInDirectedGraph();
        }

        return hasCycleInUndirectedGraph();
    };

    /**
     * BFS with a priority queue.
     * Use a priority queue (min heap) to efficiently select the vertex with the smallest distance at each step.
     * Note that this implementation assumes non-negative weights for edges.
     * If your graph may contain negative weights, consider using Bellman-Ford algorithm.
     */
    const findShortestPathDijkstra = (startLabel: Label) : Map<Label, number> => {

        const visited: Set<Label> = new Set();

        // @ts-ignore
        const priorityQueue = new PriorityQueue<{ label: Label; distance: number }>({ comparator: (a, b) => a.distance - b.distance });

        // ----- Init the distances ------------------
        // The distances object keeps track of the distances from the start node to each node in the graph.
        // The algorithm continues until all reachable nodes are visited.
        const distances = new Map<Label, number>();

        // Initialize distances with Infinity.
        for(const vertex of adjacencyList.keys()) {
            distances.set(vertex, Infinity);
        }

        // Distance from source to itself is always 0.
        distances.set(startLabel, 0);

        // ------------------------------------------

        priorityQueue.enq({ label: startLabel, distance: 0 });

        while (!priorityQueue.isEmpty()) {

            const { label } = priorityQueue.deq();

            if (visited.has(label)) continue;
            visited.add(label);

            const neighbors = getVertex(label) || [];

            for (const neighbor of neighbors) {

                const edgeWeight = neighbor.edgeWeight as number; // Assuming weights are non-negative
                const distance = distances.get(label) ?? 0;
                const newDistance = distance + edgeWeight;

                const neighborDistance = distances.get(neighbor.label) ?? Infinity;

                if (newDistance < neighborDistance) {
                    distances.set(neighbor.label, newDistance);

                    priorityQueue.enq({ label: neighbor.label, distance: newDistance });
                }
            }
        }

        return distances;
    };

    /**
     * Kahn’s Algorithm: This algorithm uses an in-degree approach
     * and is based on repeatedly removing nodes with no incoming edges.
     * It only applies to directed acyclic graphs (DAGs).
     * If the graph contains cycles, a topological sort is not possible.
     *
     * Usage:
     * ------
     * This sort is used when some tasks need to be done before others.
     * Think of the nodes as your various projects, and the arrows (or edges) between them represent the dependencies.&#x20;
     * An arrow from Task A to Task B means you’ve got to finish Task A before you can tackle Task B.
     * Topological sorting is like creating a to-do list where every task appears before any tasks that depend on it.
     * Program build dependencies.
     * It can discover circles.
     */
    const topologicalSortingKahn = () : Label[] => {
        if(!options.isDirected) {
            throw new Error('Topological sorting is applicable only to directed acyclic graphs.');
        }

        // Calculate the in-degree (number of incoming edges) for each node.
        const incomingEdges = new Map<Label, number>(); // label ---> incoming edges count

        for(const [label, neighbours] of adjacencyList) {
            if(!incomingEdges.has(label)){
                incomingEdges.set(label, 0);
            }

            for(const neighbor of neighbours) {
                const currentCount = incomingEdges.get(neighbor.label) ?? 0;
                incomingEdges.set(neighbor.label, currentCount + 1);
            }
        }

        // Initialize a queue and enqueue all nodes with in-degree 0.
        const queue: Label[] = [];

        for (const [label, degree] of incomingEdges) {
            if (degree === 0) {
                queue.push(label);
            }
        }

        const topologicalOrder: Label[] = [];
        let count = 0;

        while(queue.length > 0) {

            // Remove a node from the queue
            // and add it to the topological order.
            const label = queue.shift();
            if(!label) continue;

            topologicalOrder.push(label);

            // Decrease the in-degree of all its neighboring nodes by 1.
            // If the in-degree of a neighboring node becomes 0, enqueue it.
            const neighbours = adjacencyList.get(label) || [];
            for (const neighbor of neighbours) {

                const currentCount = (incomingEdges.get(label) ?? 0) - 1;
                incomingEdges.set(label, currentCount);

                if(currentCount <= 0) {
                    queue.push(neighbor.label);
                }
            }

            count++;
        }

        // If all nodes are processed, the topological order is complete.
        // If there are still nodes with non-zero in-degree,
        // the graph contains a cycle.
        if (count !== adjacencyList.size) {
            throw new Error('Graph has a cycle.');
        }
        else {
            return topologicalOrder;
        }
    };

    /**
     * Entry Point.
     */
    (() => {
        if(!options.initial) return;

        const labels: Label[] = Object.keys(options.initial);
        for(const label of labels) {
            // @ts-ignore
            const neighbors: IVertex<T>[] = options.initial[label] || [];
            adjacencyList.set(label, neighbors);
        }
    })();

    return {
        addVertex,
        getVertex,
        hasVertex,
        addEdge,
        printGraph,

        bfs,
        dfs,
        dfsRecursive,

        hasCycle,
        findShortestPathDijkstra,
        topologicalSortingKahn,
    };
};
