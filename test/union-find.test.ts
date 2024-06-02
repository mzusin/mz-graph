import { IUnionFind, unionFind } from '../src/core/union-find';

describe('Union Find', () => {
    let uf: IUnionFind;

    beforeEach(() => {
        uf = unionFind(5);
    });

    test('find should return the correct root', () => {
        expect(uf.find(0)).toBe(0);
        expect(uf.find(1)).toBe(1);
        expect(uf.find(2)).toBe(2);
        expect(uf.find(3)).toBe(3);
        expect(uf.find(4)).toBe(4);
    });

    test('union should correctly merge groups', () => {
        expect(uf.union(0, 1)).toBe(true);
        expect(uf.find(0)).toBe(0);
        expect(uf.find(1)).toBe(0);

        expect(uf.union(1, 2)).toBe(true);
        expect(uf.find(2)).toBe(0);

        expect(uf.union(3, 4)).toBe(true);
        expect(uf.find(3)).toBe(3);
        expect(uf.find(4)).toBe(3);

        expect(uf.union(2, 4)).toBe(true);
        expect(uf.find(0)).toBe(0);
        expect(uf.find(1)).toBe(0);
        expect(uf.find(2)).toBe(0);
        expect(uf.find(3)).toBe(0);
        expect(uf.find(4)).toBe(0);
    });

    test('union should return false for already connected nodes', () => {
        uf.union(0, 1);
        uf.union(1, 2);
        expect(uf.union(0, 2)).toBe(false);
    });
});