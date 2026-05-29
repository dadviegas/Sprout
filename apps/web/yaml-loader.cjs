/* Build-time YAML loader: parses a `.yaml`/`.yml` file at compile time and
 * emits it as a plain JS module. Keeps the YAML parser out of the runtime
 * bundle — only the resulting data object ships. */
const yaml = require("js-yaml");

module.exports = function yamlLoader(source) {
  const data = yaml.load(source);
  return `export default ${JSON.stringify(data)};`;
};
