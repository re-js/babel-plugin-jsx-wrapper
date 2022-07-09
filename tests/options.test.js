const babel = require('@babel/core');
const plugin = require('../src/plugin');

function transform(code, { decorator, filename, include, exclude, root, memo, ucfirst }) {
  return babel.transform(code, {
    plugins: [[plugin, { decorator, include, exclude, root, memo, ucfirst }]],
    code: true,
    ast: false,
    filename,
  }).code;
}

test('should work decorator option', () => {
  const code = `const a = (p) => <h1 />`;
  const expected = `const a = k(p => <h1 />);`;
  expect(transform(code, { decorator: 'k' })).toBe(expected);
});

test('should work mobx decorator option', () => {
  const code = `const a = (p) => <h1 />`;
  const expected = `const a = require("mobx-react").observer(p => <h1 />);`;
  expect(transform(code, { decorator: 'mobx' })).toBe(expected);
});

test('should work mobx-react decorator option', () => {
  const code = `const a = (p) => <h1 />`;
  const expected = `const a = require("mobx-react").observer(p => <h1 />);`;
  expect(transform(code, { decorator: 'mobx-react' })).toBe(expected);
});

test('should work mobx-lite decorator option', () => {
  const code = `const a = (p) => <h1 />`;
  const expected = `const a = require("mobx-react-lite").observer(p => <h1 />);`;
  expect(transform(code, { decorator: 'mobx-lite' })).toBe(expected);
});

test('should work mobx-react-lite decorator option', () => {
  const code = `const a = (p) => <h1 />`;
  const expected = `const a = require("mobx-react-lite").observer(p => <h1 />);`;
  expect(transform(code, { decorator: 'mobx-react-lite' })).toBe(expected);
});

test('should work without decorator option', () => {
  const code = `const a = (p) => <h1 />`;
  const expected = `const a = p => <h1 />;`;
  expect(transform(code, {})).toBe(expected);
});

test('should work remini decorator option', () => {
  const code = `const a = (p) => <h1 />`;
  const expected = `const a = require("remini/react").observe(p => <h1 />);`;
  expect(transform(code, { decorator: 'remini' })).toBe(expected);
});

test('should work remini/react decorator option', () => {
  const code = `const a = (p) => <h1 />`;
  const expected = `const a = require("remini/react").observe(p => <h1 />);`;
  expect(transform(code, { decorator: 'remini-react' })).toBe(expected);
});

test('should work remini/preact decorator option', () => {
  const code = `const a = (p) => <h1 />`;
  const expected = `const a = require("remini/preact").observe(p => <h1 />);`;
  expect(transform(code, { decorator: 'remini-preact' })).toBe(expected);
});

test('should work realar decorator option', () => {
  const code = `const a = (p) => <h1 />`;
  const expected = `const a = require("realar").observe(p => <h1 />);`;
  expect(transform(code, { decorator: 'realar' })).toBe(expected);
});

test('should work include option', () => {
  const code = `const a = p => <h1 />;`;
  const decorated = `const a = k(p => <h1 />);`;
  expect(transform(code, { include: ['src/*'], filename: __filename })).toBe(code);
  expect(
    transform(code, { include: ['src/*', 'tests/*'], filename: __filename, decorator: 'k' })
  ).toBe(decorated);
});

test('should work exclude option', () => {
  const code = `const a = p => <h1 />;`;
  const decorated = `const a = k(p => <h1 />);`;
  expect(transform(code, { exclude: ['tests/*'], filename: __filename })).toBe(code);
  expect(
    transform(code, {
      exclude: ['tests/*'],
      include: ['tests/*'],
      filename: __filename,
      decorator: 'k',
    })
  ).toBe(decorated);
  expect(transform(code, { exclude: ['src/*'], filename: __filename, decorator: 'k' })).toBe(
    decorated
  );
});

test('should work root option', () => {
  const code = `const a = p => <h1 />;`;
  const decorated = `const a = k(p => <h1 />);`;
  expect(
    transform(code, { root: __dirname, exclude: ['src/*'], filename: __filename, decorator: 'k' })
  ).toBe(decorated);
});

test('should work switch on memo option with decorator', () => {
  const code = `const a = p => <h1 />;`;
  const decorated = `const a = require("react").memo(k(p => <h1 />));`;
  expect(
    transform(code, { filename: __filename, decorator: 'k', memo: true })
  ).toBe(decorated);
});

test('should work switch on memo option without decorator', () => {
  const code = `const a = p => <h1 />;`;
  const decorated = `const a = require("react").memo(p => <h1 />);`;
  expect(
    transform(code, { filename: __filename, memo: true })
  ).toBe(decorated);
});

test('should work ucfirst option with no transform usually', () => {
  const code = `const a = (p) => <h1 />`;
  const expected = `const a = p => <h1 />;`;
  expect(transform(code, { decorator: 'k', ucfirst: true })).toBe(expected);
});

test('should work ucfirst option with transform only if uppercase first letter in name', () => {
  const code = `const Abc = (p) => <h1 />`;
  const expected = `const Abc = k(p => <h1 />);`;
  expect(transform(code, { decorator: 'k', ucfirst: true })).toBe(expected);
});