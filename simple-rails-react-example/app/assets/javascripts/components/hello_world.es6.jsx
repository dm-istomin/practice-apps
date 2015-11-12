class HelloMessage extends React.Component {
  render () {
    const welcome = "Hello, ";
    return (
      <div>
        <h3>{welcome} {this.props.name} !</h3>
        <p>
        If you're seeing a message above this line, it means that everything loaded
        correctly.
        </p>
      </div>
    );
  }
};
