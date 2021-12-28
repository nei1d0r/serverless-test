// custom middleware to process env vars for serverless offline... not really a middleware :D
const options = async () => 
    process.env.IS_OFFLINE
        ? {
              region: 'localhost',
              endpoint: 'http://localhost:8000'
          }
        : {} // no opts atm if not serverles-offline


module.exports = {
    options
}