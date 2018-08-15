import React, { Component } from 'react';
import './App.css';
import Compose from './components/Compose'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'

class App extends Component {
  constructor(){
    super()
    this.state = {
      messages: [
  {
    id: 1,
    subject: "You can't input the protocol without calculating the mobile RSS protocol!",
    read: false,
    starred: true,
    labels: ["dev", "personal"]
  },
  {
    id: 2,
    subject: "connecting the system won't do anything, we need to input the mobile AI panel!",
    read: false,
    starred: false,
    selected: true,
    labels: []
  },
  {
    id: 3,
    subject: "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    read: false,
    starred: true,
    labels: ["dev"]
  },
  {
    id: 4,
    subject: "We need to program the primary TCP hard drive!",
    read: true,
    starred: false,
    selected: true,
    labels: []
  },
  {
    id: 5,
    subject: "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    read: false,
    starred: false,
    labels: ["personal"]
  },
  {
    id: 6,
    subject: "We need to back up the wireless GB driver!",
    read: true,
    starred: true,
    labels: []
  },
  {
    id: 7,
    subject: "We need to index the mobile PCI bus!",
    read: true,
    starred: false,
    labels: ["dev", "personal"]
  },
  {
    id: 8,
    subject: "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    read: true,
    starred: true,
    labels: []
  }
]
    }
  }

  starMessage = (id) => {
    const newMessages = this.state.messages.map(element => {
      if (element.id === id){
        element.starred = !element.starred
      }
      return element
    })

    this.setState({
      messages: newMessages
    })
  }

  checkBox = (id) => {
    const newMessages = this.state.messages.map(element => {
      if (element.id === id){
        element.selected = !element.selected
      }
      return element
    })

    this.setState({
      messages: newMessages
    })
  }

  selectAll = () => {
    const newMessages = this.state.messages
    let selected = newMessages.map(element => element.selected)
    let result
    if (selected.every(element => element === true)){
      result = newMessages.map(element => {
        element.selected = false
        return element
      })
    } else{
      result = newMessages.map(element => {
        element.selected = true
        return element
      })
    }

    this.setState({
      messages: result
    })
  }

  read = () => {
    const newMessages = this.state.messages
    let result = newMessages.map(element => {
      if (element.selected === true){
        element.read = true
        return element
      } else {
        return element
      }
    })

    this.setState({
      messages: result
    })
  }

  unread = () => {
    const newMessages = this.state.messages
    let result = newMessages.map(element => {
      if (element.selected === true){
        element.read = false
        return element
      } else {
        return element
      }
    })

    this.setState({
      messages: result
    })
  }

  addLabel = (event) =>{
    const newMessages = this.state.messages
    let result = newMessages.map(element => {
      if (element.selected === true && !element.labels.includes(event.target.value) && event.target.value !== 'Apply label'){
        element.labels.push(event.target.value)
        element.labels.sort()
        return element
      } else {
        return element
      }
    })
    this.setState({
      messages: result
    })
  }

  removeLabel = (event) =>{
    const newMessages = this.state.messages
    let result = newMessages.map(element => {
      if (element.selected === true && element.labels.includes(event.target.value)){
        let index = element.labels.findIndex(e => e == event.target.value)
        element.labels.splice(index, 1)
        return element
      } else {
        return element
      }
    })
    this.setState({
      messages: result
    })
  }

  deleteMessage = () => {
    const newMessages = this.state.messages
    let result = newMessages.filter(element => element.selected !== true)

    this.setState({
      messages: result
    })
  }

  onSubmit = (event) =>{
    event.preventDefault()
    const allMessages = this.state.messages
    const lastMessage = allMessages.slice(-1)[0]
    const newIndex = lastMessage.id + 1
    let newMessage = {
      id: newIndex,
      subject: event.target.subject.value,
      read: false,
      starred: false,
      selected: false,
      labels: []
    }
    allMessages.push(newMessage)

    this.setState({
      messages: allMessages
    })
  }


  render() {
    return (
      <div className="container">
        <Toolbar selectAll={this.selectAll} read={this.read} unread={this.unread} addLabel={this.addLabel} removeLabel={this.removeLabel} deleteMessage={this.deleteMessage}  messages={this.state.messages} />
        <Compose onSubmit={this.onSubmit} />
        <MessageList messages={this.state.messages} starMessage={this.starMessage} checkBox={this.checkBox}/>
      </div>
    );
  }
}

export default App;
