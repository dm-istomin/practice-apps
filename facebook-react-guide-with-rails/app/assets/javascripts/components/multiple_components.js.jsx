var Avatar = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-xs-6 col-md-1">
          <div className="thumbnail">
            <ProfilePic username={this.props.username} />
            <div className="text-center">
              <span><ProfileLink username={this.props.username} /></span>
            </div>
          </div>
        </div>
      </div>

    );
  }
});

var ProfilePic = React.createClass({
  render: function() {
    return (
      <img src={'https://graph.facebook.com/' + this.props.username + '/picture'} />
    );
  }
});

var ProfileLink = React.createClass({
  render: function() {
    return (
      <a href={'https://www.facebook.com/' + this.props.username}>
        {this.props.username}
      </a>
    );
  }
});
