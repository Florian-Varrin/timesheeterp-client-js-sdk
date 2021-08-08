import merge from 'deepmerge';
import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig();

export default merge(baseConfig, {
    input: './dist/src/app.js',
    output: {
        dir: 'dist',
    }
});
