# babel-plugin-realar

[![npm version](https://img.shields.io/npm/v/babel-plugin-realar?style=flat-square)](https://www.npmjs.com/package/babel-plugin-realar) [![code coverage](https://img.shields.io/coveralls/github/betula/babel-plugin-realar?style=flat-square)](https://coveralls.io/github/betula/babel-plugin-realar)

Automatic observe jsx arrow functions for [Realar](https://github.com/betula/realar) for smartify and purify your code :+1:

That plugin for babel wraps all not wrapped arrow functions (that contains JSX) to Realar `observe` function. Less code more effectivity!

```javascript
import React from 'react';
import { box, shared, /* observe */ } from 'realar';

class Ticker {
  @box value = 0;
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

[See wrapped version of it on CodeSandbox](https://codesandbox.io/s/realar-jsx-observe-example-5f2k2?file=/src/App.tsx).

You are no need more to wrap (decorate) JSX components to `observe` function! It will be automatic.

### Installation

```bash
npm install --save-dev babel-plugin-realar
# or
yarn add babel-plugin-realar
```

And update your babel config:

```javascript
// .babelrc
{
  "plugins": [
    "realar"
  ]
}
```

Enjoy and happy coding!
