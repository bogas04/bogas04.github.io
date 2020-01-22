<script>
  import SeoTags from "../components/seo-tags.svelte";
</script>

<style>
  #main-title {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #main-title img {
    background-image: url(//github.com/bogas04.png);
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

  .section {
    position: relative;
    min-height: 100vh;
    color: white;
    background-color: #673ab7;
    padding: 2% 5%;
    box-shadow: 0px 10px 50px 20px black;
  }

  nav {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  .section h1 {
    font-size: 8rem;
    padding: 5% 0;
  }

  .section h2 {
    font-size: 3em;
    padding: 3% 0;
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
    .section h1 {
      font-size: 4em;
      padding: 5% 0;
    }
    .section h2 {
      font-size: 2em;
    }
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
  }
</style>

<SeoTags
  title="What does Divjot Singh use?"
  description="List of all the things Divjot Singh uses in his day to day life."
  imageUrl="https://github.com/bogas04.png"
  pageUrl="https://bogas04.github.io/uses" />

<div class="section" style="z-index:10">

  <h1 id="main-title">
    <img src="//github.com/bogas04.png" alt="👳🏽" />
    <a href="/" rel="prefetch">Divjot Singh</a>
    <small>
      <a href="http://uses.tech" target="_blank">/uses</a>
    </small>
  </h1>

  <nav>
    <ul>
      <h2>Software</h2>
      <li>
        <a href="https://code.visualstudio.com" target="_blank">👨‍💻 VS Code</a>
        with
        <ol>
          <li>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=sdras.night-owl"
              target="_blank">
              Night Owl Light
            </a>
            theme
          </li>
          <li>
            <a
              href="https://github.com/tonsky/FiraCode/wiki/VS-Code-Instructions"
              target="_blank">
              Fira Code
            </a>
            font
          </li>
          <li>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=vscodevim.vim"
              target="_blank">
              Vim
            </a>
            key bindings
          </li>
        </ol>
      </li>
      <li>
        <a
          href="https://www.mozilla.org/en-US/firefox/developer"
          target="_blank">
          🌏 Firefox Developer Edition
        </a>
      </li>
      <li>
        <a href="https://soundcloud.com" target="_blank">🎵 Soundcloud</a>
      </li>
      <li>
        <a href="https://ohmyz.sh" target="_blank">🖥 ZSH</a>
      </li>
    </ul>
    <ul>
      <h2>Gadgets</h2>
      <li>
        <a href="https://www.apple.com/in/macbook-pro-16/" target="_blank">
          💻 Macbook
        </a>
      </li>
      <li>
        <a href="https://www.realme.com/in/realme-x" target="_blank">
          📱 Android Phone
        </a>
      </li>
      <li>
        <a href="https://www.mi.com/redmiairdots" target="_blank">
          🎧 Mi AirDots
        </a>
      </li>
    </ul>
  </nav>
</div>
