
function connected () {
    const pseudo = document.querySelector('input').value;
    if (pseudo) {
        localStorage.setItem('pseudo', pseudo);
        window.location.reload();
    }
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
