/**
 * The Union-Find (Disjoint Set Union, DSU)
 * is a way to handle groups of items that don't overlap.
 *
 * Usage:
 * ------
 * - connectivity in networks
 * - such as finding connected components
 * - detecting cycles in graphs
 */
export interface IUnionFind {
    union: (node1: number, node2: number) => boolean;
    find: (node: number) => number;
}

export const unionFind = (size: number) : IUnionFind => {

    // For size = 5 ---->
    // arr = [0, 1, 2, 3, 4]
    const parent: number[] = [];

    // For size = 5 ---->
    // arr = [1, 1, 1, 1, 1]
    // It's used to keep track of the tree depth.
    const rank: number[] = [];

    const init = () => {
        for(let i=0; i<size; i++) {
            parent.push(i);
            rank.push(1);
        }
    };
    init();

    /**
     * Join two subsets into a single subset.
     */
    const union = (node1: number, node2: number) : boolean => {
        const root1 = find(node1);
        const root2 = find(node2);

        if (root1 !== root2) {
            // Union by rank to keep tree shallow
            if (rank[root1] > rank[root2]) {
                parent[root2] = root1;
            }
            else {
                if (rank[root1] < rank[root2]) {
                    parent[root1] = root2;
                }
                else {
                    parent[root2] = root1;
                    rank[root1] += 1;
                }
            }

            return true;
        }

        return false;
    };

    /**
     * Determine which subset a particular element is in.
     * This can be used for determining
     * if two elements are in the same subset.
     */
    const find = (node: number) : number => {
        if (parent[node] !== node) {
            parent[node] = find(parent[node]);
        }

        return parent[node];
    };

    return {
        union,
        find,
    };
};