/* eslint-disable no-confusing-arrow */

export default {
    input: "./docs/scripts/main.js",
    output: {
        file: "./docs/scripts/bundle.js",
        format: "iife"
    },
    plugins: [{ resolveId: (code, id) => id ? `docs${code}` : null }]
};
