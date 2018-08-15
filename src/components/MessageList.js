import React from 'react'
import Message from './Message'

const MessageList = ({messages, starMessage, checkBox}) => {
  return messages.map(message => <Message key={message.id} {...message} starMessage={starMessage} checkBox={checkBox} />)
}

export default MessageList
