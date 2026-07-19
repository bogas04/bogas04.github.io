const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => ({
  output: "export",
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next" : "docs",
  trailingSlash: true,
  experimental: {
    useTypeScriptCli: true,
  },
});
