module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:@typescript-eslint/recommended",
        "react-app",
        "plugin:prettier/recommended",
    ],
    plugins: ["@typescript-eslint", "react"],
    rules: {
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },
};
