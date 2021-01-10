const { is_allowed } = require('./is-allowed');
const { view_transform } = require('./view-transform');

function plugin() {
  return {
    name: 'babel-plugin-realar',
    manipulateOptions(_opts, parserOpts) {
      parserOpts.plugins.push('jsx');
    },
    visitor: {
      'JSXElement|JSXFragment'(path, state) {
        if (is_allowed(state)) {
          view_transform(path, state.opts);
        }
      },
    },
  };
}

module.exports = plugin;
