# babel-plugin-jsx-wrapper

[![npm version](https://img.shields.io/npm/v/babel-plugin-jsx-wrapper?style=flat-square)](https://www.npmjs.com/package/babel-plugin-jsx-wrapper) [![code coverage](https://img.shields.io/coveralls/github/betula/babel-plugin-jsx-wrapper?style=flat-square)](https://coveralls.io/github/betula/babel-plugin-jsx-wrapper)

Automatic observe jsx arrow functions for smartify and purify your code :+1:

That plugin for babel wraps all not wrapped arrow functions (that contains JSX and defined in file global scope) to wrapper function with easy configuring [Mobx](https://github.com/mobxjs/mobx), [Realar](https://github.com/betula/realar) and [Remini](https://github.com/betula/remini) (_but possible for configure to custom one_). Less code more effectiveness!

### Mobx

```javascript
import { makeAutoObservable } from 'mobx';
/* import { observer } from 'mobx-react-lite'; */

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
    <button onClick={ticker.next}>Next</button>
  </>
);
```

[See wrapped version on CodeSandbox](https://codesandbox.io/s/babel-plugin-jsx-wrapper-mobx-example-q7en9).

```javascript
// .babelrc.js
module.exports = {
  "plugins": [
    ["jsx-wrapper", {
      "decorator": "mobx-react-lite" // "mobx-react", "remini-react", "remini-preact", "realar", or some custom
    }]
  ]
};
```


### Remini

```javascript
import { box, read, update } from 'remini';
/* import { observe } from 'remini/react'; */

const $value = box(0);
const next = () => update($value, (v) => v + 1);

// const App = observe(() => {
const App = () => (
  <>
    Ticker: {read($value)}
    <br />
    <button onClick={next}>Next</button>
  </>
);
```

[See wrapped version on CodeSandbox](https://codesandbox.io/s/remini-automatic-jsx-observe-example-nxqdqr?file=/src/App.tsx).

You are no need more to wrap (decorate) JSX components to `observe` function! It will be automatic.

```javascript
// .babelrc.js
module.exports = {
  "plugins": [
    ["jsx-wrapper", {
      "decorator": "remini-react" // "remini-preact", "realar", "mobx-react", "mobx-react-lite", or some custom
    }]
  ]
};
```

### Options

**ucfirst** - boolean flag. Wrap only if first letter of the function name is uppercased. `false` by default.

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

**decorator** - function name that using to wrapping jsx arrow function component. (_For example: "require('mobx-preact').observer"_) Or name of presetted vendor: "remini-react", "remini-preact", "realar", "mobx-react", and "mobx-react-lite".


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
    ["jsx-wrapper", {
      "decorator": "mobx-react-lite"
    }]
  ]
}
```

Enjoy and happy coding!
