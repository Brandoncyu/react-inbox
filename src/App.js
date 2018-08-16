import React, { Component } from 'react';
import './App.css';
import Compose from './components/Compose'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import axios from 'axios'

class App extends Component {
  constructor(){
    super()
    this.state = {
      messages: [],
      composeOn: false
    }
  }

  componentDidMount(){
    this.getAllMessages()
  }

  async getAllMessages(){
    const response = await axios.get('http://localhost:8082/api/messages')
    this.setState({
      messages: response.data
    })
  }

  starMessage = async(id) => {
    const response = await axios.patch('http://localhost:8082/api/messages', { messageIds: [id], command: 'star' })

    this.getAllMessages()
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

  read = async() => {
    let id = []
    const newMessages = this.state.messages
    newMessages.forEach(element => {
      if (element.selected === true){
        id.push(element.id)
      }
    })

    const response = await axios.patch('http://localhost:8082/api/messages', { messageIds: id, command: 'read', read: true })

    this.getAllMessages()
  }

  unread = async() => {
    let id = []
    const newMessages = this.state.messages
    newMessages.forEach(element => {
      if (element.selected === true){
        id.push(element.id)
      }
    })

    const response = await axios.patch('http://localhost:8082/api/messages', { messageIds: id, command: 'read', read: false })

    this.getAllMessages()
  }

  addLabel = async(event) =>{
    let id = []
    const newMessages = this.state.messages
    newMessages.forEach(element => {
      if (element.selected === true && !element.labels.includes(event.target.value)){
        id.push(element.id)
      }
    })

    if (event.target.value !== 'Apply label'){
      const response = await axios.patch('http://localhost:8082/api/messages', { messageIds: id, command: 'addLabel', label: event.target.value })

      this.getAllMessages()
    }

  }

  removeLabel = async(event) =>{
    let id = []
    const newMessages = this.state.messages
    newMessages.forEach(element => {
      if (element.selected === true){
        id.push(element.id)
      }
    })

    if (event.target.value !== 'Apply label'){
      const response = await axios.patch('http://localhost:8082/api/messages', { messageIds: id, command: 'removeLabel', label: event.target.value })

      this.getAllMessages()
    }
  }

  deleteMessage = async() => {
    let id = []
    const newMessages = this.state.messages
    newMessages.forEach(element => {
      if (element.selected === true){
        id.push(element.id)
      }
    })
    console.log(id)
    const response = await axios.patch('http://localhost:8082/api/messages', { messageIds: id, command: 'delete' })

    this.getAllMessages()
  }

  onSubmit = async(event) =>{
    event.preventDefault()
    const response = await axios.post('http://localhost:8082/api/messages', { subject: event.target.subject.value, body: event.target.body.value })

    const newResponse = await axios.get('http://localhost:8082/api/messages')
    this.setState({
      messages: newResponse.data,
      composeOn: false
    })
  }

  toggleCompose = () => {
    this.setState({
      composeOn: !this.state.composeOn
    })
  }


  render() {
    return (
      <div className="container">
        <Toolbar selectAll={this.selectAll} read={this.read} unread={this.unread} addLabel={this.addLabel} removeLabel={this.removeLabel} deleteMessage={this.deleteMessage}  messages={this.state.messages} toggleCompose={this.toggleCompose} />
        {this.state.composeOn && <Compose onSubmit={this.onSubmit} />}
        <MessageList messages={this.state.messages} starMessage={this.starMessage} checkBox={this.checkBox}/>
      </div>
    );
  }
}

export default App;
