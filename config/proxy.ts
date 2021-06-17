/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

const apiAddress='http://localhost:8065'

export default {
  dev: {
    '/api/': {
      target: apiAddress,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  test: {
    '/api/': {
      target: apiAddress,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: apiAddress,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
