import React from "react";
import "../styles/footer.css";


// Footer avec infos des réseaux sociaux de LoL et le copyrigth
export function Footer() {
  return (
    <footer>
      <p>© 2025 Average Player</p>
      <ul>
        <li>
          <a
            href="https://www.instagram.com/leagueoflegends/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/assets/logos/insta.png" alt="Instagram" />
          </a>
        </li>
        <li>
          <a
            href="https://x.com/leagueoflegends"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/assets/logos/x.png" alt="Twitter" />
          </a>
        </li>
        <li>
          <a
            href="https://www.twitch.tv/directory/category/league-of-legends?lang=fr"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/assets/logos/twitch.png" alt="Twitch" />
          </a>
        </li>
      </ul>
    </footer>
  );
}
