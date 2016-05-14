link-into
=========

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


Installation
------------

```
npm install --save-dev link-into
```


Contribute
----------

- Issue Tracker: https://github.com/paulmelnikow/link-into/issues
- Source Code: https://github.com/paulmelnikow/link-into

Pull requests welcome!


Support
-------

If you are having issues, please let me know.


License
-------

The project is licensed under the MIT license.
