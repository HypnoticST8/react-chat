import React from 'react'

import {
	GridItem,
	SystemMessage
} from './System.Styled'

import { IGridComponents } from '../../containers/Chat/Chat.Styled'
import { ISystemMessageWithTime } from '../../containers/Chat/Chat'


interface IProps {
	grid: IGridComponents,
	systemMessages: ISystemMessageWithTime[],
}

// TODO: scroll bar should be styled
const system = (props: IProps) => {
	const messages = props.systemMessages.map((message: ISystemMessageWithTime, index) => (
		<SystemMessage key={index} messageType={message.type}>[{message.timestamp}]: {message.text}</SystemMessage>
	))

	return (
		<GridItem {...props.grid}>
			{messages}
		</GridItem>
	)
}

export default system