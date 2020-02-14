<script>
  import SeoTags from "../components/seo-tags.svelte";

  import GithubIcon from "../components/icons/github.svelte";
  import LinkedInIcon from "../components/icons/linkedin.svelte";
  import BlogIcon from "../components/icons/blog.svelte";
  import TwitterIcon from "../components/icons/twitter.svelte";

  if (typeof window !== "undefined") {
    window.onkeypress = function(e) {
      this.currentSection = this.currentSection || 0;
      this.$sections =
        this.$sections || document.getElementsByClassName("section");
      if (
        (e.charCode === 106 || e.keyCode === 40) &&
        this.currentSection < this.$sections.length - 1
      ) {
        window.scrollTo(0, this.$sections[++this.currentSection].offsetTop);
        return false;
      } else if (
        (e.charCode === 107 || e.keyCode === 38) &&
        this.currentSection > 0
      ) {
        window.scrollTo(0, this.$sections[--this.currentSection].offsetTop);
        return false;
      }
    };
  }
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

  .row {
    background-color: transparent;
    border: none;
  }

  a {
    color: #3493f2;
  }

  .section {
    position: relative;
    min-height: 100vh;
    color: white;
    background-color: #673ab7;
    padding: 2% 5%;
    box-shadow: 0px 10px 50px 20px black;
  }

  .social-icons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 2em;
  }

  :global(.social-icons-svg) {
    filter: invert(100%);
    transform: scale(1.5);
  }

  .uses {
    font-size: 2rem;
    display: block;
    font-style: italic;
    color: #ffc600;
    text-decoration: underline #eb4471;
    text-align: center;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 10vh;
  }

  .talks {
    display: grid;
    grid-gap: 50px;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    width: 100%;
  }

  .talk-video img,
  .talk-image {
    height: 50vh;
    width: 100%;
    object-fit: cover;
  }

  .talk-video {
    position: relative;
  }

  .talk-video:hover::after {
    transform: scale(5);
    background: rgba(100, 100, 100, 0.6);
  }

  .talk-video::after {
    content: "►";
    position: absolute;
    left: 50%;
    top: 50%;
    color: white;
    border-radius: 50%;
    background: rgba(100, 100, 100, 0.4);
    transform: scale(4.7);
    height: 2em;
    width: 2em;
    display: flex;
    justify-content: center;
    transition: transform ease 0.2s;
    align-items: center;
  }

  .section.green {
    background-color: #4caf50;
  }

  .section.green a {
    color: #123886;
  }

  .section.grey {
    background-color: rgb(52, 58, 64);
  }

  .section.blue {
    background-color: #3f51b5;
  }

  .section.yellow {
    background-color: #ffc107;
    color: black;
  }
  .section h1 {
    font-size: 8rem;
    padding: 5% 0;
  }

  .section h3 {
    font-size: 3.5rem;
    padding: 2% 10px;
    margin: 0 -10px;
    position: sticky;
    top: 0;
    background-color: inherit;
    z-index: 1;
  }

  .section h6 {
    font-size: 2rem;
    padding: 2% 0;
  }

  .social-grid .card-title {
    height: 45vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .social-grid a {
    color: inherit;
  }

  .card-title {
    font-size: 154%;
    font-weight: bold;
    padding-bottom: 15px;
    text-transform: uppercase;
  }

  #work .row.card {
    box-shadow: -20px 0 0px -17px grey;
    margin-left: -15px;
    padding-left: 15px;
    box-shadow: -20px 16px 0px -17px #808080;
  }

  #work .row.card::before {
    content: "";
    width: 20px;
    height: 20px;
    background: #939393;
    display: block;
    position: absolute;
    left: -11px;
    border-radius: 50%;
    top: 8px;
  }

  #work .row.card:first-child::before {
    background-color: #4dbf9a;
  }

  @media screen and (max-width: 750px) {
    .section h1 {
      font-size: 8em;
      padding: 5% 0;
    }
    .section h3 {
      font-size: 3.5em;
      padding: 2% 0;
    }

    .section h6 {
      font-size: 2em;
      padding: 2% 0;
    }

    /* Better li padding for mobile */
    dd ul {
      padding-left: 10px !important;
    }

    #main-title {
      align-items: flex-start;
    }

    .talks {
      display: grid;
      grid-gap: 50px;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    .talk-video,
    .talk-image {
      height: 50vh;
      width: 100%;
    }
    .social-icons {
      padding: 0.5em;
    }

    :global(.social-icons-svg) {
      transform: scale(0.8);
    }
  }

  /* Misc change to better align things */
  dd ul {
    padding-left: 20px;
  }
