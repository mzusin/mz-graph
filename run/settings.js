import fs from 'fs';
import path from 'path';

const packageJson = fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf-8');
let version = '1.0.0';

try {
    const parsed = JSON.parse(packageJson);
    version = parsed.version;
} catch (ex) {}

export const settings = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    // sourcemap: 'linked', // external
    minify: true,
    target: ['es6'],
    outfile: './dist/mz-graph.min.js',
    banner: {
        js: `/*
https://github.com/mzusin/mz-graph
MIT License      
Copyright (c) 2023-present, Miriam Zusin       
*/`,
    },
};