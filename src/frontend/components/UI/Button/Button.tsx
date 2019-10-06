import React, { ReactNode } from 'react'

import { ButtonStyled } from './Button.Styled'

interface IProps {
	disabled: boolean,
	color: string,
	click: (event: React.MouseEvent<HTMLButtonElement>) => void
	children: ReactNode
}


export const button = (props: IProps) => {
	return (
		<ButtonStyled
			disabled={props.disabled}
			color={props.color}
			onClick={props.click}
		>{props.children}</ButtonStyled>
	)
}

export default button