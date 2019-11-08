import React from 'react'

import {
	GridItem,
	MessageLine,
	Nick,
	Time
} from './Messages.Styled'

import { IUserMessage } from '../../containers/Chat/Chat'
import { IGridComponents } from '../../containers/Chat/Chat.Styled'

interface IProps {
	grid: IGridComponents,
	myNick: null | string,
	messages: IUserMessage[],
}

const covertUnixTime = (unixTime: number) => {
	const time = new Date(unixTime)
	const hours: string = time.getHours().toString().padStart(2, '0')
	const minutes: string = time.getMinutes().toString().padStart(2, '0')
	const seconds: string = time.getSeconds().toString().padStart(2, '0')
	const currentTimestamp: string = `${hours}:${minutes}:${seconds}`

	return currentTimestamp
}

// TODO: scroll bar should be styled
// FIXME: add auto scroll to newest message when the messages overflow the message window
const messages = (props: IProps) => {
	const userNotConnected = (<p>Connect to server to receive new messages</p>)
	const noMessagesOnServer = (<p>There are no messages on the server</p>)
	let messages = null

	if (props.myNick === null) {
		messages = userNotConnected
	}

	if (props.myNick !== null) {
		if (props.messages.length > 0) {
			messages = props.messages.map((message, index) => (
				<MessageLine
					key={index}
					myNick={props.myNick}
					messageNick={message.nick}
				>
				<Time>[{covertUnixTime(message.timestamp)}] </Time>
				<Nick>{message.nick}</Nick> : {message.text}</MessageLine>
			))
		} else {
			messages = noMessagesOnServer
		}
	}

	return (
		<GridItem {...props.grid}>
			{messages}
		</GridItem>
	)
}

export default messages
