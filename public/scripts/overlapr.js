var Login1 = React.createClass({

  render: function() {
    return (
        <button onclick="hello('windows').login()">Windows</button>
    );
  }
});

ReactDOM.render(
  <Login1 />,
  document.getElementById('content')
  );