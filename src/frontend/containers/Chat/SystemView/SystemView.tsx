import React from 'react'

import { RouteProps } from 'react-router'

import System from '../../../components/System/System'
import Controls from '../../../components/Controls/Controls'

import { IGridComponents } from '../Chat.Styled'
import { ISystemMessageWithTime } from '../Chat'


interface IProps {
	grid: IGridComponents,
	systemMessages: ISystemMessageWithTime[],
	connectToServer: (nick: string) => void,
}


const systemView = (props: IProps & RouteProps) => {
	return (
		<>
			<System
				grid={props.grid}
				systemMessages={props.systemMessages}
			/>
			<Controls
				grid={props.grid}
				connectToServer={props.connectToServer}
				location={props.location}
			/>
		</>
	)
}

export default systemView