var Comment = React.createClass({
  rawMarkup: function() {
    var childrenStrings = this.props.children;
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          <strong>{this.props.author}</strong>
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {comment: comment},
      success: function(data) {
        this.setState({data: newComments});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentLogs = this.props.data;
    console.log('this.props.data', commentLogs);
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Comment author={comment.author} key={index}>
          <div className="panel panel-default">
            <div className="panel-heading">{comment.author}</div>
            <div className="panel-body">{JSON.stringify(comment.text)}</div>
          </div>
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.value = '';
    this.refs.text.value = '';
  },
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Add a Comment</div>
        <div className="panel-body">
          <form className="commentForm" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="comment-author">Author</label>
              <input id="comment-author" className="form-control" type="text" placeholder="Your name" ref="author"/>
            </div>
            <div className="form-group">
              <label htmlFor="comment-text">Comment</label>
              <textarea id="comment-text" className="form-control" type="text" placeholder="Say something..." ref="text"/>
            </div>
            <input className="btn btn-primary" type="submit" value="Post" />
          </form>
        </div>
      </div>
    );
  }
});

$(function() {
  var $content = $('#content');
  if ($content.length > 0) {
    ReactDOM.render(
      <CommentBox url="/comments.json" pollInterval={2000} />,
      document.getElementById('content')
    );
  }
})
