var ReusableComponents = React.createClass({
  render: function() {
    return (
      <div>
        <h4>Prop Validation</h4>
        <PropValidationDemo primitiveTypes={[
          'React.PropTypes.array',
          'React.PropTypes.bool',
          'React.PropTypes.func',
          'React.PropTypes.number',
          'React.PropTypes.object',
          'React.PropTypes.string'
        ]} funcProp="not a function!"/>
        <h4>Mixins (With a Timer Demo)</h4>
        <TickTock />
        <h4></h4>
      </div>
    );
  }
});

var PropValidationDemo = React.createClass({
  propTypes: {
    primitiveTypes: React.PropTypes.array,
    funcProp: React.PropTypes.func.isRequired
  },

  render: function() {
    var primitives = this.props.primitiveTypes.map(function(primitive) {
      return (<li key={primitive}><code>{primitive}</code></li>);
    });

    return (
      <div>
        <p>
          To ensure that components are used correctly, you can declare types for
          the props that the component recieves. When a Prop type is incorrect,
          React throws a warning. Open the dev console!
        </p>

        <p>There are several basic primitives, which consist of:</p>

        <ul>
          {primitives}
        </ul>

        <p>There are also a bunch more, check them out <a href="https://facebook.github.io/react/docs/reusable-components.html">here</a>.</p>
      </div>
  );
  }
})

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },

  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },

  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var TickTock = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000);
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for <b>{this.state.seconds}</b> seconds.
      </p>
    )
  }
});
