module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}",
                "*.ts", 
                "*.tsx", 
                "*.d.ts"
            ],
            "parser": "@typescript-eslint/parser",
            "parserOptions": {
                "sourceType": "module"
            },
            "plugins": ['@typescript-eslint']
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "typescript"
    ],
    "rules": {
    }
}
