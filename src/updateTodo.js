const AWS = require('aws-sdk')
const middy = require('@middy/core')
const httpBodyParse = require('@middy/http-json-body-parser')
const { options } = require('./middleware/offline-options')

const updateTodo = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient(await options())
    const { id } = event.pathParameters
    const { completed } = event.body

    await dynamodb.update({
        TableName: 'TodoTable',
        Key: { id },
        UpdateExpression: "set completed = :completed",
        ExpressionAttributeValues: {
            ':completed': completed
        },
        ReturnValues: "ALL_NEW"
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `updated todo ${id}`
        })
    }
}

module.exports = {
    handler: middy(updateTodo).use(httpBodyParse())
}
