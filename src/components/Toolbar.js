import React, { Component } from 'react'

class Toolbar extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const counter = this.props.messages
    const result = counter.filter(element => element.read !== true)
    const count = result.length
    return(<div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{count}</span>
          unread messages
        </p>

        <button onClick={this.props.selectAll} className="btn btn-default">
          <i className="fa fa-check-square-o"></i>
        </button>

        <button onClick={this.props.read} className="btn btn-default">
          Mark As Read
        </button>

        <button onClick={this.props.unread} className="btn btn-default">
          Mark As Unread
        </button>

        <select onChange={this.props.addLabel} className="form-control label-select">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select onChange={this.props.removeLabel} className="form-control label-select">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button onClick={this.props.deleteMessage} className="btn btn-default">
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>)
  }
}

export default Toolbar
