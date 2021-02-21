module.exports = {
    extends: ["airbnb-typescript-prettier"],
    rules: {
        'prettier/prettier': [
            'off',
            {
                singleQuote: true,
            }
        ],
        'import/prefer-default-export': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
    }
};