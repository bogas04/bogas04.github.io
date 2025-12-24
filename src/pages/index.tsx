import Link from "next/link";
import { memo, useState } from "react";

import SeoTags from "../components/SeoTags";

import TwitterIcon from "../components/icons/twitter";
import BlogIcon from "../components/icons/blog";
import LinkedInIcon from "../components/icons/linkedin";
import GithubIcon from "../components/icons/github";
import Section from "../layout/section";

function HomePage() {
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
  background-color: white;
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
  color: #bcddff;
}

.social-icons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2em;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.social-icons::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.social-icons a {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-transform: lowercase;
}

.social-icons-svg {
  filter: invert(100%);
  margin-bottom: 0.5em;
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
  border-radius: 16px;
  border: 3px solid black;
}

.talk-video {
  position: relative;
}

.talk-video:hover img {
  border-color: white;
}

.talk-video:hover::after {
  transform: scale(5);
  background: rgba(100, 100, 100, 0.6);
}

.talk-video::after {
  content: "▶";
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
  /* Better li padding for mobile */
  dd ul {
    padding-left: 10px !important;
  }

  #main-title {
    text-align: center;
    font-size: 6rem;
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

  .social-icons-svg {
    transform: scale(0.8);
  }
}

@media screen and (max-width: 450px) {
  #main-title {
    align-items: center;
    font-size: 5rem;
    text-align: center;
  }

  .social-icons {
    margin: 0 -5%;
    width: 100vw;
  }

  .social-icons-svg {
    margin-bottom: 0;
    transform: scale(0.7);
  }

  .travel-map {
    display: none;
  }
}

