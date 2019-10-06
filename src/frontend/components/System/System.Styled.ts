import styled from '@emotion/styled'

import { IGridComponents } from '../../containers/Chat/Chat.Styled'

interface ISystemMessage {
  messageType: string
}

const systemMessageDefault: string = 'black'
const systemMessageInfo: string = 'blue'
const systemMessageSuccess: string = 'green'
const systemMessageError: string = 'red'

const systemMessageColor = (type: string) => {
  let color: string = ''

  switch (type) {
    case 'info':
      color = systemMessageInfo
      break
    case 'success':
      color = systemMessageSuccess
      break
    case 'error':
      color = systemMessageError
      break
    default:
      color = systemMessageDefault
      break
  }
  return color
}

export const GridItem = styled.div<IGridComponents>(props => ({
  gridArea: props.system.name,
  border: props.global.border.style,
  borderRadius: props.global.border.radius,
  margin: props.global.margin.all,
  overflow: 'hidden auto',
  padding: '15px'
}))

export const SystemMessage = styled.span<ISystemMessage>(props => ({
  display: 'block',
  color: systemMessageColor(props.messageType),
  fontSize: '14px',
  paddingTop: '0.25em',
}))

export default {
  GridItem,
  SystemMessage
}