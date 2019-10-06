import styled from '@emotion/styled'

import { componentBorderColor } from '../Colors/Colors'

export const InputStyled = styled.input(({
	flex: '1 0 auto',
	fontSize: '14px',
	backgroundColor: 'rgb(240, 240, 240)',
	border: `1px solid ${componentBorderColor}`,
	padding: '0px 10px'
}))

export default InputStyled