</style>

<SeoTags
  title="Divjot Singh | Developer | Vegan | Sikh"
  description="Developer, Sikh & a Vegan residing in Bengaluru, India."
  imageUrl="https://github.com/bogas04.png"
  pageUrl="https://bogas04.github.io/" />

<div class="section" style="z-index:10">

  <h1 id="main-title">
    <img src="//github.com/bogas04.png" alt="👳🏽" />
    Divjot Singh
  </h1>

  <nav class="social-icons">
    <a
      href="https://linkedin.com/in/bogas04"
      target="_blank"
      rel="noopener noreferrer">
      <LinkedInIcon class="social-icons-svg" />
    </a>
    <a
      href="https://twitter.com/bogas04"
      target="_blank"
      rel="noopener noreferrer">
      <TwitterIcon class="social-icons-svg" />
    </a>
    <a href="/blog" rel="prefetch">
      <BlogIcon class="social-icons-svg" />
    </a>
    <a
      href="https://github.com/bogas04"
      target="_blank"
      rel="noopener noreferrer">
      <GithubIcon class="social-icons-svg" />
    </a>
  </nav>

  <a class="uses" href="/uses" rel="prefetch">/uses</a>

</div>
<!-- Section Ends -->

<div class="section grey" style="z-index:12" id="work">

  <h3>Such Work</h3>

  <div class="container-fluid">

    <div class="row card">
      <div class="card-title">
        <a target="_blank" rel="noopener noreferrer" href="https://swiggy.com">
          Swiggy, Bengaluru
        </a>
        , Software Development Engineer III
      </div>
      <dl class="dl-horizontal">
        <dt>Duration:</dt>
        <dd>November 2019 - Present</dd>
        <dt>Team:</dt>
        <dd>
          <a
            href="https://www.twitter.com/SwiggyTech"
            rel="noopener noreferrer"
            target="_blank">
            @SwiggyTech
          </a>
          - New Initiatives Team (Web)
        </dd>
        <dt>Projects:</dt>
        <dd>
          <ul>
            <li>Lead the release of Timeline shareability on Swiggy Go.</li>
            <li>Lead the release of Swiggy Stores PWA.</li>
            <li>Lead the release of Swiggy Single Page Checkout for Food.</li>
            <li>Developed new PL driven UI for Swiggy Stores.</li>
            <li>
              Developed a system for incorporating Origin Trials for our PWAs,
              starting with
              <a
                href="https://web.dev/sms-receiver-api-announcement/"
                target="_blank">
                SMS Receiver API
              </a>
              &
              <a href="https://web.dev/contact-picker/" target="_blank">
                Contacts API
              </a>
              .
            </li>
            <li>
              Deprecated legacy systems and ported the same to modern services.
            </li>
            <li>Regularly worked with and maintained HAProxy configuration.</li>
          </ul>
        </dd>
      </dl>
    </div>

    <div class="row card">
      <div class="card-title">
        <a target="_blank" rel="noopener noreferrer" href="https://swiggy.com">
          Swiggy, Bengaluru
        </a>
        , Software Development Engineer II
      </div>
      <dl class="dl-horizontal">
        <dt>Duration:</dt>
        <dd>January 2018 - November 2019</dd>
        <dt>Team:</dt>
        <dd>
          <a
            href="https://www.twitter.com/SwiggyTech"
            rel="noopener noreferrer"
            target="_blank">
            @SwiggyTech
          </a>
          - Web Team
        </dd>
        <dt>Projects:</dt>
        <dd>
          <ul>
            <li>Designed and developed multi-tenant payments module</li>
            <li>
              Designed and developed website generator (Gauntlet). 10+
              dashboards.
            </li>
            <li>
              Designed and developed static site serving system for legal pages.
            </li>
            <li>
              Designed Hotstar-Pop integration and scaled codepath for 120k RPM.
            </li>
            <li>
              Moved codebase to a monorepo for improved developer experience.
            </li>
            <li>
              Developed automatic UA based asset serving system for smaller
              bundle sizes. (20%)
            </li>
            <li>
              Developed Restaurant Hygiene Pages for PWA and as webview for
              apps.
            </li>
            <li>Developed Everyday Offers Feature for mobile PWA.</li>
          </ul>
        </dd>
        <dt>Major Achievements:</dt>
        <dd>
          <ul>
            <li>Awards: MVP (Oct 2018)</li>
          </ul>
        </dd>
      </dl>
    </div>

    <div class="row card">
      <div class="card-title">
        <a target="_blank" rel="noopener noreferrer" href="https://housing.com">
          Housing.com, Mumbai
        </a>
        , Senior Software Development Engineer
      </div>
      <dl class="dl-horizontal">
        <dt>Duration:</dt>
        <dd>October 2017 - January 2018</dd>
        <dt>Team:</dt>
        <dd>
          <a
            href="https://twitter.com/HousingEngg"
            target="_blank"
            rel="noopener noreferrer">
            @HousingEngg
          </a>
          Frontend team
        </dd>
        <dt>Description:</dt>
        <dd>
          As part of frontend team, I worked on improving performance of housing
          PWA. This was achieved by following enhancements;
          <ul>
            <li>
              Migrated to React 16 from version 15. 50% win for
              <code>renderToString</code>
              completion time.
            </li>
            <li>
              Migrated to NodeJS version 8 from version 6 gave another 50% win
              for above.
            </li>
            <li>Reduced asset size by roughly 20% using Brotli compression.</li>
            <li>
              Optimized PNGs, JPEGs, converted to SVGs wherever possible to
              reduce overall page size.
            </li>
            <li>
              Improved scroll performance of listing page by using
              <code>will-change</code>
              CSS rule, along with disabling
              <code>pointer-events</code>
              on scroll.
            </li>
          </ul>
        </dd>
      </dl>
    </div>

    <div class="row card">
      <div class="card-title">
        <a
          target="_blank"
          href="http://www.samsung.com/in/aboutsamsung/samsungelectronics/india/rnd.html">
          Samsung R&D Institute, Bangalore
        </a>
        , Software Developer
      </div>
      <dl class="dl-horizontal">
        <dt>Duration:</dt>
        <dd>June 2016 - October 2017</dd>
        <dt>Team:</dt>
        <dd>
          <a
            href="https://twitter.com/SamsungInternet"
            target="_blank"
            rel="noopener noreferrer">
            @SamsungInternet
          </a>
          team
        </dd>
        <dt>Projects:</dt>
        <dd>
          <ul>
            <li>
              <strong>
                <a
                  href="https://chrome.google.com/webstore/detail/samsung-internet/epejdmjgfibjaffbmojllapapjejipkh"
                  target="_blank"
                  rel="noopener noreferrer">
                  Samsung Internet PC Extension
                </a>
              </strong>
              Starting June 2016
              <ul>
                <li>
                  Revamped the extension codebase by switching to modern
                  JavaScript paradigms, UI overhaul and performance
                  optimizations. Improved localization of strings and helped in
                  <a
                    href="https://medium.com/samsung-internet-dev/release-of-samsung-internet-chrome-extension-v2-644e7b97096e"
                    target="_blank"
                    rel="noopener noreferrer">
                    rebranding
                  </a>
                  for version 2.0.
                </li>
                <li>
                  Successfully shipped version 2.0 in March which received great
                  response (chrome web store rating increased from 2.7 to 3.7
                  post launch).
                </li>
                <li>
                  Currently working on adding new features and improving sync
                  performance.
                </li>
                <li>
                  Userbase increased from 8,000 to 60,000 monthly active users
                  (~8x) within 4 months of 2.0 release.
                </li>
              </ul>
            </li>

            <li>
              <strong>
                <a
                  href="https://www.tizenexperts.com/2017/06/galaxy-update-samsung-z2-z3-brings-samsung-z4-galaxy-app-features/"
                  target="_blank"
                  rel="noopener noreferrer">
                  Gaana Web App
                </a>
              </strong>
              Starting March 2017
              <ul>
                <li>
                  Designed and developed the web application in ReactJS + Redux
                  +
                  <a
                    href="https://github.com/styled-components/styled-components"
                    target="_blank"
                    rel="noopener noreferrer">
                    Styled-Components
                  </a>
                  (later replaced with
                  <a
                    href="https://github.com/tkstrong4/emotion"
                    target="_blank"
                    rel="noopener noreferrer">
                    Emotion
                  </a>
                  for perf wins).
                </li>
                <li>
                  Challenges like performance on low end devices, inter-op
                  between Tizen APIs and Web Platform were tackled along with
                  the team.
                </li>
                <li>
                  Successfully launched first phase of app within MyGalaxy on
                  Tizen in Late May.
                </li>
              </ul>
            </li>

            <li>
              <strong>
                <a
                  href="https://play.google.com/store/apps/details?id=com.sec.android.app.sbrowser"
                  target="_blank"
                  rel="noopener noreferrer">
                  Samsung Internet
                </a>
                -
                <a
                  href="http://www.samsung.com/global/galaxy/apps/bixby/"
                  target="_blank"
                  rel="noopener noreferrer">
                  Bixby
                </a>
              </strong>
              April 2017 – July 2017
              <ul>
                <li>
                  Wrote JSGF gram files for Samsung Internet domain. [
                  <a
                    href="https://www.youtube.com/watch?v=k2IM_wHrSQ8"
                    target="_blank"
                    rel="noopener noreferrer">
                    video
                  </a>
                  ]
                </li>
                <li>
                  Helped in bringing accuracy to 95%+ for Bixby US launch.
                </li>
              </ul>
            </li>
          </ul>
        </dd>
        <dt>Major Achievements:</dt>
        <dd>
          <ul>
            <li>
              <strong>Employee of the Month (December 2016)</strong>
              Awarded as Employee of the Month for supporting and developing
              Samsung Internet PC Extension v2.0 in HQ.
            </li>
            <li>
              <strong>Samsung Citizen Award (March 2017)</strong>
              <em>
                "Though a fresher and new to product development, [he] took up
                one of the key components of Samsung Internet browser, viz
                Samsung Internet Extension for Chrome and commercialized it
                flawlessly. All through the project, [he] has displayed enormous
                passion with a clear goal of making it much better."
              </em>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
    <!-- Row Ends -->

    <div class="row card">
      <div class="card-title">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://chefsbasket.com">
          Fizzy Food Lab's, Mumbai
        </a>
        , Fullstack JavaScript Developer
      </div>
      <dl class="dl-horizontal">
        <dt>Duration:</dt>
        <dd>December 2015 - January 2016</dd>
        <dt>Description:</dt>
        <dd>
          <ul>
            <li>
              Developed an
              <a
                href="http://chefsbasket.herokuapp.com"
                target="_blank"
                rel="noopener noreferrer">
                SPA
              </a>
              using ReactJS, NodeJS and Postgresql
            </li>
          </ul>
        </dd>
      </dl>
    </div>
    <!-- Row Ends -->

    <div class="row card">
      <div class="card-title">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="//www.samsung.com/in/sri-b/siso.html">
          Samsung Research Institute, Bangalore
        </a>
        , Student Trainee
      </div>
      <dl class="dl-horizontal">
        <dt>Duration:</dt>
        <dd>June 2015 - August 2015</dd>
        <dt>Description:</dt>
        <dd>
          <ul>
            <li>
              Developed tile based map server using NodeJS, mapnik and TileMill
            </li>
            <li>
              Set up Mongodb cluster (3 systems), developed scripts to convert
              data from mongodb to CSVs and CSVs to JSON to-and-from a Hadoop
              cluster, and a web app to display results of the road anlaysis
              done by Hadoop.
            </li>
          </ul>
        </dd>
      </dl>
    </div>
    <!-- Row Ends -->

    <div class="row card">
      <div class="card-title">
        <a target="_blank" rel="noopener noreferrer" href="//refiral.com">
          Refiral
        </a>
        , Product Developer
      </div>
      <dl class="dl-horizontal">
        <dt>Duration:</dt>
        <dd>October 2013 - October 2014</dd>
        <dt>Description:</dt>
        <dd>
          Co-founding team member. Managed JavaScript head of the tool.
          <ul>
            <li>
              Health Report tool for analyzes all clients statistically and
              constantly check for API health status, hence benefiting in
              tracking downtimes and losses.
            </li>
            <li>
              Performance improvements by deploying faster routes to server
              calls. (300-400ms win)
            </li>
            <li>Expanding support to several e-commerce platforms.</li>
            <li>
              Extending help in creating the internal API. Made its use to make
              several customizable popouts, providing more options than
              industry.
            </li>
            <li>
              Integration with social networks to enable the tool. Studied
              Facebook documentation to leverage best out of its Graph API.
            </li>
            <li>
              Helped in strategy and planning of the tool in its initial phase.
            </li>
          </ul>
        </dd>
      </dl>
    </div>
    <!-- Row Ends -->
    <div class="row card">
      <div class="card-title">
        <a target="_blank" rel="noopener noreferrer" href="//frrole.com">
          Frrole
        </a>
        , Frontend Development Intern
      </div>
      <dl class="dl-horizontal">
        <dt>Duration:</dt>
        <dd>November 2013 - January 2014</dd>
        <dt>Description:</dt>
        <dd>
          Buzzometer - Created an interactive and responsive web app using the
          APIs of Frrole using jQuery, PHP and XML for analyzing the buzz
          created by a particular movie.
        </dd>
      </dl>
    </div>
    <!-- Row Ends -->

    <div class="row card">
      <div class="card-title">
        And much more, meet up for a &#9749; coffee if my work interests you
      </div>
    </div>
  </div>
