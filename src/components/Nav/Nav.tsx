import React from "react";
import Typewriter from "typewriter-effect";
import "./Nav.scss";

export default function Nav() {
  return (
    <nav className="navbar">
      <Typewriter
        options={{
          strings: ["Michael's", "Mike's", "Jofis's Daddy's"],
          autoStart: true,
          loop: true,
          delay: 100,
        }}
      />
      <h1>Wordle</h1>
    </nav>
  );
}
