
function connected () {
  console.log("connected");
}

export function Connect() {
  return (
    <div className="register">
      <p>But first, what's your pseudo?</p>
      <input type="text" placeholder="Enter your pseudo" />
      <button onClick={connected}>Let's go</button>
    </div>
  );
}
