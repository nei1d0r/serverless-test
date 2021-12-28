const AWS = require('aws-sdk')
const { options } = require('./middleware/offline-options')

const getTodos = async () => {
    const dynamodb = new AWS.DynamoDB.DocumentClient(await options())
    
    const data = await dynamodb.scan({ TableName: 'TodoTable' }).promise()
    const todos = data.Items

    return {
        statusCode: 200,
        body: JSON.stringify(todos)
    }
}

module.exports = {
    handler: getTodos
}
