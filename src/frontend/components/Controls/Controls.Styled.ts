import styled from '@emotion/styled'

import { IGridComponents } from '../../containers/Chat/Chat.Styled'

export const GridItem = styled.div<IGridComponents>(props => ({
  gridArea: props.controls.name,
  border: props.global.border.style,
  borderRadius: props.global.border.radius,
  margin: props.global.margin.all,
  display: 'flex',
  flexWrap: 'nowrap',
  padding: '15px'
}))

export default {
  GridItem
}