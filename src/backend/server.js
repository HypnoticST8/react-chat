// TODO: if existing user changes nickname remove old nickname from 'users'

const express = require('express')
const uuid = require('uuid/v1')
const chalk = require('chalk')

const server = express()
const SERVER_PORT = 8000

const date = new Date()

// users format { nick: 'Some Server Nick 1', id: '2bc20c40-a233-11e9-9a52-cb3ac4586e29', lastTimestamp: 0 },
const users = []

// message format { nick: 'Some Server Nick 1', text: 'Hello, my name is Some Server Nick 1', timestamp: 0 }
const messages = []

// CORS header
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// Handle POST request with Content-Type: application/json
server.use(express.json())

// Search for a given Id in 'users' constant
const isUserIdValid = (id) => users.some(user => user.id === id)

// Search for a given nick in 'users' constant
const isNickAvailable = (nick) => !users.some(user => user.nick === nick)

// Get value of any property in 'users' constant for a given user Id
// Params: id - user id for which we will look for a property value, prop - name of searched property
// Returns: value of searched property
const getUserPropertyValue = (id, prop) => {
	let propertyValue = null

	users.find(user => {
		if (user.id === id) {
			propertyValue = user[prop]
		}
	})

	return propertyValue
}

// Returns all messages from 'messages' constant that are older than the value of 'lastTimestamp' for a given user
// Params: id - user id for whom we will return messages
// Returns: array with messages from 'messages' constant that are older than the value of 'lastTimestamp'
const messagesFromLastTimestamp = (id) => {
	const lastUserTimestamp = getUserPropertyValue(id, 'lastTimestamp')
	const newMessages = messages.filter(message => message.timestamp > lastUserTimestamp)

	return newMessages
}

// Updates the time when messages ware last sent to the user
const updateUserTimestamp = (id) => {
	users.find(user => {
		if (user.id === id) {
			user.lastTimestamp = Date.now()
		}
	})
}

// TODO: validation for length and illegal characters
// Add new user service - creates new user record with new Id in 'users' constant if given nick is available
// Params: nick - connecting user nickname
// Returns: status: 'ok' - if nick is available, 'id' - user Id as uuid (v1) / status: 'error' - if nick or id is already taken, 'serverMessage' - error message
server.get('/connect', (req, res) => {
	const nick = req.query.nick
	const nickErrorMessage = { status: 'error', serverMessage: 'Chosen nickname already exists. Please choose another one.' }
	const idErrorMessage = { status: 'error', serverMessage: 'Cannot create new UserID.' }

	// Generate new user id
	let userId = uuid()

	// Check if user Id exists in 'users' constant. Return with error if true (super-mega-extremely rare case)
	if (isUserIdValid(userId)) {
		res.send(idErrorMessage)
		console.log(`Received a connection from new client with Id that already exists in users "database": ${userId}`)
		return
	}

	// Check if nick is available
	if (!isNickAvailable(nick)) {
		res.send(nickErrorMessage)
		return
	}

	const newUser = { 'nick': nick, 'id': userId, 'lastTimestamp': 0 } // TODO: is 'lastTimestamp' = 0 for new user correct initial value?
	users.push(newUser)
	res.send({ status: 'ok', id: userId })
	console.log(`Added new user: ${nick}`)
})

// Get data service - send chat messages and user list to client
// Params: id - existing user Id
// Returns: status: 'ok' - If user Id is present users constant / status: 'error' - If user Id is not present 'users' constant, 'serverMessage' - error message
server.get('/getData', (req, res) => {
	const userId = req.query.id
	const idErrorMessage = { status: 'error', serverMessage: 'User Id not found.'}

	// check if Id of connecting user exists in 'users' constant
	if (!isUserIdValid(userId)) {
		res.send(idErrorMessage)
		console.log(`Request to sent chat messages to user with unknown Id: ${userId}`)
		return
	}

	const nicks = []
	users.forEach(user => nicks.push(user.nick))
	const data = { status: 'ok', messages: messagesFromLastTimestamp(userId), users: nicks }
	res.send(data)
	updateUserTimestamp(userId)
	console.log(`Chat messages sent to user with Id: ${userId}`)
})

// TODO: add checking for max message length
// TODO: refactor code to the version without else condition
// Receive data service - receives chat messages from client with existing Id
// Params: id - existing user Id, text - new chat message
// Returns: status: 'ok' - if new message is accepted by the server / status: 'error' - If user Id is not present 'users' constant, 'serverMessage' - error message
server.post('/sendData', (req, res) => {
	const userId = req.body.id
	const userMessage = req.body.text
	const newMessageAccepted = { status: 'ok', serverMessage: 'New message accepted.' }
	const idErrorMessage = { status: 'error', serverMessage: 'User Id not found.'}

	// check if Id of connecting user exists in 'users' constant
	if (isUserIdValid(userId)) {
		const nick = getUserPropertyValue(userId, 'nick')
		const currentTime = Date.now()
		const newMessage = { nick: nick, text: userMessage, timestamp: currentTime }

		messages.push(newMessage)
		res.send(newMessageAccepted)
		console.log(`Chat message received from user with Id: ${userId} | new message is: ${userMessage}`)
	} else {
		res.send(idErrorMessage)
		console.log(`Request to receive chat messages from user with unknown Id: ${userId}`)
	}
})

server.listen(SERVER_PORT, () => console.log(chalk `Chat server listening on port {green.bold ${SERVER_PORT}}`))

// node console timestamp for nodemon
console.log(chalk `{blue.bold #################### ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ####################}`)