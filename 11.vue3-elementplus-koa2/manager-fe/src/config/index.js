/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
  development: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/74ad6f5e00908e85f019851971ca985f/api',
  },
  test: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/74ad6f5e00908e85f019851971ca985f/api',
  },
  prod: {
    baseApi: '/',
    mockApi: '',
  }
}

export default {
  env,
  mock: true,
  ...EnvConfig[env]
}