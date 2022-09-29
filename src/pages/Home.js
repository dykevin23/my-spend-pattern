const Home = () => {
  const apiCall = async () => {
    console.log("### my-spend-pattern app start");
    const resposne = await (await fetch("/test")).json();
    console.log("### response => ", resposne);
  };

  return (
    <div>
      Home
      <div>Hello React.js</div>
      <button onClick={apiCall}>apiCall</button>
    </div>
  );
};

export default Home;
