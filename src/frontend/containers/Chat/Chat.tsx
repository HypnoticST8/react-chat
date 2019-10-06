import React, { Component } from 'react'
import axios from '../../utils/axios-chat'

import {
	Route,
	Switch,
	Redirect
} from 'react-router-dom'

import {
	systemPath,
	chatPath
} from '../../../globalChatConfig'

import {
	GridContainer,
	gridComponents,
} from './Chat.Styled'

import SystemView from './SystemView/SystemView'
import MassagesView from './MassagesView/MassagesView'


interface ISystemMessage {
	type: string,
	text: string,
}

export interface ISystemMessageWithTime {
	type: string,
	text: string,
	timestamp: string
}

export interface IUserMessage {
	nick: string,
	text: string,
	timestamp: number
}

interface IState {
  nick: null | string,
  userId: null | string,
  systemMessages: ISystemMessageWithTime[],
  messages: IUserMessage[],
  users: string[],
}

// TODO: add https://jsdoc.app/ style comments
class Chat extends Component<object, IState> {
  state: IState = {
    nick: null,
    userId: null,
    systemMessages: [],
    messages: [],
    users: [],
  }

	// TODO: is the re-rendering after methods get called necessary?
	// TODO: state update will cause re-render (move to another life cycle method?)
	componentDidMount() {
		const systemWelcomeMessage1: ISystemMessage = { type: 'info', text: 'Welcome to React chat! v0.0.1 alpha beta gamma ;-)' }
		const systemWelcomeMessage2: ISystemMessage = { type: 'info', text: 'Please enter your nickname and connect to server' }

		this.addNewSystemMessage(systemWelcomeMessage1)
		this.addNewSystemMessage(systemWelcomeMessage2)
	}

	// connect button handler
	// Get user id from the server
	private connectHandler = (nick: string) => {
		axios.get(`/connect?nick=${nick}`)
		.then(response => {
			const connectionSuccessful: ISystemMessage = { type: 'success', text: `Nickname set to : ${nick} with user Id of: ${response.data.id}` }
			const connectionError: ISystemMessage = { type: 'error', text: `${response.data.serverMessage}` }
      const unknownResponse: ISystemMessage = { type: 'error', text: 'Unknown response from the server' }

			switch (response.data.status) {
				case 'ok':
					this.setState({
						nick: nick,
						userId: response.data.id,
					})
					this.addNewSystemMessage(connectionSuccessful)
					setInterval(this.getMessages, 1000) // TODO: Temporary solution. Change this in the future.
					break
				case 'error':
					this.addNewSystemMessage(connectionError)
					break
				default:
					this.addNewSystemMessage(unknownResponse)
			}
		})
		.catch(error => {
			const responseError: ISystemMessage = { type: 'error', text: `Server responded with error (${error})` }
			this.addNewSystemMessage(responseError)
			console.error(error)
		})
	}

	// Get all messages from the server
	private getMessages = () => {
		axios.get(`/getData?id=${this.state.userId}`)
		.then(response =>  {
			const getSuccessful: ISystemMessage = { type: 'success', text: 'Received new messages from server' }
			const getError: ISystemMessage = { type: 'error', text: `${response.data.serverMessage}` }
			const unknownError: ISystemMessage = { type: 'error', text: 'unknown error receiving messages' }

			switch (response.data.status) {
				case 'ok':
					this.setState(prevState => ({
						messages: [...prevState.messages, ...response.data.messages],
						users: response.data.users
					}))
					this.addNewSystemMessage(getSuccessful)
					break
				case 'error':
					this.addNewSystemMessage(getError)
					break
				default:
					this.addNewSystemMessage(unknownError)
			}
		})
		.catch(error => {
			const responseError: ISystemMessage = { type: 'error', text: `Server responded with error (server response: ${error}` }
			this.addNewSystemMessage(responseError)
			console.error(error)
		})
	}

	// Send message to server
	private sendMessage = (event: React.KeyboardEvent<HTMLInputElement> & React.MouseEvent<HTMLButtonElement>, userMessage: string) => {
		const nickOrIdNotSetError: ISystemMessage = { type: 'error', text: 'User nickname or Id is not set' }

		if (this.state.userId != null && this.state.nick != null) {
			axios.post('/sendData', {
				id: this.state.userId,
				text: userMessage
			})
			.then(response =>  {
				const sendSuccessful: ISystemMessage = { type: 'success', text: `${response.data.serverMessage}` }
				const sendError: ISystemMessage = { type: 'error', text: `${response.data.serverMessage}` }
				const unknownError: ISystemMessage = { type: 'error', text: 'unknown error receiving messages' }

				switch (response.data.status) {
					case 'ok':
						this.addNewSystemMessage(sendSuccessful)
						break
					case 'error':
						this.addNewSystemMessage(sendError)
						break
					default:
						this.addNewSystemMessage(unknownError)
				}
			})
			.catch(error => {
				const responseError: ISystemMessage = { type: 'error', text: `Server responded with error (server response: ${error}` }
				this.addNewSystemMessage(responseError)
				console.error(error)
			})
		} else {
			this.addNewSystemMessage(nickOrIdNotSetError)
		}
	}

  // add new system massage
	private addNewSystemMessage = (message: ISystemMessage) => {
		const time = new Date()
		const hours: string = time.getHours().toString().padStart(2, '0')
		const minutes: string = time.getMinutes().toString().padStart(2, '0')
		const seconds: string = time.getSeconds().toString().padStart(2, '0')
		const currentTimestamp: string = `${hours}:${minutes}:${seconds}`
		const messageWithTimestamp: ISystemMessageWithTime = {...message, timestamp: currentTimestamp }

		this.setState(prevState => ({
			systemMessages: [...prevState.systemMessages, messageWithTimestamp]
		}))
	}

	render() {
		return (
			<GridContainer>
				<Switch>
					<Route
						path={systemPath}
						render={props =>
							<SystemView
								grid={gridComponents}
								systemMessages={this.state.systemMessages}
								connectToServer={(nick: string) => this.connectHandler(nick)}
								{...props} />
						}
					/>
					<Route
						path={chatPath}
						render={props =>
							<MassagesView
								grid={gridComponents}
								messages={this.state.messages}
								myNick={this.state.nick}
								users={this.state.users}
								sendMessage={this.sendMessage.bind(this, event)}
								{...props} />
						}
					/>
					<Redirect from='/' to={systemPath} />
				</Switch>
			</GridContainer>
		)
	}
}

export default Chat