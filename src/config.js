let config = {}
if (process.env.NODE_ENV === 'development') {
  config.HOST = 'http://127.0.0.1:7001'
}

export default config
