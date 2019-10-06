import React, { ReactNode } from 'react'

import { secondaryColor } from '../Colors/Colors'

import { Link, LinkProps } from 'react-router-dom'

interface IProps extends LinkProps {
	children: ReactNode
}

// TODO: change to styled component
const style: object = {
	flex: '0 0 100px',
	color: 'white',
	backgroundColor: secondaryColor,
	textAlign: 'center',
	textTransform: 'uppercase',
	textDecoration: 'none',
	font: '14px Arial',
	border: 0,
	paddingTop: '5px',
	paddingBottom: '5px'
}

const linkStyled = (props: IProps) => <Link style={style} {...props}>{props.children}</Link>

export default linkStyled