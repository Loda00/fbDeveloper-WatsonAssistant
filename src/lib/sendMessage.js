const token = ''
const { Build } = require('./buildMessage')

module.exports = (message, id) => {

    if (message.length > 0)
        filterMessage(message, id, 0)

}

function filterMessage(message, id, index) {

    let message = messages[index]
    index++
    switch (message['response_type']) {
        case 'text': sendMessage(Build.buildMessage(message.text, id), () => filterMessage(message, id, index))
            break
    }

}


function sendMessage(message, callback) {

    request({
        method: "POST",
        qs: { "access_token": token },
        url: "https://graph.facebook.com/v2.6/me/messages",
        json: message
    }, function (error, response, body) {
        if (error) {
            throw new Error(error)
        } else {
            console.log('200')
            callback()
        }
    })
}