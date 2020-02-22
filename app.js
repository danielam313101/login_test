const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const authenticate = require('./authentication')
const app = express()

const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const {body: {email, password}} = req
  const userName = authenticate(email, password)
  return userName ? res.send(`<h1>Welcome back, ${userName} </h1>`) : res.render('index', {error: true})
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})