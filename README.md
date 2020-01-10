# SantaBurga made with :heart:, :hamburger:, :coffee: and some :beer:

![GitHub package.json version](https://img.shields.io/github/package-json/v/Dmendoza99/SantaBurga) ![License](https://img.shields.io/github/license/Dmendoza99/SantaBurga.svg) ![Issues](https://img.shields.io/github/issues/Dmendoza99/SantaBurga.svg) ![Unicorn](https://cdn.rawgit.com/LunaGao/BlessYourCodeTag/master/tags/unicorn.svg)

This is a small POS so I can keep track of my restaurant's sales.

## Motivation :question:

This project exists because I needed to keep track of the orders.

## Code style :lipstick:

### .eslintrc

```json
{
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "codeFrame": false
  },
  "extends": ["airbnb", "prettier"],
  "plugins": ["react", "prettier"],
  "env": { "browser": true, "jest": true },
  "rules": {
    "max-len": ["error", { "code": 100 }],
    "prefer-promise-reject-errors": ["off"],
    "react/jsx-filename-extension": ["off"],
    "react/jsx-closing-bracket-location": [1, "tag-aligned"],
    "react/prop-types": ["off"],
    "no-return-assign": ["off"]
  }
}
```

### .prettierrc

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "singleQuote": false,
  "jsxBracketSameLine": true,
  "trailingComma": "es5"
}
```

## Installation :inbox_tray:

```bash
git clone https://github.com/Dmendoza99/SantaBurga
cd SantaBurga
npm install
```

## Bugs :bug:

This app is getting upgrades in my free time if there is a problem please create a bug report in the issues section.

## License :scroll:

- Licensed under [GNU GPLv3](https://github.com/Dmendoza99/SantaBurga/blob/master/LICENSE)
