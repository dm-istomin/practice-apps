var JSXInDepth = React.createClass({
  render:function() {
    return (
      <JSXExplanation>
        <JSXExplanation.firstChild/>
        <JSXExplanation.secondChild jsExpression={true ? 'hello' : 'wut'}/>
        <JSXExplanation.thirdChild/>
      </JSXExplanation>
    );
  }
});

var JSXExplanation = React.createClass({
  render: function() {
    return (
      <div>{this.props.children}</div>
    );
  }
});

JSXExplanation.firstChild = React.createClass({
  render: function() {
    return (
      <p>It is possible to namespace components.</p>
    );
  }
});

JSXExplanation.secondChild = React.createClass({
  render: function() {
    if (this.props.jsExpression) {
      return (
        <p>
        If you want to use javascript expressions as an attribute value, wrap them in curly braces <code>&#123;&#125;</code>.
        This react component recieved the JavaScript value <code>{this.props.jsExpression}</code> as an argument!
        </p>
      );
    } else {
      return (
        <p>
        No JS expression detected!
        </p>
      )
    }
  }
});

JSXExplanation.thirdChild = React.createClass({
  render: function() {
    return (
      <p>
      {/* Hey look, a comment! */}
      Comments are just like normal JS comments, but you have to remember to put
      them in curly braces <code>&#123;&#125;</code> when in the children section
      of a tag.
      </p>
    )
  }
})
