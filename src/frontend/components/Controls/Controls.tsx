import React, { Component } from 'react'

import { RouteProps } from 'react-router'

import {
	MIN_NICK_LENGTH,
	MAX_NICK_LENGTH,
	MIN_INPUT_LENGTH,
	MAX_INPUT_LENGTH,
	TYPE_CHECK_NICK,
	TYPE_CHECK_INPUT,
	systemPath,
} from '../../../globalChatConfig'

import { GridItem } from './Controls.Styled'
import Button from '../UI/Button/Button'
import LinkStyled from '../UI/LinkStyled/LinkStyled'
import Input from '../UI/Input/Input'

import { IGridComponents } from '../../containers/Chat/Chat.Styled'


interface IProps {
	grid: IGridComponents,
	connectToServer?: (nick: string) => void,
	sendMessage?: (massage: string) => void
}

interface IState {
	nicknameLengthCorrect: boolean,
	userInputLengthCorrect: boolean
}

// TODO: when switching between /system and /chat input filed should hold entered value
class Controls extends Component<IProps & RouteProps, IState> {
	state: IState = {
		nicknameLengthCorrect: false,
		userInputLengthCorrect: false,
	}

	nick: React.RefObject<HTMLInputElement> = React.createRef()
	newMessage: React.RefObject<HTMLInputElement> = React.createRef()

	private connectHandler = (event: React.KeyboardEvent<HTMLInputElement> & React.MouseEvent<HTMLButtonElement>): void => {
		if (!this.state.nicknameLengthCorrect || this.nick.current === null || !this.props.connectToServer) {
			return
		}

		if (event.key == 'Enter' && event.type == 'keypress' || event.type == 'click') {
			this.props.connectToServer(this.nick.current.value)
			this.nick.current.value = ''
			this.nickLengthHandler()
		}
	}

	private sendMessageHandler = (event: React.KeyboardEvent<HTMLInputElement> & React.MouseEvent<HTMLButtonElement>): void => {
		if (!this.state.userInputLengthCorrect || this.newMessage.current === null || !this.props.sendMessage) {
			return
		}

		if (event.key == 'Enter' && event.type == 'keypress' || event.type == 'click') {
			this.props.sendMessage(this.newMessage.current.value)
			this.newMessage.current.value = ''
			this.inputLengthHandler()
		}
	}

	private isLengthCorrect = (length: number, name: string): boolean => {
		switch (name) {
			case TYPE_CHECK_NICK:
				return length >= MIN_NICK_LENGTH && length <= MAX_NICK_LENGTH
			case TYPE_CHECK_INPUT:
				return length >= MIN_INPUT_LENGTH && length <= MAX_INPUT_LENGTH
			default:
				return false
		}
	}

	private nickLengthHandler = (): void => {
		if (this.nick.current === null) {
			this.setState({ nicknameLengthCorrect: false })
			return
		}

		const length = this.nick.current.value.length

		if (this.isLengthCorrect(length, TYPE_CHECK_NICK)) {
			if (this.isLengthCorrect(length, TYPE_CHECK_NICK) !== this.state.nicknameLengthCorrect) {
				this.setState({ nicknameLengthCorrect: true })
			}
		} else {
			if (this.isLengthCorrect(length, TYPE_CHECK_NICK) !== this.state.nicknameLengthCorrect) {
				this.setState({ nicknameLengthCorrect: false })
			}
		}
	}

	private inputLengthHandler = (): void => {
		if (this.newMessage.current === null) {
			this.setState({ nicknameLengthCorrect: false })
			return
		}

		const length = this.newMessage.current.value.length

		if (this.isLengthCorrect(length, TYPE_CHECK_INPUT)) {
			if (this.isLengthCorrect(length, TYPE_CHECK_INPUT) !== this.state.userInputLengthCorrect ) {
				this.setState({ userInputLengthCorrect: true })
			}
		} else {
			if (this.isLengthCorrect(length, TYPE_CHECK_INPUT) !== this.state.userInputLengthCorrect ) {
				this.setState({ userInputLengthCorrect: false })
			}
		}
	}

	render() {
		const systemInput = (
			<>
				<LinkStyled to="/chat">to chat</LinkStyled>
				<Input
					type='text'
					placeholder='enter nickname'
					ref={this.nick}
					change={this.nickLengthHandler}
					keyPress={this.connectHandler}
				/>
				<Button
					disabled={!this.state.nicknameLengthCorrect}
					color='primary'
					click={this.connectHandler}
				>connect</Button>
			</>
		)

		const chatInput = (
			<>
				<LinkStyled to="/system">to system</LinkStyled>
				<Input
					type='text'
					ref={this.newMessage}
					change={this.inputLengthHandler}
					keyPress={this.sendMessageHandler}
				/>
				<Button
					disabled={!this.state.userInputLengthCorrect}
					color='primary'
					click={this.sendMessageHandler}
				>send</Button>
			</>
		)

		let renderOutput = systemInput
		if (this.props.location) {
			renderOutput = this.props.location.pathname === systemPath ? systemInput : chatInput
		}

		return (
			<GridItem {...this.props.grid}>
				{renderOutput}
			</GridItem>
		)
	}
}

export default Controls