const AWS = require('aws-sdk')
const { options } = require('./middleware/offline-options')

const deleteTodo = async (event) => {
    console.log(event)
    const dynamodb = new AWS.DynamoDB.DocumentClient(await options())
    const { id } = event.pathParameters
    
    const data = await dynamodb.delete({ TableName: 'TodoTable', Key: { "id": id } }).promise()
    const todo = data.Item

    return {
        statusCode: 200,
        body: JSON.stringify(todo)
    }
}

module.exports = {
    handler: deleteTodo
}
