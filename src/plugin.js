const { view_transform } = require('./view-transform');

function plugin() {
  return {
    name: 'babel-plugin-realar',
    manipulateOptions(_opts, parserOpts) {
      parserOpts.plugins.push('jsx');
    },
    visitor: {
      'JSXElement|JSXFragment'(path, state) {
        const { decorator, include, exclude, root } = state.opts || {};

        // TODO: add logic for include, exclude and root options

        view_transform(path, decorator);
      },
    },
  };
}

module.exports = plugin;
