import { memo } from "react";

import Link from "next/link";

import SeoTags from "../components/SeoTags";
import Section from "../layout/section";

function UsesPage() {
  return (
    <>
      <style>
        {`
#main-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#main-title img {
  background-image: url(/profile.png);
  border-radius: 50%;
  border: 5px solid white;
  min-width: 100px;
  min-height: 100px;
  width: 1.5em;
  height: 1.5em;
  position: relative;
}

a {
  color: white;
  text-decoration: underline;
}


nav {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}


small a {
  font-size: 4rem;
  font-style: italic;
  color: #ffc600;
  text-decoration-color: #eb4471;
}

li {
  list-style: none;
  font-size: 1.5rem;
  margin: 0.5em;
}

li a {
  text-decoration: none;
  color: #ffc600;
}

ul ol li {
  font-size: 0.8em;
}

@media screen and (max-width: 750px) {
  #main-title {
    align-items: flex-start;
  }
  nav {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  li {
    margin-left: 0;
  }
}`}
      </style>

      <SeoTags
        title="What does Divjot Singh use?"
        description="List of all the things Divjot Singh uses in his day to day life."
        imageUrl="/profile.png"
        pageUrl="https://bogas04.github.io/uses"
      />

      <Section style={{ zIndex: 10 }}>
        <h1 id="main-title">
          <img src="/profile.png" alt="👳🏽" />
          <Link href="/">Divjot Singh</Link>{" "}
          <small>
            <a href="http://uses.tech" target="_blank">
              /uses
            </a>
          </small>
        </h1>

        <nav>
          <ul>
            <h2>Software</h2>
            <li>
              <a href="https://code.visualstudio.com" target="_blank">
                👨‍💻 VS Code
              </a>{" "}
              with
              <ol>
                <li>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=ChadBaileyVh.oled-pure-black---vscode"
                    target="_blank"
                  >
                    Dark+ Pure Black (OLED)
                  </a>{" "}
                  theme
                </li>
                <li>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=vscodevim.vim"
                    target="_blank"
                  >
                    Vim
                  </a>{" "}
                  key bindings
                </li>
              </ol>
            </li>
            <li>
              <a href="http://arc.net/" target="_blank">
                🌏 Arc Browser
              </a>
            </li>
            <li>
              <a
                href="https://www.mozilla.org/en-US/firefox/browsers/mobile/android/"
                target="_blank"
              >
                🌏 Firefox for Android
              </a>
            </li>
          </ul>
          <ul>
            <h2>Gadgets</h2>
            <li>
              <a href="https://www.apple.com/macbook-pro-13" target="_blank">
                💻 Macbook Pro (2020)
              </a>
            </li>
            <li>
              <a
                href="https://www.rtings.com/tv/reviews/lg/c1-oled"
                target="_blank"
              >
                📺 LG C1 OLED 48 inch
              </a>
            </li>
            <li>
              <a href="https://www.playstation.com/en-in/ps5/" target="_blank">
                🎮 PlayStation 5
              </a>
            </li>
            <li>
              <a
                href="https://www.xbox.com/consoles/xbox-series-x"
                target="_blank"
              >
                🎮 Xbox Series X
              </a>
            </li>
            <li>
              <a
                href="https://www.gsmarena.com/motorola_edge_30-11500.php"
                target="_blank"
              >
                📱 Motorala Edge 30 (Android Phone)
              </a>
            </li>
          </ul>
        </nav>
      </Section>
    </>
  );
}

export default memo(UsesPage);
