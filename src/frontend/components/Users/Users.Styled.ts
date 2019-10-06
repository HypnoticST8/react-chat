import styled from '@emotion/styled'

import { IGridComponents } from '../../containers/Chat/Chat.Styled'

export const GridItem = styled.div<IGridComponents>(props => ({
  gridArea: props.users.name,
  border: props.global.border.style,
  borderRadius: props.global.border.radius,
  margin: props.global.margin.all,
  overflow: 'hidden auto',
  padding: '15px'
}))

export const UsersHeader = styled.h3({
  textTransform: 'uppercase',
  textAlign: 'center',
  marginTop: 0
})

export const Nick = styled.span({
  display: 'block',
  fontSize: '14px',
  paddingTop: '0.25em'
})

export default {
  GridItem,
  UsersHeader,
  Nick,
}