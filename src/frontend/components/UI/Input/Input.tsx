import React from 'react'

import InputStyled from './Input.Styled'

interface IProps {
	type: string,
	placeholder?: string,
	change: (event: React.FormEvent<HTMLInputElement>) => void,
	keyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const input = React.forwardRef((props: IProps, ref: React.RefObject<HTMLInputElement>) => {
	return (
		<InputStyled
			ref={ref}
			type={props.type}
			placeholder={props.placeholder}
			onChange={props.change}
			onKeyPress={props.keyPress}
		></InputStyled>
	)
})

export default input