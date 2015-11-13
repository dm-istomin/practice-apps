var HelloWorld = React.createClass({
  render: function() {
    console.log('Render!');
    return (
      <p>
        <em>Type your name. Notice that only the time gets redrawn:</em><br/><br/><br/>
        Hello, <input type="text" placeholder="Your name here" /> !<br/>
        It is <b>{ this.props.date }</b>
      </p>
    );
  },

  componentDidMount: function() {
    console.log('componentDidMount!');
    window.renderInterval = setInterval(function() {
        ReactDOM.render(
          <HelloWorld date={new Date().toTimeString()} />,
          document.getElementById('example')
        )
    }, 500);
  },

  componentWillUnmount: function() {
    console.log('componentWillUnmount!');
    clearInterval(window.renderInterval);
  }
});
