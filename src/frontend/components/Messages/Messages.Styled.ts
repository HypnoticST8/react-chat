import styled from '@emotion/styled'

import { IGridComponents } from '../../containers/Chat/Chat.Styled'

interface IMessageLine {
  myNick: null | string,
  messageNick: string
}

const myChatMessage: string = 'black'
const othersChatMessage: string = 'green'
const nickColor: string = 'blue'
const timestampColor: string = 'silver'

export const GridItem = styled.div<IGridComponents>(props => ({
  gridArea: props.messages.name,
  border: props.global.border.style,
  borderRadius: props.global.border.radius,
  margin: props.global.margin.all,
  overflow: 'hidden auto',
  padding: '15px'
}))

export const MessageLine = styled.span<IMessageLine>(props => ({
  display: 'block',
  color: props.myNick == props.messageNick ? myChatMessage : othersChatMessage,
  fontSize: '14px',
  paddingTop: '0.25em',
  wordBreak: 'break-all'
}))

export const Nick = styled.span({
  color: nickColor
})

export const Time = styled.span({
  color: timestampColor
})

export default {
  GridItem,
  MessageLine,
  Nick,
  Time
}