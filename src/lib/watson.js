const AssistantV1 = require('watson-developer-cloud/assistant/v1')
const workSpaceId = ''
const sendMessage = require('./sendMessage')

const assistant = new AssistantV1({
    version: '2019-09-20',
    iam_apikey: '',
    url: 'https://gateway.watsonplatform.net/assistant/api'
})

module.exports = async (message, id) => {
    const responseWatson = await getMessage(message, id)
    console.log('send ',responseWatson.output, responseWatson.context)

    // sendMessage()
    console.log('responseWatson : '+ new Date().toLocaleTimeString(), responseWatson);
}

function getMessage(message, context) {
    return new Promise((resolve, reject) => {
        assistant.message({
            workspace_id: workSpaceId,
            input: { 'text': message }
        }, function (err, response) {
            if (err) {
                console.log(`err ${err}`)
                reject('Error')
            } else {
                // console.log('response',JSON.stringify(response, null, 2))
                resolve(response)
            }
        }
        )
    })
}
