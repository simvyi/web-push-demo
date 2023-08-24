import React from "react";
import { Link } from "react-router-dom";

export default function Layout(props: { children: React.ReactElement }) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{props.children}</main>
      <footer>Some footer</footer>
    </>
  );
}
