const { view_transform } = require('./view-transform');

function plugin() {
  return {
    name: 'babel-plugin-jsx-decor',
    manipulateOptions(_opts, parserOpts) {
      parserOpts.plugins.push('jsx');
    },
    visitor: {
      'JSXElement|JSXFragment'(path, state) {
        const { decorator } = state.opts || {};
        view_transform(path, decorator);
      },
    },
  };
}

module.exports = plugin;
