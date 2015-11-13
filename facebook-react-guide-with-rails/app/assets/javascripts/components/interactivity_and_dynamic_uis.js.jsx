var likeButton = React.createClass({

  getInitialState: function() {
    return {liked: false};
  },

  handleClick: function() {
    this.setState({liked: !this.state.liked});
  },

  render: function() {
    var text = this.state.liked? 'like' : 'haven\'t liked';
    return (
      <button onClick={this.handleClick} className="btn btn-primary">
      <i className={'glyphicon glyphicon-heart' + (this.state.liked ? '' : '-empty')}></i>
      &nbsp; You {text} this. Click to toggle
      </button>
    )
  }
});
