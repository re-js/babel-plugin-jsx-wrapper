const path = require('path');
const matcher = require('matcher');

module.exports = {
  is_allowed,
};

function is_allowed(state) {
  const opts = state.opts || {};

  let allowed = true;

  let cwd = state.cwd || path.resolve('.');
  let root = opts.root || cwd;

  if (!path.isAbsolute(root)) {
    root = path.resolve(cwd, root);
  }

  let filename = state.filename;
  let include_paths = opts.include;
  let exclude_paths = opts.exclude;

  if ((include_paths || exclude_paths) && filename) {
    if (!path.isAbsolute(filename)) {
      filename = path.resolve(filename);
    }

    if (exclude_paths) {
      if (!Array.isArray(exclude_paths)) {
        exclude_paths = [exclude_paths];
      }

      for (let excl of exclude_paths) {
        if (!path.isAbsolute(excl)) {
          excl = path.join(root, excl);
        }

        allowed = !matcher.isMatch(filename, excl);
        if (!allowed) break;
      }
    }

    if (include_paths) {
      allowed = false;

      if (!Array.isArray(include_paths)) {
        include_paths = [include_paths];
      }

      for (let incl of include_paths) {
        if (!path.isAbsolute(incl)) {
          incl = path.join(root, incl);
        }

        allowed = matcher.isMatch(filename, incl);
        if (allowed) break;
      }
    }
  }

  return allowed;
}
