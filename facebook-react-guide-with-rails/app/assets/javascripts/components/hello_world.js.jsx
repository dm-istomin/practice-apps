var HelloWorld = React.createClass({

  render: function() {
    return (
      <p>
        Hello, <input type="text" placeholder="Your name here" /> !<br/>
        It is <b>{ this.props.date.toTimeString() }</b>
      </p>
    );
  }
});

setInterval(function() {
  if (document.getElementById('example')) {
    ReactDOM.render(
      <HelloWorld date={new Date()} />,
      document.getElementById('example')
    )
  }
}, 100);
