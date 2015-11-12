console.log('hello_world.es6.jsx is loaded!');
class HelloMessage extends React.Component {
  render () {
    const welcome = "Hello, ";
    return (
      <div>
        <h3>{welcome} {this.props.name} !</h3>
      </div>
    );
  }
};
