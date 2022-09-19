const App = () => {
  const apiCall = async () => {
    console.log("### my-spend-pattern app start");
    const resposne = await (await fetch("/test")).json();
    console.log("### response => ", resposne);
  };

  return (
    <div>
      Hello React.js<button onClick={apiCall}>api call</button>
    </div>
  );
};

export default App;
