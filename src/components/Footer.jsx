import React from "react";
import "../styles/footer.css";

export function Footer() {
  return (
    <footer>
      <p>© 2025 Average Player</p>
      <ul>
        <li>
          <img src="/assets/logos/insta.png" alt="Instagram" />
        </li>
        <li>
          <img src="/assets/logos/x.png" alt="Twitter" />
        </li>
        <li>
          <img src="/assets/logos/twitch.png" alt="Twitch" />
        </li>
      </ul>
    </footer>
  );
}
