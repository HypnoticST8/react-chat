import styled from '@emotion/styled'

import { primaryColor, secondaryColor } from '../Colors/Colors'

interface IButtonStyled {
	disabled: boolean,
	color: string,
}


const buttonColor = (colorType: string) => {
	let color = ''

	switch (colorType) {
		case 'primary':
			color = primaryColor
			break
		case 'secondary':
			color = secondaryColor
			break
		default:
			color = primaryColor
			break;
	}
	return color
}

export const ButtonStyled = styled.button<IButtonStyled>(props => ({
	flex: '0 0 auto',
	border: '0',
	fontSize: '14px',
	textTransform: 'uppercase',
	color: 'white',
	outline: 'none',
	backgroundColor: `${buttonColor(props.color)}`,
	opacity: props.disabled ? 0.5 : 1,
	cursor: props.disabled ? 'not-allowed' : '',
	pointerEvents: props.disabled ? 'none' : 'initial',
  boxShadow: '0 2px 3px #ccc'
}))

export default {
	ButtonStyled
}