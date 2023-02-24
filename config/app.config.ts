export default () => {
  return {
    environment: process.env.NODE_ENVIRONMENT
      ? process.env.NODE_ENVIRONMENT
      : 'development'
  }
}
