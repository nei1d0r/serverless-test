const { v4 } = require('uuid')
const AWS = require('aws-sdk')
const middy = require("@middy/core")
const httpBodyParse = require('@middy/http-json-body-parser')
const { options } = require('./middleware/offline-options')

const addTodo = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient(await options())
    const { todo } = event.body
    
    const newTodo = {
        todo,
        createdAt: new Date().toISOString(),
        id: v4(),
        completed: false
    }

    console.log('===>', newTodo)

    await dynamodb.put({
        TableName: 'TodoTable',
        Item: newTodo
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify()
    }
}

module.exports = {
    handler: middy(addTodo).use(httpBodyParse())
}
