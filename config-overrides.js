const { injectBabelPlugin } = require("react-app-rewired");

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
    config
  );
  config = injectBabelPlugin(
    [
      "prismjs",
      {
        languages: ["javascript", "css", "markup", "java", "go"]
      }
    ],
    config
  );
  return config;
};