</div>
<!-- Section Ends-->

<div class="section yellow" style="z-index:11" id="education">

  <h3>Much Education</h3>

  <div class="container-fluid">

    <div class="row card">
      <div class="card-title">
        <a
          href="https://linkedin.com/in/bogas04"
          target="_blank"
          rel="noopener noreferrer">
          Professionally Me
        </a>
      </div>

      <dl class="dl-horizontal">
        <dt>Resume:</dt>
        <dd>
          <a target="_blank" rel="noopener noreferrer" href="/resume">
            Download resume
          </a>
        </dd>
        <dt>Programming Languages:</dt>
        <dd>C, TypeScript, JavaScript (ES2015+), PHP, Java,</dd>
        <dt>Stacks/Technologies:</dt>
        <dd>
          <a
            href="https://preactjs.com/"
            target="_blank"
            rel="noopener noreferrer">
            (P)
          </a>
          <a
            href="https://facebook.github.io/react/"
            target="_blank"
            rel="noopener noreferrer">
            ReactJS
          </a>
          ,
          <a
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer">
            Redux
          </a>
          ,
          <a
            href="https://angularjs.org/"
            target="_blank"
            rel="noopener noreferrer">
            AngularJS
          </a>
          ,
          <a
            href="https://getbootstrap.com/"
            target="_blank"
            rel="noopener noreferrer">
            BootStrap
          </a>
          ,
          <a
            href="https://jquery.org/"
            target="_blank"
            rel="noopener noreferrer">
            jQuery
          </a>
          ,
          <a
            href="httpss://nodejs.org/"
            target="_blank"
            rel="noopener noreferrer">
            NodeJS
          </a>
          ,
          <a
            href="https://expressjs.com/"
            target="_blank"
            rel="noopener noreferrer">
            ExpressJS
          </a>
          ,
          <a
            href="https://www.slimframework.com/"
            target="_blank"
            rel="noopener noreferrer">
            Slim MicroFramework
          </a>
          ,
        </dd>
        <dt>Databases</dt>
        <dd>
          <a
            href="https://www.postgresql.org/"
            target="_blank"
            rel="noopener noreferrer">
            PostgreSQL
          </a>
          ,
          <a
            href="https://www.mysql.com/"
            target="_blank"
            rel="noopener noreferrer">
            MySQL
          </a>
          ,
          <a
            href="https://www.mongodb.com/"
            target="_blank"
            rel="noopener noreferrer">
            MongoDB
          </a>
          ,
        </dd>
        <dt>Tools</dt>
        <dd>
          <a href="https://www.npmjs.com/" target="_blank">npm</a>
          ,
          <a href="https://git-scm.com/" target="_blank">git</a>
          ,
          <a href="http://webpack.js.org/" target="_blank">webpack</a>
          ,
          <a href="http://babeljs.io/" target="_blank">babel</a>
          ,
          <a
            href="https://jestjs.io/"
            target="_blank"
            rel="noopener noreferrer">
            Jest
          </a>
          ,
          <a
            href="https://react-styleguidist.js.org/"
            target="_blank"
            rel="noopener noreferrer">
            Styleguidist
          </a>
          ,
          <a href="https://www.heroku.com/" target="_blank">heroku</a>
          ,
          <a href="https://gruntjs.com/" target="_blank">grunt</a>
          ,
          <a href="https://lerna.js.org/" target="_blank">lerna</a>
          ,
          <a href="https://gulpjs.com/" target="_blank">gulp</a>
          ,
          <a href="https://bower.io/" target="_blank">bower</a>
          ,
          <a href="https://code.visualstudio.com/" target="_blank">
            Visual Studio Code
          </a>
          ,
          <a href="https://vim.sourceforge.io/" target="_blank">Vim</a>
          ,
          <a
            href="https://www.jetbrains.com/idea/"
            target="_blank"
            rel="noopener noreferrer">
            IntelliJ IDEA
          </a>
          <a href="https://www.eclipse.org/" target="_blank">Eclipse</a>
          ,
        </dd>
        <dt>Other Languages 🤷‍♂️ :</dt>
        <dd>HTML, CSS, XML, YAML, Stylus</dd>
      </dl>
    </div>
    <!-- Row Ends -->

    <div class="row card">
      <div class="card-title">
        <a target="_blank" rel="noopener noreferrer" href="//nsit.ac.in/">
          Netaji Subhas Institute of Technology
        </a>
      </div>
      <dl class="dl-horizontal">
        <dt>Batch:</dt>
        <dd>2012 - 2016</dd>
        <dt>Performance:</dt>
        <dd>
          79.48%
          <small>
            5
            <sup>th</sup>
            position in entire department (~190 students)
          </small>
        </dd>
        <dt>Majored In:</dt>
        <dd>Computer Engineering</dd>
        <dt>Major Achievements:</dt>
        <dd>
          <ul>
            <li>Granted merit scholarship for all four years.</li>
            <li>
              Consistently stood in top 10 performing students of the
              department.
            </li>
            <li>
              Mentored class of 30 in an IEEE NSIT SIG for Web Development and
              Design
            </li>
            <li>
              Wrote a report on
              <a href="/Rapes.pdf">Rapes</a>
            </li>
            <li>
              Successfully completed projects like :
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="//github.com/bogas04/mvp-generator">
                MVP Generator
              </a>
              |
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="//github.com/bogas04/collnet">
                CollNet
              </a>
              |
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="//github.com/bogas04/cloudkeeper">
                CloudKeeper
              </a>
              |
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="//github.com/bogas04/Attendance-System">
                Student Attendance System
              </a>
              , and more...
            </li>
            <li>
              Worked on a research project under Vidhi Khanduja (Assistant
              Professor) on a database watermarking scheme.
            </li>
          </ul>
        </dd>
        <dt>Societies:</dt>
        <dd>
          <ul>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="//ieeensit.org">
                IEEE NSIT
              </a>
              - Web Developer
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="//junoonnsit.com">
                Junoon - The Official Photography Club
              </a>
              - Core Member
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="//collegespace.in">
                CollegeSpace
              </a>
              - Tech Head
            </li>
          </ul>
        </dd>
      </dl>
    </div>
    <!-- Row Ends -->

    <div class="row card">
      <div class="card-title">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.stmarysschooldwarka.com/">
          St. Mary's School
        </a>
      </div>
      <dl class="dl-horizontal">
        <dt>Batch:</dt>
        <dd>2002- 2012</dd>
        <dt>Board:</dt>
        <dd>CBSE</dd>
        <dt>
          Performance in 12
          <sup>th</sup>
        </dt>
        <dd>95.2%</dd>
        <dt>
          Performance in 10
          <sup>th</sup>
        </dt>
        <dd>9.8 CGPA ~ 93.1%</dd>
        <dt>Major Achievements:</dt>
        <dd>
          <ul>
            <li>
              Granted merit scholarship for 3 years: 10
              <sup>th</sup>
              - 12
              <sup>th</sup>
              grades
            </li>
            <li>
              Topped Science department in 12
              <sup>th</sup>
              Grade
            </li>
          </ul>
        </dd>
      </dl>
    </div>
    <!-- Row Ends -->

  </div>
