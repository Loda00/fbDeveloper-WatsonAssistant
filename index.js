const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000
const token = ''

const watson = require('./src/lib/watson')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())


// const assistant = new watson.AssistantV1({
//     version: '2019-09-20',
//     iam_apikey: 'uGgOqQsQnXhRPmrA2sonBFti8Zawbcvdb9bABhy6Ds1V',
//     url: 'https://gateway.watsonplatform.net/assistant/api'
// })

app.get('/webHook',(req,res)=>{
    console.log(req.query['hub.challenge'])
    if(req.query['hub.verify_token'] === ''){
        res.send(req.query['hub.challenge']);
        console.log('entro');
    }else{
        res.send('Fuera de aquí !');
        console.log('no entro');
    } 
})

app.post('/webHook',(req,res)=>{
    var data = req.body;
    console.log(data);
    if(data.object == 'page'){
        data.entry.forEach( entry => {
            const webhook_event =  entry.messaging[0]
            const message = webhook_event.message.text
            const id = webhook_event.sender.id
            watson(message, id);
        })
        res.status(200).send('EVENT_RECEIVED')
    } else {
        res.sendStatus(404)
    }
})



app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})
