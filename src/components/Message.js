import React from 'react'
import Label from './Label'

const Message = ({id, subject, read, selected, starred, labels, starMessage, checkBox }) => {
  const isRead = read ? 'read' : 'unread'
  const isSelected = selected === true ? 'selected' : ''
  const isChecked = selected === true ? 'checked': ''
  const isStarred = starred === true ? '' : '-o'

  return(
    <div className={`row message ${isRead} ${isSelected}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" onChange={()=> checkBox(id)} checked= {`${isChecked}`}/>
          </div>
          <div className="col-xs-2">
            <i onClick={() => starMessage(id)} className={`star fa fa-star${isStarred}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        { labels.map((label, index) => <Label key={index} name={label} />) }
        <a href="#">
          {subject}
        </a>
      </div>
    </div>
  )
}

export default Message