</div>

<!-- Section Ends-->

<div class="section green" style="z-index:13" id="talks">
  <h3>So Talkative</h3>
  <div class="container-fluid">
    <div class="row">
      <div class="talks">
        <div class="talk">
          <img
            class="talk-image"
            src="img/blazing-fast-web.png"
            alt="Banner image for the talk" />
          <h6 class="talk-title">
            <a href="http://bit.ly/web-performance-2019">
              Web Performance in 2019
            </a>
            at
            <a
              href="https://www.hellomeets.com/"
              target="_blank"
              rel="noopener noreferrer">
              Hello Meets, Swiggy Office
            </a>
          </h6>
        </div>

        <div class="talk">
          <a
            href="https://www.youtube.com/watch?v=2mX8hmefCRI"
            target="_blank"
            class="talk-video">
            <img
              alt="Video of the talk"
              src="https://ytimg.googleusercontent.com/vi/2mX8hmefCRI/maxresdefault.jpg" />
          </a>
          <h6 class="talk-title">
            <a href="https://www.swiggy.com">Swiggy ♥️ Web</a>
            at
            <a
              href="https://www.youtube.com/watch?time_continue=450&v=2mX8hmefCRI&feature=emb_title"
              target="_blank"
              rel="noopener noreferrer">
              Keynote, Google for Mobile India 2019
            </a>
          </h6>
        </div>

        <div class="talk">
          <img
            class="talk-image"
            src="img/react-2019.png"
            alt="Banner image for the talk" />
          <h6 class="talk-title">
            <a href="http://bit.ly/react-2019">React in 2019</a>
            at
            <a
              href="https://www.meetup.com/ReactJS-Bangalore/events/255737841/"
              target="_blank"
              rel="noopener noreferrer">
              ReactJS Bangalore #41
            </a>
          </h6>
        </div>

        <div class="talk">
          <img
            class="talk-image"
            src="img/testing-with-jest.png"
            alt="Banner image for the talk" />
          <h6 class="talk-title">
            <a href="http://bit.ly/jest-04-2018">Testing with Jest</a>
            at
            <a
              href="https://www.meetup.com/ReactJS-Bangalore/events/247773928/"
              target="_blank"
              rel="noopener noreferrer">
              ReactJS Bangalore #32
            </a>
          </h6>
        </div>

        <div class="talk">
          <a
            href="https://www.youtube.com/watch?v=lN8b_fXRC_A"
            target="_blank"
            class="talk-video">
            <img
              alt="Video of the talk"
              src="https://ytimg.googleusercontent.com/vi/lN8b_fXRC_A/maxresdefault.jpg" />
          </a>

          <h6 class="talk-title">
            <a href="http://bit.ly/gddx-dec2017">
              Delivering Fast Web-apps Fast
            </a>
            at
            <a
              href="https://www.meetup.com/GDG-Mumbai/events/245206006/?_cookie-check=hdmhnBaW7ejxNONA"
              target="_blank"
              rel="noopener noreferrer">
              Google Developers' Day, Extended (Mumbai)
            </a>
          </h6>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="section blue" style="z-index:13" id="social">
  <h3>Very Social</h3>
  <div class="container-fluid">

    <div class="row social-grid">
      <div class="col-md-6 text-center">
        <p class="card-title">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="//twitter.com/bogas04">
            Twitter
          </a>
        </p>
        <p class="card-title">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="//instagram.com/bogas04">
            Instagram
          </a>
        </p>
      </div>

      <div class="col-md-6 text-center">
        <p class="card-title">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="//youtube.com/divjotbogas">
            YouTube
          </a>
        </p>
        <p class="card-title">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://medium.com/@bogas04">
            Medium
          </a>
        </p>
      </div>
    </div>
    <!-- Container Ends -->
  </div>
  <!-- Row Ends -->
</div>
<!-- Section Ends -->
