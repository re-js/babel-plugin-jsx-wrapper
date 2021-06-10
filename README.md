# babel-plugin-jsx-wrapper

[![npm version](https://img.shields.io/npm/v/babel-plugin-jsx-wrapper?style=flat-square)](https://www.npmjs.com/package/babel-plugin-jsx-wrapper) [![code coverage](https://img.shields.io/coveralls/github/betula/babel-plugin-jsx-wrapper?style=flat-square)](https://coveralls.io/github/betula/babel-plugin-jsx-wrapper)

Automatic observe jsx arrow functions for smartify and purify your code :+1:

That plugin for babel wraps all not wrapped arrow functions (that contains JSX) to wrapper function with easy configuring [Mobx](https://github.com/mobxjs/mobx) and [Realar](https://github.com/betula/realar) (_but possible for configure to custom one_). Less code more effectiveness!

### Mobx

```javascript
import React from 'react';
import { makeAutoObservable } from 'mobx';
import { /* observer */ } from 'mobx-react';

class Ticker {
  value = 0;
  next = () => this.value += 1;

  constructor() {
    makeAutoObservable(this);
  }
}

const ticker = new Ticker();

// const App = observer(() => (
const App = () => (
  <>
    Ticker: {ticker.value}
    <br />
    <button onClick={() => ticker.next()}>Next</button>
  </>
);
```

[See wrapped version on CodeSandbox](https://codesandbox.io/s/babel-plugin-jsx-wrapper-mobx-example-q7en9).

```javascript
// .babelrc.js
module.exports = {
  "plugins": [
    ["jsx-wrapper", {
      "decorator": "mobx" // or possible value "mobx-lite", by default "realar"
    }]
  ]
};
```

### Realar

```javascript
import React from 'react';
import { prop, shared, /* observe */ } from 'realar';

class Ticker {
  @prop value = 0;
  next = () => this.value += 1;
}

const sharedTicker = () => shared(Ticker);

// const App = observe(() => {
const App = () => {
  const { value, next } = sharedTicker();
  return (
    <>
      Ticker: {value}
      <br />
      <button onClick={next}>Next</button>
    </>
  );
};
```

[See wrapped version on CodeSandbox](https://codesandbox.io/s/realar-jsx-observe-example-5f2k2?file=/src/App.tsx).

You are no need more to wrap (decorate) JSX components to `observe` function! It will be automatic.

### Options

**exclude** - array of [matcher](https://www.npmjs.com/package/matcher) patterns that needs to exclude.

**include** - array of [matcher](https://www.npmjs.com/package/matcher) patterns that need to include, other ones will be excluded.

```javascript
// .babelrc.js
module.exports = {
  "plugins": [
    ["jsx-wrapper", {
      "include": [
        "src/components/*",
        "src/pages/*"
      ],
      // "exclude": ["node_modules/*"]
    }]
  ]
};
```

**root** - string that provide root path for "exclude" and "include" options.

**memo** - boolean flag. Wrap all arrow function React component to `React.memo`. `false` by default.

**decorator** - function name that used instead of `observe` function from Realar. (_For example: "require('mobx-react').observer"_) Or name of presetted vendor: "mobx", "mobx-lite", "realar" (by default).

### Install

```bash
npm i --save-dev babel-plugin-jsx-wrapper
# or
yarn add babel-plugin-jsx-wrapper
```

And update your babel config:

```javascript
// .babelrc
{
  "plugins": [
    "jsx-wrapper"
  ]
}
```

Enjoy and happy coding!