/* Misc change to better align things */
dd ul {
  padding-left: 20px;
}
`}
      </style>

      <SeoTags
        title="Divjot Singh"
        description="Frontend Engineer, Sceptic & a Vegan residing in Bengaluru, India."
        imageUrl="/profile.png"
        pageUrl="https://bogas04.github.io/"
      />

      <Section style={{ zIndex: 10 }}>
        <h1 id="main-title">
          <img src="/profile.png" alt="👳🏽" />
          Divjot Singh
        </h1>

        <nav className="social-icons">
          <a
            href="https://linkedin.com/in/bogas04"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon className="social-icons-svg" />
            LinkedIn
          </a>
          <a
            href="https://twitter.com/bogas04"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className="social-icons-svg" />
            Twitter
          </a>

          <Link href="/blog">
            <BlogIcon className="social-icons-svg" />
            /blog
          </Link>
          <a
            href="https://github.com/bogas04"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="social-icons-svg" />
            Github
          </a>
        </nav>

        <Link href="/uses" className="uses">
          /uses
        </Link>
      </Section>

      <Section color="grey" style={{ zIndex: 12 }} id="work">
        <h3>Such Work</h3>

        <div className="container-fluid">
          <div className="row card">
            <div className="card-title">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://udaan.com"
              >
                udaan, Bengaluru
              </a>
              , Software Architect
            </div>
            <dl className="dl-horizontal">
              <dt>Duration:</dt>
              <dd>April 2020 - Present</dd>
              <dd>
                <p>Management:</p>
                <ul>
                  <li>
                    Lead a core UI platform team of four very talented
                    developers
                  </li>
                  <li>
                    Planned and delivered quarterly roadmaps with data-driven
                    tasks and output
                  </li>
                  <li>
                    Identified and worked around common problems faced in
                    leading a team (consistent deliverables, team morale,
                    measuring impact, breaking down long running issues, scoping
                    tasks, asynchronous communication, ...).
                  </li>
                  <li>
                    Consecutively won two "Lead without authority" knolskape
                    leadering programmes
                  </li>
                </ul>
              </dd>
              <dd>
                <p>Individual Contributions:</p>
                <ul>
                  <li>
                    Published{" "}
                    <a href="https://vitadrop.in" rel="noopener noreferrer">
                      vitadrop.in
                    </a>{" "}
                    and{" "}
                    <a href="https://annabhumi.com" rel="noopener noreferrer">
                      annabhumi.com
                    </a>{" "}
                    AI assisted brand websites.
                  </li>
                  <li>
                    Developed{" "}
                    <a href="https://wondermart.com" rel="noopener noreferrer">
                      wondermart
                    </a>{" "}
                    app from scratch in 1 month for b2c vertical.
                  </li>
                  <li>
                    Fixed a{" "}
                    <a
                      href="https://medium.com/engineering-udaan/how-we-solved-a-2s-stutter-caused-by-re-rendering-react-components-5b852ca1852a"
                      rel="noopener noreferrer"
                    >
                      2400ms
                    </a>{" "}
                    re-rendering linked stutter caused on add to cart action.
                  </li>
                  <li>
                    Reduced react-native codepush bundle size by 20% by
                    optimizing image assets
                  </li>
                  <li>
                    Improved app startup time by 75% (P90), thus improving
                    conversions to 2nd page by 35%.
                  </li>
                  <li>
                    Updated internal react-native+react-native-web framework to
                    use functional components with specialized hooks.
                  </li>
                  <li>Built Year In Review screens for 2020 & 2021.</li>
                  <li>
                    Deployed a webview fallback for react-native screens for
                    quicker resolution during outages.
                  </li>
                  <li>
                    Drove improvements for developer experience initiatives by
                    adding CI checks, pre-commit hooks and dev compiler
                    optimizations.
                  </li>
                  <li>
                    Refactored tightly coupled internal library into individual
                    npm packages in a mono-repo.
                  </li>
                  <li>
                    Used extensive A/B testing to drive higher (3.6 to 4.4) app
                    store ratings using a strategically placed prompt.
                  </li>
                  <li>
                    Revamped udaan's homepage with 60fps animations and better
                    SEO.
                  </li>
                  <li>
                    Collaborated to make find.udaan.com during 2nd wave of
                    covid19 in India to facilitate in finding essential
                    medicines.
                  </li>
                  <li>
                    Worked supporting lazy loading of
                    react-native+react-native-web screens.
                  </li>
                  <li>
                    Worked on an internal framework for creating SSR based React
                    apps (using webpack+node)
                  </li>
                  <li>
                    Worked on adding systematic changes to allow Animated
                    Skeleton Screens for faster perceived performance on React
                    Native and Web App.
                  </li>
                  <li>
                    Revamped Order Details Experience for React Native and Web.
                  </li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="row card">
            <div className="card-title">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://swiggy.com"
              >
                Swiggy, Bengaluru
              </a>
              , Software Development Engineer III
            </div>
            <dl className="dl-horizontal">
              <dt>Duration:</dt>
              <dd>November 2019 - April 2020</dd>
              <dt>Team:</dt>
              <dd>
                <a
                  href="https://www.twitter.com/SwiggyTech"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  @SwiggyTech
                </a>{" "}
                - New Initiatives Team (Web)
              </dd>
              <dt>Projects:</dt>
              <dd>
                <ul>
                  <li>
                    Lead the release of Timeline shareability on Swiggy Go.
                  </li>
                  <li>Lead the release of Swiggy Stores PWA.</li>
                  <li>
                    Lead the release of Swiggy Single Page Checkout for Food.
                  </li>
                  <li>Developed new PL driven UI for Swiggy Stores.</li>
                  <li>Developed new Swiggy Genie.</li>
                  <li>
                    Developed a system for incorporating Origin Trials for our
                    PWAs, starting with{" "}
                    <a
                      href="https://web.dev/sms-receiver-api-announcement/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SMS Receiver API
                    </a>{" "}
                    &{" "}
                    <a
                      href="https://web.dev/contact-picker/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contacts API
                    </a>
                    .
                  </li>
                  <li>
                    Deprecated legacy systems and ported the same to modern
                    services.
                  </li>
                  <li>
                    Regularly worked with and maintained HAProxy configuration.
                  </li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="row card">
            <div className="card-title">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://swiggy.com"
              >
                Swiggy, Bengaluru
              </a>
              , Software Development Engineer II
            </div>
            <dl className="dl-horizontal">
              <dt>Duration:</dt>
              <dd>January 2018 - November 2019</dd>
              <dt>Team:</dt>
              <dd>
                <a
                  href="https://www.twitter.com/SwiggyTech"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  @SwiggyTech
                </a>{" "}
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
                    Designed and developed static site serving system for legal
                    pages.
                  </li>
                  <li>
                    Designed Hotstar-Pop integration and scaled codepath for
                    120k RPM.
                  </li>
                  <li>
                    Moved codebase to a monorepo for improved developer
                    experience.
                  </li>
                  <li>
                    Developed automatic UA based asset serving system for
                    smaller bundle sizes. (20%)
                  </li>
                  <li>
                    Developed Restaurant Hygiene Pages for PWA and as webview
                    for apps.
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

          <div className="row card">
            <div className="card-title">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://housing.com"
              >
                Housing.com, Mumbai
              </a>
              , Senior Software Development Engineer
            </div>
            <dl className="dl-horizontal">
              <dt>Duration:</dt>
              <dd>October 2017 - January 2018</dd>
              <dt>Team:</dt>
              <dd>
                <a
                  href="https://twitter.com/HousingEngg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @HousingEngg
                </a>{" "}
                - Frontend team
              </dd>
              <dt>Description:</dt>
              <dd>
                As part of frontend team, I worked on improving performance of
                housing PWA. This was achieved by following enhancements;
                <ul>
                  <li>
                    Migrated to React 16 from version 15. 50% win for{" "}
                    <code>renderToString</code> completion time.
                  </li>
                  <li>
                    Migrated to NodeJS version 8 from version 6 gave another 50%
                    win for above.
                  </li>
                  <li>
                    Reduced asset size by roughly 20% using Brotli compression.
                  </li>
                  <li>
                    Optimized PNGs, JPEGs, converted to SVGs wherever possible
                    to reduce overall page size.
                  </li>
                  <li>
                    Improved scroll performance of listing page by using{" "}
                    <code>will-change</code> CSS rule, along with disabling{" "}
                    <code>pointer-events</code> on scroll.
                  </li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="row card">
            <div className="card-title">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.samsung.com/in/aboutsamsung/samsungelectronics/india/rnd.html"
              >
                Samsung R&D Institute, Bengaluru
              </a>
              , Software Developer
            </div>
            <dl className="dl-horizontal">
              <dt>Duration:</dt>
              <dd>June 2016 - October 2017</dd>
              <dt>Team:</dt>
              <dd>
                <a
                  href="https://twitter.com/SamsungInternet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @SamsungInternet
                </a>{" "}
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
                        rel="noopener noreferrer"
                      >
                        Samsung Internet PC Extension
                      </a>{" "}
                    </strong>
                    Starting June 2016
                    <ul>
                      <li>
                        Revamped the extension codebase by switching to modern
                        JavaScript paradigms, UI overhaul and performance
                        optimizations. Improved localization of strings and
                        helped in{" "}
                        <a
                          href="https://medium.com/samsung-internet-dev/release-of-samsung-internet-chrome-extension-v2-644e7b97096e"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          rebranding
                        </a>{" "}
                        for version 2.0.
                      </li>
                      <li>
                        Successfully shipped version 2.0 in March which received
                        great response (chrome web store rating increased from
                        2.7 to 3.7 post launch).
                      </li>
                      <li>
                        Currently working on adding new features and improving
                        sync performance.
                      </li>
                      <li>
                        Userbase increased from 8,000 to 60,000 monthly active
                        users (~8x) within 4 months of 2.0 release.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <strong>
                      <a
                        href="https://www.tizenexperts.com/2017/06/galaxy-update-samsung-z2-z3-brings-samsung-z4-galaxy-app-features/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Gaana Web App
                      </a>{" "}
                    </strong>
                    Starting March 2017
                    <ul>
                      <li>
                        Designed and developed the web application in ReactJS +
                        Redux +{" "}
                        <a
                          href="https://github.com/styled-components/styled-components"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Styled-Components
                        </a>{" "}
                        (later replaced with{" "}
                        <a
                          href="https://github.com/tkstrong4/emotion"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Emotion
                        </a>{" "}
                        for perf wins).
                      </li>
                      <li>
                        Challenges like performance on low end devices, inter-op
                        between Tizen APIs and Web Platform were tackled along
                        with the team.
                      </li>
                      <li>
                        Successfully launched first phase of app within MyGalaxy
                        on Tizen in Late May.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <strong>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.sec.android.app.sbrowser"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Samsung Internet
                      </a>{" "}
                      -{" "}
                      <a
                        href="http://www.samsung.com/global/galaxy/apps/bixby/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Bixby
                      </a>{" "}
                    </strong>
                    April 2017 – July 2017
                    <ul>
                      <li>
                        Wrote JSGF gram files for Samsung Internet domain. [
                        <a
                          href="https://www.youtube.com/watch?v=k2IM_wHrSQ8"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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
                    <strong>Employee of the Month (December 2016)</strong>{" "}
                    Awarded as Employee of the Month for supporting and
                    developing Samsung Internet PC Extension v2.0 in HQ.
                  </li>
                  <li>
                    <strong>Samsung Citizen Award (March 2017)</strong>{" "}
                    <em>
                      "Though a fresher and new to product development, [he]
                      took up one of the key components of Samsung Internet
                      browser, viz Samsung Internet Extension for Chrome and
                      commercialized it flawlessly. All through the project,
                      [he] has displayed enormous passion with a clear goal of
                      making it much better."
                    </em>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="row card">
            <div className="card-title">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://chefsbasket.com"
              >
                Fizzy Food Lab's, Mumbai
              </a>
              , Fullstack JavaScript Developer
            </div>
            <dl className="dl-horizontal">
              <dt>Duration:</dt>
              <dd>December 2015 - January 2016</dd>
              <dt>Description:</dt>
              <dd>
                <ul>
                  <li>
                    Developed an{" "}
                    <a
                      href="http://chefsbasket.herokuapp.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SPA
                    </a>{" "}
                    using ReactJS, NodeJS and Postgresql
                  </li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="row card">
            <div className="card-title">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="//www.samsung.com/in/sri-b/siso.html"
              >
                Samsung Research Institute, Bengaluru
              </a>
              , Student Trainee
            </div>
            <dl className="dl-horizontal">
              <dt>Duration:</dt>
              <dd>June 2015 - August 2015</dd>
              <dt>Description:</dt>
              <dd>
                <ul>
                  <li>
                    Developed tile based map server using NodeJS, mapnik and
                    TileMill
                  </li>
                  <li>
                    Set up Mongodb cluster (3 systems), developed scripts to
                    convert data from mongodb to CSVs and CSVs to JSON
                    to-and-from a Hadoop cluster, and a web app to display
                    results of the road anlaysis done by Hadoop.
                  </li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="row card">
            <div className="card-title">
              <a target="_blank" rel="noopener noreferrer" href="//refiral.com">
                Refiral, New Delhi
              </a>
              , Product Developer
            </div>
            <dl className="dl-horizontal">
              <dt>Duration:</dt>
              <dd>October 2013 - October 2014</dd>
              <dt>Description:</dt>
              <dd>
                Co-founding member. Managed JavaScript head of the tool.
                <ul>
                  <li>
                    Health Report tool for analyzes all clients statistically
                    and constantly check for API health status, hence benefiting
                    in tracking downtimes and losses.
                  </li>
                  <li>
                    Performance improvements by deploying faster routes to
                    server calls. (300-400ms win)
                  </li>
                  <li>Expanding support to several e-commerce platforms.</li>
                  <li>
                    Extending help in creating the internal API. Made its use to
                    make several customizable popouts, providing more options
                    than industry.
                  </li>
                  <li>
                    Integration with social networks to enable the tool. Studied
                    Facebook documentation to leverage best out of its Graph
                    API.
                  </li>
                  <li>
                    Helped in strategy and planning of the tool in its initial
                    phase.
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
          <div className="row card">
            <div className="card-title">
              <a target="_blank" rel="noopener noreferrer" href="//frrole.com">
                Frrole, Remote
              </a>
              , Frontend Development Intern
            </div>
            <dl className="dl-horizontal">
              <dt>Duration:</dt>
              <dd>November 2013 - January 2014</dd>
              <dt>Description:</dt>
              <dd>
                Buzzometer - Created an interactive and responsive web app using
                the APIs of Frrole using jQuery, PHP and XML for analyzing the
                buzz created by a particular movie.
              </dd>
            </dl>
          </div>

          <div className="row card">
            <div className="card-title">
              And much more, meet up for a &#9749; coffee if my work interests
              you
            </div>
          </div>
        </div>
      </Section>

      <Section color="yellow" style={{ zIndex: 11 }} id="travel">
        <h3>Many Travels</h3>

        <div
          className="travel-map"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem",
            position: "relative",
          }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src="/img/map.png"
              style={{ filter: "grayscale(1) brightness(1.5)", width: "80vw" }}
            />
            {/* Travel markers */}
            {(() => {
              // Utility function to convert lat/lng to percentage position on Equirectangular projection
              const coordsToPosition = (lat: number, lng: number) => ({
                x: ((lng + 180) / 360) * 100,
                y: ((90 - lat) / 180) * 100 + 10,
              });

              // Travel destinations with coordinates and info
              return destinations.map((destination, index) => {
                const position = coordsToPosition(
                  destination.lat,
                  destination.lng
                );

                return (
                  <div
                    key={index}
                    style={{
                      position: "absolute",
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                    }}
                  >
                    <button
                      style={
                        {
                          appearance: "none",
                          background: "none",
                          position: "relative",
                          backgroundColor: "white",
                          height: 10,
                          width: 10,
                          display: "flex",
                          border: "1px solid black",
                          borderRadius: "50%",
                          fontSize: 36,
                          cursor: "pointer",
                          transition: "transform 0.2s ease",
                          // @ts-ignore
                          anchorName: `--anchor-${index}`,
                        } as React.CSSProperties
                      }
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                      // @ts-ignore - popover API is newer than TypeScript definitions
                      popoverTarget={`popover-${destination.name}`}
                      id={`popover-btn-${destination.name}`}
                    >
                      <span style={{ position: "absolute", top: -38 }}>📌</span>
                    </button>
                    <div
                      id={`popover-${destination.name}`}
                      // @ts-ignore - popover API is newer than TypeScript definitions
                      popover="auto"
                      style={
                        {
                          // @ts-ignore
                          positionAnchor: `--anchor-${index}`,
                          // @ts-ignore
                          left: "anchor(right)",
                          // @ts-ignore
                          top: "anchor(top)",
                          margin: "0",
                          border: "none",
                          overflow: "hidden",
                          backgroundColor: "transparent",
                          width: 300,
                          zIndex: 1000,
                        } as React.CSSProperties
                      }
                    >
                      <PopOver destination={destination} />
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            padding: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {destinations.map((destination) => (
            <div style={{ textAlign: "left", color: "white" }}>
              <h4 style={{ marginBottom: "0.5rem", fontSize: "1.6rem" }}>
                {destination.name}
              </h4>
              <p style={{ margin: "0", fontSize: "1.2rem", opacity: 0.8 }}>
                {destination.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section color="pink" style={{ zIndex: 11 }} id="education">
        <h3>Much Education</h3>

        <div className="container-fluid">
          <div className="row card">
            <div className="card-title">
              <a
                href="https://linkedin.com/in/bogas04"
                target="_blank"
                rel="noopener noreferrer"
              >
                Professionally Me
              </a>
            </div>

            <dl className="dl-horizontal">
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
                  rel="noopener noreferrer"
                >
                  (P)
                </a>
                <a
                  href="https://facebook.github.io/react/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ReactJS
                </a>{" "}
                ,{" "}
                <a
                  href="https://redux.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Redux
                </a>{" "}
                ,{" "}
                <a
                  href="https://angularjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AngularJS
                </a>{" "}
                ,{" "}
                <a
                  href="https://getbootstrap.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BootStrap
                </a>{" "}
                ,{" "}
                <a
                  href="https://jquery.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  jQuery
                </a>{" "}
                ,{" "}
                <a
                  href="httpss://nodejs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NodeJS
                </a>{" "}
                ,{" "}
                <a
                  href="https://expressjs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ExpressJS
                </a>{" "}
                ,{" "}
                <a
                  href="https://www.slimframework.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Slim MicroFramework
                </a>
              </dd>
              <dt>Databases</dt>
              <dd>
                <a
                  href="https://www.postgresql.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PostgreSQL
                </a>{" "}
                ,{" "}
                <a
                  href="https://www.mysql.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MySQL
                </a>{" "}
                ,{" "}
                <a
                  href="https://www.mongodb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MongoDB
                </a>
              </dd>
              <dt>Tools</dt>
              <dd>
                <a
                  href="https://www.npmjs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  npm
                </a>{" "}
                ,{" "}
                <a
                  href="https://git-scm.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  git
                </a>{" "}
                ,{" "}
                <a
                  href="http://webpack.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  webpack
                </a>{" "}
                ,{" "}
                <a
                  href="https://rollupjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  rollup
                </a>{" "}
                ,{" "}
                <a
                  href="http://babeljs.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  babel
                </a>{" "}
                ,{" "}
                <a
                  href="https://jestjs.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jest
                </a>{" "}
                ,{" "}
                <a
                  href="https://react-styleguidist.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Styleguidist
                </a>{" "}
                ,{" "}
                <a
                  href="https://www.heroku.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  heroku
                </a>{" "}
                ,{" "}
                <a
                  href="https://gruntjs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  grunt
                </a>{" "}
                ,{" "}
                <a
                  href="https://lerna.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  lerna
                </a>{" "}
                ,{" "}
                <a
                  href="https://gulpjs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  gulp
                </a>{" "}
                ,{" "}
                <a
                  href="https://bower.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  bower
                </a>{" "}
                ,{" "}
                <a
                  href="https://code.visualstudio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visual Studio Code
                </a>{" "}
                ,{" "}
                <a
                  href="https://vim.sourceforge.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vim
                </a>{" "}
                ,{" "}
                <a
                  href="https://www.jetbrains.com/idea/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IntelliJ IDEA
                </a>{" "}
                ,{" "}
                <a
                  href="https://www.eclipse.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Eclipse
                </a>
              </dd>
              <dt>Other Languages 🤷‍♂️ :</dt>
              <dd>HTML, CSS, XML, YAML, Stylus</dd>
            </dl>
          </div>

          <div className="row card">
            <div className="card-title">
              <a target="_blank" rel="noopener noreferrer" href="//nsit.ac.in/">
                Netaji Subhas Institute of Technology
              </a>
            </div>
            <dl className="dl-horizontal">
              <dt>Batch:</dt>
              <dd>2012 - 2016</dd>
              <dt>Performance:</dt>
              <dd>
                79.48%
                <small>
                  5<sup>th</sup>
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
                    Mentored class of 30 in an IEEE NSIT SIG for Web Development
                    and Design
                  </li>
                  <li>
                    Wrote a report on <a href="/Rapes.pdf">Rapes</a>
                  </li>
                  <li>
                    Successfully completed projects like :{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="//github.com/bogas04/mvp-generator"
                    >
                      MVP Generator
                    </a>{" "}
                    |{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="//github.com/bogas04/collnet"
                    >
                      CollNet
                    </a>{" "}
                    |{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="//github.com/bogas04/cloudkeeper"
                    >
                      CloudKeeper
                    </a>{" "}
                    |{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="//github.com/bogas04/Attendance-System"
                    >
                      Student Attendance System
                    </a>{" "}
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
                      href="//ieeensit.org"
                    >
                      IEEE NSIT
                    </a>
                    - Web Developer
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="//junoonnsit.com"
                    >
                      Junoon - The Official Photography Club
                    </a>
                    - Core Member
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="//collegespace.in"
                    >
                      CollegeSpace
                    </a>
                    - Tech Head
                  </li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="row card">
            <div className="card-title">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.stmarysschooldwarka.com/"
              >
                St. Mary's School
              </a>
            </div>
            <dl className="dl-horizontal">
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
                    <sup>th</sup>- 12
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
        </div>
      </Section>

      <Section color="green" style={{ zIndex: 13 }} id="talks">
        <h3>So Talkative</h3>
        <div className="container-fluid">
          <div className="row">
            <div className="talks">
              <div className="talk">
                <a
                  href="https://www.youtube.com/live/Vh5ljTCqGcw?si=HAbW0TShr_TbfIPS&t=11912"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="talk-video"
                >
                  <img
                    loading="lazy"
                    alt="Video of the talk"
                    src="/img/upfront91-2024.png"
                  />
                </a>
                <h6 className="talk-title">
                  <a
                    href="https://docs.google.com/presentation/d/1ih3NXkM9A4bCoMZqlwuXT894savVdkyser812xAHANQ"
                    target="_blank"
                  >
                    Surviving the Crunch
                  </a>{" "}
                  at{" "}
                  <a
                    href="https://www.youtube.com/live/Vh5ljTCqGcw?si=HAbW0TShr_TbfIPS&t=11912"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Upfront91 2024, Make My Trip Office
                  </a>
                </h6>
              </div>

              <div className="talk">
                <a
                  href="https://youtu.be/es-oXFtKshI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="talk-video"
                >
                  <img
                    loading="lazy"
                    alt="Video of the talk"
                    src="/img/designs-of-coder.png"
                  />
                </a>
                <h6 className="talk-title">
                  <a
                    href="https://docs.google.com/presentation/d/1qm_7Td7GkyVud6V9SbhOOZ8zwdhxsm024JW7-C6ziag/edit?usp=sharing"
                    target="_blank"
                  >
                    Designs of a Coder (2021)
                  </a>{" "}
                  at{" "}
                  <a
                    href="https://pesto.tech/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pesto
                  </a>
                </h6>
              </div>

              <div className="talk">
                <img
                  className="talk-image"
                  loading="lazy"
                  src="/img/blazing-fast-web.png"
                  alt="Banner image for the talk"
                />
                <h6 className="talk-title">
                  <a href="http://bit.ly/web-performance-2019" target="_blank">
                    Web Performance in 2019
                  </a>{" "}
                  at{" "}
                  <a
                    href="https://www.hellomeets.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hello Meets, Swiggy Office
                  </a>
                </h6>
              </div>

              <div className="talk">
                <a
                  href="https://www.youtube.com/watch?v=2mX8hmefCRI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="talk-video"
                >
                  <img
                    loading="lazy"
                    alt="Video of the talk"
                    src="https://ytimg.googleusercontent.com/vi/2mX8hmefCRI/maxresdefault.jpg"
                  />
                </a>
                <h6 className="talk-title">
                  <a href="https://www.swiggy.com" target="_blank">
                    Swiggy ♥️ Web
                  </a>{" "}
                  at{" "}
                  <a
                    href="https://www.youtube.com/watch?time_continue=450&v=2mX8hmefCRI&feature=emb_title"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Keynote, Google for Mobile India 2019
                  </a>
                </h6>
              </div>

              <div className="talk">
                <img
                  loading="lazy"
                  className="talk-image"
                  src="/img/react-2019.png"
                  alt="Banner image for the talk"
                />
                <h6 className="talk-title">
                  <a href="http://bit.ly/react-2019" target="_blank">
                    React in 2019
                  </a>{" "}
                  at{" "}
                  <a
                    href="https://www.meetup.com/ReactJS-Bangalore/events/255737841/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ReactJS Bangalore #41
                  </a>
                </h6>
              </div>

              <div className="talk">
                <img
                  loading="lazy"
                  className="talk-image"
                  src="img/testing-with-jest.png"
                  alt="Banner image for the talk"
                />
                <h6 className="talk-title">
                  <a href="http://bit.ly/jest-04-2018" target="_blank">
                    Testing with Jest
                  </a>{" "}
                  at{" "}
                  <a
                    href="https://www.meetup.com/ReactJS-Bangalore/events/247773928/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ReactJS Bangalore #32
                  </a>
                </h6>
              </div>

              <div className="talk">
                <a
                  href="https://www.youtube.com/watch?v=lN8b_fXRC_A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="talk-video"
                >
                  <img
                    loading="lazy"
                    alt="Video of the talk"
                    src="https://ytimg.googleusercontent.com/vi/lN8b_fXRC_A/maxresdefault.jpg"
                  />
                </a>

                <h6 className="talk-title">
                  <a href="http://bit.ly/gddx-dec2017" target="_blank">
                    Delivering Fast Web-apps Fast
                  </a>{" "}
                  at{" "}
                  <a
                    href="https://www.meetup.com/GDG-Mumbai/events/245206006/?_cookie-check=hdmhnBaW7ejxNONA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Developers' Day, Extended (Mumbai)
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section color="blue" style={{ zIndex: 13 }} id="social">
        <h3>Somewhat Social</h3>
        <div className="container-fluid">
          <div className="row social-grid">
            <div className="col-md-6 text-center">
              <p className="card-title">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="//twitter.com/bogas04"
                >
                  Twitter
                </a>
              </p>
            </div>
            <div className="col-md-6 text-center">
              <p className="card-title">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="//youtube.com/divjotbogas"
                >
                  YouTube
                </a>
              </p>
            </div>
            <div className="col-md-12 text-center">
              <p className="card-title" style={{ fontSize: 120 }}>
                🤷‍♂️
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

export default memo(HomePage);

const destinations = [
  {
    name: "🇰🇷 South Korea",
    description: "2016\n• Worked at Samsung HQ, beautiful Fall and snow!",
    images: [
      "img/travel/sk/sk-1.jpg",
      "img/travel/sk/sk-10.jpg",
      "img/travel/sk/sk-11.jpg",
      "img/travel/sk/sk-12.jpg",
      "img/travel/sk/sk-2.jpg",
      "img/travel/sk/sk-3.jpg",
      "img/travel/sk/sk-4.jpg",
      "img/travel/sk/sk-5.jpg",
      "img/travel/sk/sk-6.jpg",
      "img/travel/sk/sk-7.jpg",
      "img/travel/sk/sk-8.jpg",
      "img/travel/sk/sk-9.jpg",
    ],
    lat: 37.5665,
    lng: 126.978,
    color: "#ff6b6b",
  },
  {
    name: "🇲🇻 Maldives",
    description: "2023\n• Island Paradise",
    images: [
      "img/travel/maldives/maldives-1.jpg",
      "img/travel/maldives/maldives-2.jpg",
      "img/travel/maldives/maldives-3.jpg",
      "img/travel/maldives/maldives-4.jpg",
    ],
    lat: 4.1755,
    lng: 73.5093,
    color: "#4ecdc4",
  },
  {
    name: "🇹🇭 Thailand",
    description: "2024, 2025\n• Vegan food, road trips and beautiful sights",
    images: [
      "img/travel/thailand/thailand-1.jpg",
      "img/travel/thailand/thailand-2.jpg",
      "img/travel/thailand/thailand-3.jpg",
      "img/travel/thailand/thailand-4.jpg",
      "img/travel/thailand/thailand-5.jpg",
      "img/travel/thailand/thailand-6.jpg",
      "img/travel/thailand/thailand-7.jpg",
      "img/travel/thailand/thailand-8.jpg",
    ],
    lat: 13.7563,
    lng: 100.5018,
    color: "#45b7d1",
  },
  {
    name: "🇲🇾 Malaysia",
    description: "2024\n• Beautiful temples, George Town",
    images: [],
    lat: 3.139,
    lng: 101.6869,
    color: "#f9ca24",
  },
  {
    name: "🇮🇩 Bali, Indonesia",
    images: [
      "img/travel/bali/bali-1.jpg",
      "img/travel/bali/bali-2.jpg",
      "img/travel/bali/bali-3.jpg",
      "img/travel/bali/bali-4.jpg",
      "img/travel/bali/bali-5.jpg",
      "img/travel/bali/bali-6.jpg",
    ],
    description:
      "2024\n• Stunning views of Nusa Penida, Sidemen and vegan food",
    lat: -8.65,
    lng: 115.2167,
    color: "#6c5ce7",
  },
  {
    name: "🇹🇼 Taiwan",
    images: [
      "img/travel/taiwan/taiwan-1.jpg",
      "img/travel/taiwan/taiwan-10.jpg",
      "img/travel/taiwan/taiwan-11.jpg",
      "img/travel/taiwan/taiwan-2.jpg",
      "img/travel/taiwan/taiwan-3.jpg",
      "img/travel/taiwan/taiwan-4.jpg",
      "img/travel/taiwan/taiwan-5.jpg",
      "img/travel/taiwan/taiwan-6.jpg",
      "img/travel/taiwan/taiwan-7.jpg",
      "img/travel/taiwan/taiwan-8.jpg",
      "img/travel/taiwan/taiwan-9.jpg",
    ],
    description: "2024, 2025\n• Amazing Buddhist culture, vegan food",
    lat: 25.033,
    lng: 121.5654,
    color: "#a29bfe",
  },
  {
    name: "🇬🇧 UK",
    images: [
      "img/travel/uk/uk-1.jpg",
      "img/travel/uk/uk-10.jpg",
      "img/travel/uk/uk-11.jpg",
      "img/travel/uk/uk-12.jpg",
      "img/travel/uk/uk-13.jpg",
      "img/travel/uk/uk-14.jpg",
      "img/travel/uk/uk-15.jpg",
      "img/travel/uk/uk-16.jpg",
      "img/travel/uk/uk-17.jpg",
      "img/travel/uk/uk-18.jpg",
      "img/travel/uk/uk-19.jpg",
      "img/travel/uk/uk-2.jpg",
      "img/travel/uk/uk-3.jpg",
      "img/travel/uk/uk-4.jpg",
      "img/travel/uk/uk-5.jpg",
      "img/travel/uk/uk-6.jpg",
      "img/travel/uk/uk-7.jpg",
      "img/travel/uk/uk-8.jpg",
      "img/travel/uk/uk-9.jpg",
    ],
    description: "2025\n• History & Heritage and lots of pies!",
    lat: 51.5074,
    lng: -0.1278,
    color: "#fd79a8",
  },
  {
    name: "🇮🇪 Ireland",
    images: [
      "img/travel/ireland/ireland-1.jpg",
      "img/travel/ireland/ireland-10.jpg",
      "img/travel/ireland/ireland-11.jpg",
      "img/travel/ireland/ireland-2.jpg",
      "img/travel/ireland/ireland-3.jpg",
      "img/travel/ireland/ireland-4.jpg",
      "img/travel/ireland/ireland-5.jpg",
      "img/travel/ireland/ireland-6.jpg",
      "img/travel/ireland/ireland-7.jpg",
      "img/travel/ireland/ireland-8.jpg",
      "img/travel/ireland/ireland-9.jpg",
    ],
    description: "2025\n• History & Heritage and lots of pies!",
    lat: 53.3498,
    lng: -6.2603,
    color: "#00b894",
  },
];

function PopOver({ destination }: { destination: (typeof destinations)[0] }) {
  const [rotateBy, setRotateBy] = useState(0);

  const rotatedArray = rotateArray(
    [...destination.images.reverse()],
    rotateBy % destination.images.length
  );
  return (
    <button
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.01)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      style={{
        appearance: "none",
        border: "none",
        background: "transparent",
        position: "relative",
        marginTop: 32,
        cursor: "pointer",
        height: 300,
        padding: "0 64px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginBottom: 32,
      }}
      onClick={(e) => {
        setRotateBy((x) => x + 1);
        e.currentTarget.style.transform = "scale(1.05)";
      }}
    >
      {rotatedArray.map((x, i, arr) => (
        <>
          <img
            src={x}
            style={{
              transform: `rotate(${
                i === arr.length - 1 ? 0 : (5 * i * 5) / arr.length
              }deg)`,
              width: "calc(100% - 64px)",
              alignSelf: "center",
              aspectRatio: 1,
              backgroundColor: "white",
              objectFit: "cover",
              position: "absolute",
              padding: 12,
              paddingBottom: i === arr.length - 1 ? 64 : 12,
              border: "1px solid black",
            }}
          />
        </>
      ))}
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 52,
          bottom: 64 + 12,
          left: 32 + 12,
        }}
      >
        <h4 style={{ margin: "0 0 4px 0", fontSize: "16px" }}>
          {destination.name} ({(rotateBy % destination.images.length) + 1}/
          {destination.images.length}){" "}
          <button
            onClick={() => {
              window.open(rotatedArray.at(-1));
            }}
          >
            Enlarge
          </button>
        </h4>
        <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
          {destination.description}
        </p>
      </div>
    </button>
  );
}

const rotateArray = (arr: any[], count = 1) => [
  ...arr.slice(count),
  ...arr.slice(0, count),
];
