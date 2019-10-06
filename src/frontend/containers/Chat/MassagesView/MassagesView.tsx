import React from 'react'

import { RouteProps } from 'react-router'

import Messages from '../../../components/Messages/Messages'
import Users from '../../../components/Users/Users'
import Controls from '../../../components/Controls/Controls'

import { IUserMessage } from '../Chat'
import { IGridComponents} from '../Chat.Styled'


interface IProps {
	grid: IGridComponents,
	myNick: null | string,
	messages: IUserMessage[],
	users: string[],
	sendMessage: (massage: string) => void,
}


const massagesView = (props: IProps & RouteProps) => {
	return (
		<>
			<Messages
				grid={props.grid}
				myNick={props.myNick}
				messages={props.messages}
			/>
			<Users
				grid={props.grid}
				users={props.users}
			/>
			<Controls
				grid={props.grid}
				sendMessage={props.sendMessage}
				location={props.location}
			/>
		</>
	)
}

export default massagesView