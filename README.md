# babel-plugin-realar

Automatic observe jsx arrow functions for [Realar](https://github.com/betula/realar) for smartify and purify your code :+1:

That plugin for babel wrap all not wrapped arrow function (that contains JSX) to Realar `observe` function. Less code more effectivity!


```javascript
import React from 'react';
import { shared } from 'realar';

class Ticker {
  @box value = 0;
  next = () => this.value += 1;
}

const sharedTicker = () => shared(Ticker);

// You are no need more to wrap (decorate) JSX components to `observe` function! It will be automatic.
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

### Installation

```bash
npm install babel-plugin-realar
# or
yarn add babel-plugin-realar
```

And update your babel config:

```javascript
// .babelrc.js
module.exports = {
  "plugins": [
    "realar"
  ]
}
```

Enjoy and happy coding!
