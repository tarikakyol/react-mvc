var React = require('react'),
    ChatPaneRep = require('./ChatPaneRep');

var ChatPaneCulture = React.createClass({

  propTypes: {
    thread: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      thread: {
        messages: [],
        user: {
          picture: {
            thumbnail: ''
          }
        }
      }
    }
  },

  componentWillMount: function() {
    this.rep = new ChatPaneRep(this.props.thread);
    this.rep.on(this.rep.EventType.CHANGE_ACTIVE_THREAD, this.changeActiveThread);
    this.rep.on(this.rep.EventType.UPDATE, this.changeActiveThread);

    this.setState({
      thread: this.props.thread,
      user: this.props.thread.user
    })
  },

  componentWillUnmount: function() {
    this.rep.off(this.rep.EventType.CHANGE_ACTIVE_THREAD, this.changeActiveThread);
    this.rep.off(this.rep.EventType.UPDATE, this.changeActiveThread);
  },

  changeActiveThread: function() {
    this.setState({
      thread: this.rep.thread,
      user: this.rep.thread.user
    })
  },

  render: function() {

    var messages = this.state.thread.messages.map(function (message, index){
      return <div key={index} className="chat-pane__message">{message}</div>
    });

    return (
        <div className="chat-pane">
          <img className="chat-pane__img" src={this.state.user.picture.thumbnail}/>
          <div className="chat-pane__messages">
            <div className="chat-pane__username">
              <strong>{this.state.user.getFullName()}</strong>
            </div>
            {messages}
          </div>
        </div>
    );
  }
});

module.exports = ChatPaneCulture;