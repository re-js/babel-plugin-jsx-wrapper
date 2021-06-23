const babel = require('@babel/core');
const plugin = require('../src/plugin');

const decorator_fn_name = 'require("realar").observe';

function transform(code) {
  return babel.transform(code, {
    plugins: [plugin],
    code: true,
    ast: false,
  }).code;
}


test('should work with jsx children func', () => {
  const code = `
  export const Comp = () => {
    return (
      <A>
        {() => (<B><C></C></B>)}
      </A>
    );
  };
  `;
  const expected = `export const Comp = ${decorator_fn_name}(() => {
  return <A>
        {() => <B><C></C></B>}
      </A>;
});`;
  expect(transform(code)).toBe(expected);
});


test('should work with map', () => {
  const code = `export const Comp = () => <A>{k.map((m) => <A><B>{m}</B></A>)}</A>;`;
  const expected = `export const Comp = ${decorator_fn_name}(() => <A>{k.map(m => <A><B>{m}</B></A>)}</A>);`;
  expect(transform(code)).toBe(expected);
});

test('should work with prop func', () => {
  const code = `export const Comp = () => <View prop={() => (<B><C></C></B>)}><View></View></View>;`;
  const expected = `export const Comp = ${decorator_fn_name}(() => <View prop={() => <B><C></C></B>}><View></View></View>);`;
  expect(transform(code)).toBe(expected);
});

test('should work with nested func', () => {
  const code = `export const Comp = () => { return () => (<B><C></C></B>) };`;
  const expected = `export const Comp = ${decorator_fn_name}(() => {
  return () => <B><C></C></B>;
});`;
  expect(transform(code)).toBe(expected);
});

test('should work with nested func', () => {
  const code = `export const Comp = () => {
    const a = () => <A><B></B></A>;
    return a();
  };`;
  const expected = `export const Comp = ${decorator_fn_name}(() => {
  const a = () => <A><B></B></A>;

  return a();
});`;
  expect(transform(code)).toBe(expected);
});
