# link-into

[![version](https://img.shields.io/npm/v/link-into.svg?style=flat-square)][npm]
[![license](https://img.shields.io/npm/l/link-into.svg?style=flat-square)][npm]
[![build](https://img.shields.io/circleci/project/github/paulmelnikow/link-into.svg?style=flat-square)][build]
[![code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)][prettier]

[npm]: https://npmjs.comlink-into/
[build]: https://circleci.com/gh/paulmelnikow/link-into/tree/master
[prettier]: https://prettier.io/

Create a tree of symlinks from glob patterns.

Given the following tree:

```
.
└── assets
    ├── bar.png
    └── foo.svg
```

```
link-into build/ '**/*.png' '**/*.svg'
```

Creates this tree:

```
.
├── assets
│   ├── bar.png
│   └── foo.svg
└── build
    └── assets
        ├── bar.png -> ../../assets/bar.png
        └── foo.svg -> ../../assets/foo.svg
```

## Installation

```
npm install --save-dev link-into
```

## Contribute

-   Issue Tracker: https://github.com/paulmelnikow/link-into/issues
-   Source Code: https://github.com/paulmelnikow/link-into

Pull requests welcome!

## Support

If you are having issues, please let me know.

## License

The project is licensed under the MIT license.
