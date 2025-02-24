import "../assets/styles/home.css";
import { Connect } from "./Connect";

export function Concept() {
  return (
    <div className="concept">
      <div className="concept-intro">
        <p>
          You've spent days, months, years playing, watching gameplays, learning
          strategies on League of Legends.
        </p>
        <p>
          After all that time, do you think you know everything there is to know
          about the game universe? Test yourself : enter the Summoner's Rift and
          see if you can answer all the questions !
        </p>
      </div>
      <Connect />
    </div>
  );
}
