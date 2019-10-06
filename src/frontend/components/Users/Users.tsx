import React from 'react'

import {
	GridItem,
	UsersHeader,
	Nick,
} from './Users.Styled'

import { IGridComponents } from '../../containers/Chat/Chat.Styled'

interface IProps {
	grid: IGridComponents,
	users: string[]
}


// TODO: add alphabetical sorting for nick list and own nick highlight
// TODO: scroll bar should be styled
// TODO: <UsersHeader> should always remain on top regardless of scrolling
const users = (props: IProps) => {
	let users = null

	if (props.users !== null) {
		users = props.users.map((user, index) => (
			<Nick key={index}>{user}</Nick>
		))
	}

	return (
		<GridItem {...props.grid}>
			<UsersHeader>users</UsersHeader>
			{users}
		</GridItem>
	)
}

export default users