import Link from "next/link";
import React, { useEffect, useState } from "react";

import SeoTags from "../components/SeoTags";

import TwitterIcon from "../components/icons/twitter";
import BlogIcon from "../components/icons/blog";
import LinkedInIcon from "../components/icons/linkedin";
import GithubIcon from "../components/icons/github";
import Section from "../layout/section";

function HomePage() {
  return (
    <>
      <SeoTags
        title="Divjot Singh"
        description="Frontend Engineer, Sceptic & a Vegan residing in Bengaluru, India."
        imageUrl="/profile.png"
        pageUrl="https://bogas04.github.io/"
      />
      <Hero />
      <Work />
      <Travel />
      <Education />
      <Talks />
      <Social />
    </>
  );
}

export default HomePage;

function Hero() {
  return (
    <Section style={{ zIndex: 10 }}>
      <h1 className="flex flex-col items-center text-center max-md:text-7xl md:max-lg:text-8xl">
        <img
          src="/profile.png"
          alt="👳🏽"
          className="bg-white rounded-full border-4 border-white min-w-24 min-h-24 w-6 h-6 relative"
        />
        Divjot Singh
      </h1>

      <nav className="w-full flex justify-between p-8 overflow-auto max-lg:p-2 max-sm:mx-[-5%] max-sm:w-screen [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <a
          href="https://linkedin.com/in/bogas04"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-white lowercase"
        >
          <LinkedInIcon className="invert mb-2 max-lg:scale-75 max-sm:mb-0 max-sm:scale-75" />
          LinkedIn
        </a>
        <a
          href="https://twitter.com/bogas04"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-white lowercase"
        >
          <TwitterIcon className="invert mb-2 max-lg:scale-75 max-sm:mb-0 max-sm:scale-75" />
          Twitter
        </a>

        <Link
          href="/blog"
          className="flex flex-col items-center text-white lowercase"
        >
          <BlogIcon className="invert mb-2 max-lg:scale-75 max-sm:mb-0 max-sm:scale-75" />
          /blog
        </Link>
        <a
          href="https://github.com/bogas04"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-white lowercase"
        >
          <GithubIcon className="invert mb-2 max-lg:scale-75 max-sm:mb-0 max-sm:scale-75" />
          Github
        </a>
      </nav>
    </Section>
  );
}
function Work() {
  return (
    <Section color="grey" style={{ zIndex: 12 }} id="work">
      <h3>Such Work</h3>

      <div className="container-fluid">
        {workExperience.map((job) => (
          <div
            key={job.id}
            className={`bg-transparent border-none flex flex-col relative shadow-[-20px_0_0px_-17px_grey] -ml-4 pl-4 before:content-[''] before:w-5 before:h-5 before:block before:absolute before:-left-3 before:rounded-full before:top-2 ${
              job.isCurrent ? "before:bg-emerald-400" : "before:bg-gray-600"
            }`}
          >
            <div className="text-2xl font-bold pb-4 uppercase">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={job.companyUrl}
              >
                {job.company}
              </a>
              , {job.position}
            </div>
            <dl className="dl-horizontal">
              <dt>Duration:</dt>
              <dd>{job.duration}</dd>
              {job.team && (
                <>
                  <dt>Team:</dt>
                  <dd dangerouslySetInnerHTML={{ __html: job.team }} />
                </>
              )}
              {job.descriptions.map((desc, index) => (
                <React.Fragment key={index}>
                  <dt>{desc.title}:</dt>
                  <dd>
                    {desc.title === "Description" &&
                    desc.items.length === 1 &&
                    !desc.items[0].includes("<li>") ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: desc.items[0] }}
                      />
                    ) : (
                      <>
                        {desc.title !== "Description" && <p>{desc.title}:</p>}
                        <ul className="list-disc pl-6">
                          {desc.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              dangerouslySetInnerHTML={{ __html: item }}
                            />
                          ))}
                        </ul>
                      </>
                    )}
                  </dd>
                </React.Fragment>
              ))}
              {job.achievements && (
                <>
                  <dt>Major Achievements:</dt>
                  <dd>
                    <ul className="list-disc pl-6">
                      {job.achievements.map((achievement, index) => (
                        <li
                          key={index}
                          dangerouslySetInnerHTML={{ __html: achievement }}
                        />
                      ))}
                    </ul>
                  </dd>
                </>
              )}
            </dl>
          </div>
        ))}

        <div className="bg-transparent border-none flex flex-col relative shadow-[-20px_0_0px_-17px_grey] -ml-4 pl-4 before:content-[''] before:w-5 before:h-5 before:bg-gray-600 before:block before:absolute before:-left-3 before:rounded-full before:top-2">
          <div className="text-2xl font-bold pb-4 uppercase">
            And much more, meet up for a &#9749; coffee if my work interests you
          </div>
        </div>
      </div>
    </Section>
  );
}

function Travel() {
  const [shownCard, setShownCard] = useState(null);

  useEffect(() => {
    const onEscapePress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShownCard(null);
      }
    };
    window.addEventListener("keydown", onEscapePress);
    return () => {
      window.removeEventListener("keydown", onEscapePress);
    };
  }, []);

  // Travel destinations with coordinates and info
  const markers = travelDestinations.map((destination, index) => {
    const position = coordsToPosition(destination.lat, destination.lng);

    return (
      <div
        key={destination.name}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-[0]"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
        }}
      >
        <button
          className="appearance-none bg-transparent relative bg-white h-2.5 w-2.5 flex border border-black rounded-full text-4xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-150 active:scale-[1.4]"
          onClick={(e) => {
            e.stopPropagation();
            setShownCard(destination);
          }}
        >
          <span className="absolute -top-10">📌</span>
        </button>
      </div>
    );
  });

  return (
    <Section color="yellow" style={{ zIndex: 11 }} id="travel">
      <h3>Many Travels</h3>

      <div
        className="flex justify-center p-8 relative max-sm:hidden "
        onClick={(e) => {
          e.stopPropagation();
          setShownCard(null);
        }}
      >
        <div className="relative inline-block">
          <img
            src="/img/map.png"
            className="grayscale brightness-150 w-[80vw]"
          />
          {markers}

          {shownCard ? (
            <div
              className="absolute overflow-hidden bg-transparent w-[300px] z-[1000]"
              style={{
                top: coordsToPosition(shownCard.lat, shownCard.lng).y + "%",
                left: coordsToPosition(shownCard.lat, shownCard.lng).x + "%",
              }}
            >
              <PopOver destination={shownCard} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="hidden max-sm:flex flex-col gap-3 mx-auto">
        {travelDestinations.map((destination) => (
          <div
            className="cursor-pointer text-left bg-transparent text-black rounded-xl border-2 border-white/50 p-3 hover:bg-white/40 active:bg-white/20"
            key={destination.name}
          >
            <ImageGallery images={destination.images} />
            <h4 style={{ marginBottom: "0.5rem", fontSize: "1.6rem" }}>
              {destination.name}
            </h4>
            <p style={{ margin: "0", fontSize: "1.2rem", opacity: 0.8 }}>
              {destination.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid max-sm:hidden travel-map grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-8 max-w-[1200px] mx-auto">
        {travelDestinations.map((destination) => (
          <button
            className="cursor-pointer text-left bg-transparent text-black rounded-xl border-2 border-white/50 p-3 hover:bg-white/40 active:bg-white/20 flex flex-col align-top"
            onClick={() => {
              setShownCard(destination);
            }}
            key={destination.name}
          >
            <h4 className="text-3xl text-black">{destination.name}</h4>
            <p style={{ margin: "0", fontSize: "1.2rem", opacity: 0.8 }}>
              {destination.description}
            </p>
          </button>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section color="pink" style={{ zIndex: 11 }} id="education">
      <h3>Much Education</h3>

      <div className="container-fluid [&_a]:text-yellow-300 [&_a:hover]:text-gray-200 [&_a:visited]:text-gray-100">
        <div className="bg-transparent border-none flex flex-col relative">
          <div className="text-2xl font-bold pb-4 uppercase">
            <a
              href={educationData.professionalInfo.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {educationData.professionalInfo.title}
            </a>
          </div>

          <dl className="dl-horizontal">
            <dt>Resume:</dt>
            <dd>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={educationData.professionalInfo.resume.link}
              >
                {educationData.professionalInfo.resume.text}
              </a>
            </dd>
            <dt>Programming Languages:</dt>
            <dd>
              {educationData.professionalInfo.programmingLanguages.join(", ")},
            </dd>
            <dt>Stacks/Technologies:</dt>
            <dd>
              {educationData.professionalInfo.stacksTechnologies.map(
                (tech, index) => (
                  <span key={tech.name}>
                    <a
                      href={tech.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tech.name}
                    </a>
                    {index <
                    educationData.professionalInfo.stacksTechnologies.length - 1
                      ? ", "
                      : ""}
                  </span>
                )
              )}
            </dd>
            <dt>Databases</dt>
            <dd>
              {educationData.professionalInfo.databases.map((db, index) => (
                <span key={db.name}>
                  <a href={db.link} target="_blank" rel="noopener noreferrer">
                    {db.name}
                  </a>
                  {index < educationData.professionalInfo.databases.length - 1
                    ? " , "
                    : ""}
                </span>
              ))}
            </dd>
            <dt>Tools</dt>
            <dd>
              {educationData.professionalInfo.tools.map((tool, index) => (
                <span key={tool.name}>
                  <a href={tool.link} target="_blank" rel="noopener noreferrer">
                    {tool.name}
                  </a>
                  {index < educationData.professionalInfo.tools.length - 1
                    ? " , "
                    : ""}
                </span>
              ))}
            </dd>
            <dt>Other Languages 🤷‍♂️ :</dt>
            <dd>{educationData.professionalInfo.otherLanguages.join(", ")}</dd>
          </dl>
        </div>

        {educationData.institutions.map((institution) => (
          <div
            key={institution.name}
            className="bg-transparent border-none flex flex-col relative"
          >
            <div className="text-2xl font-bold pb-4 uppercase">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={institution.link}
              >
                {institution.name}
              </a>
            </div>
            <dl className="dl-horizontal">
              <dt>Batch:</dt>
              <dd>{institution.batch}</dd>

              {institution.type === "school" && institution.board && (
                <>
                  <dt>Board:</dt>
                  <dd>{institution.board}</dd>
                </>
              )}

              <dt>
                {institution.type === "school"
                  ? "Performance in 12th"
                  : "Performance"}
                :
              </dt>
              <dd>
                {institution.type === "school" ? (
                  institution.performance.grade12
                ) : (
                  <>
                    {institution.performance.percentage}
                    <small>{institution.performance.rank}</small>
                  </>
                )}
              </dd>

              {institution.type === "school" &&
                institution.performance.grade10 && (
                  <>
                    <dt>
                      Performance in 10<sup>th</sup>:
                    </dt>
                    <dd>{institution.performance.grade10}</dd>
                  </>
                )}

              {institution.major && (
                <>
                  <dt>Majored In:</dt>
                  <dd>{institution.major}</dd>
                </>
              )}

              <dt>Major Achievements:</dt>
              <dd>
                <ul className="list-disc pl-6">
                  {institution.achievements.map((achievement, index) => (
                    <li key={index}>
                      {typeof achievement === "string" ? (
                        achievement
                      ) : achievement.projects ? (
                        <>
                          {achievement.text}{" "}
                          {achievement.projects.map((project, projectIndex) => (
                            <span key={project.name}>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={project.link}
                              >
                                {project.name}
                              </a>
                              {projectIndex < achievement.projects.length - 1
                                ? " | "
                                : ", and more..."}
                            </span>
                          ))}
                        </>
                      ) : (
                        <>
                          Wrote a report on{" "}
                          <a href={achievement.link}>
                            {achievement.text.replace("Wrote a report on ", "")}
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </dd>

              {institution.societies && (
                <>
                  <dt>Societies:</dt>
                  <dd>
                    <ul className="list-disc pl-6">
                      {institution.societies.map((society) => (
                        <li key={society.name}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={society.link}
                          >
                            {society.name}
                          </a>
                          - {society.role}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </>
              )}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  );
}
function Talks() {
  return (
    <Section color="green" style={{ zIndex: 13 }} id="talks">
      <h3>So Talkative</h3>
      <div className="row px-4">
        <div className="grid gap-12 grid-cols-[repeat(auto-fill,minmax(500px,1fr))] w-full max-lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {talks.map((talk) => {
            const img = (
              <img
                loading="lazy"
                className="object-cover rounded-xl aspect-[4/3]"
                alt="Video of the talk"
                src={talk.image}
              />
            );
            return (
              <div>
                {talk.video ? (
                  <a
                    href={talk.video}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {img}
                  </a>
                ) : (
                  img
                )}
                <h6 className="text-lg font-semibold mt-4">
                  <a href={talk.link} target="_blank">
                    {talk.title}
                  </a>
                  {" at "}
                  <a
                    href={talk.eventLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {talk.event}
                  </a>
                </h6>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function Social() {
  return (
    <Section color="blue" style={{ zIndex: 13 }} id="social">
      <h3>Somewhat Social</h3>
      <div className="container-fluid">
        <div className="row">
          {socialLinks.map((link) => (
            <div className="col-md-6 text-center" key={link.url}>
              <p className="h-96 flex justify-center items-center text-2xl font-bold pb-4 uppercase">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-50"
                  href={link.url}
                >
                  {link.title}
                </a>
              </p>
            </div>
          ))}
          <div className="col-md-12 text-center">
            <p className="text-8xl text-center text-[120px]">🤷‍♂️</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Utility function to convert lat/lng to percentage position on Equirectangular projection
const coordsToPosition = (lat: number, lng: number) => ({
  x: ((lng + 180) / 360) * 100,
  y: ((90 - lat) / 180) * 100 + 10,
});

const workExperience = [
  {
    id: "udaan",
    company: "udaan, Bengaluru",
    companyUrl: "https://udaan.com",
    position: "Software Architect",
    duration: "April 2020 - Present",
    team: undefined,
    isCurrent: true,
    descriptions: [
      {
        title: "Management",
        items: [
          "Lead a core UI platform team of four very talented developers",
          "Planned and delivered quarterly roadmaps with data-driven tasks and output",
          "Identified and worked around common problems faced in leading a team (consistent deliverables, team morale, measuring impact, breaking down long running issues, scoping tasks, asynchronous communication, ...).",
          'Consecutively won two "Lead without authority" knolskape leadering programmes',
        ],
      },
      {
        title: "Individual Contributions",
        items: [
          'Published <a href="https://vitadrop.in" rel="noopener noreferrer">vitadrop.in</a> and <a href="https://annabhumi.com" rel="noopener noreferrer">annabhumi.com</a> AI assisted brand websites.',
          'Developed <a href="https://wondermart.com" rel="noopener noreferrer">wondermart</a> app from scratch in 1 month for b2c vertical.',
          'Fixed a <a href="https://medium.com/engineering-udaan/how-we-solved-a-2s-stutter-caused-by-re-rendering-react-components-5b852ca1852a" rel="noopener noreferrer">2400ms</a> re-rendering linked stutter caused on add to cart action.',
          "Reduced react-native codepush bundle size by 20% by optimizing image assets",
          "Improved app startup time by 75% (P90), thus improving conversions to 2nd page by 35%.",
          "Updated internal react-native+react-native-web framework to use functional components with specialized hooks.",
          "Built Year In Review screens for 2020 & 2021.",
          "Deployed a webview fallback for react-native screens for quicker resolution during outages.",
          "Drove improvements for developer experience initiatives by adding CI checks, pre-commit hooks and dev compiler optimizations.",
          "Refactored tightly coupled internal library into individual npm packages in a mono-repo.",
          "Used extensive A/B testing to drive higher (3.6 to 4.4) app store ratings using a strategically placed prompt.",
          "Revamped udaan's homepage with 60fps animations and better SEO.",
          "Collaborated to make find.udaan.com during 2nd wave of covid19 in India to facilitate in finding essential medicines.",
          "Worked supporting lazy loading of react-native+react-native-web screens.",
          "Worked on an internal framework for creating SSR based React apps (using webpack+node)",
          "Worked on adding systematic changes to allow Animated Skeleton Screens for faster perceived performance on React Native and Web App.",
          "Revamped Order Details Experience for React Native and Web.",
        ],
      },
    ],
    achievements: undefined,
  },
  {
    id: "swiggy-sde3",
    company: "Swiggy, Bengaluru",
    companyUrl: "https://swiggy.com",
    position: "Software Development Engineer III",
    duration: "November 2019 - April 2020",
    team: '<a href="https://www.twitter.com/SwiggyTech" rel="noopener noreferrer" target="_blank">@SwiggyTech</a> - New Initiatives Team (Web)',
    isCurrent: false,
    descriptions: [
      {
        title: "Description",
        items: [
          "Lead the release of Timeline shareability on Swiggy Go.",
          "Lead the release of Swiggy Stores PWA.",
          "Lead the release of Swiggy Single Page Checkout for Food.",
          "Developed new PL driven UI for Swiggy Stores.",
          "Developed new Swiggy Genie.",
          'Developed a system for incorporating Origin Trials for our PWAs, starting with <a href="https://web.dev/sms-receiver-api-announcement/" target="_blank" rel="noopener noreferrer">SMS Receiver API</a> & <a href="https://web.dev/contact-picker/" target="_blank" rel="noopener noreferrer">Contacts API</a>.',
          "Deprecated legacy systems and ported the same to modern services.",
          "Regularly worked with and maintained HAProxy configuration.",
        ],
      },
    ],
    achievements: undefined,
  },
  {
    id: "swiggy-sde2",
    company: "Swiggy, Bengaluru",
    companyUrl: "https://swiggy.com",
    position: "Software Development Engineer II",
    duration: "January 2018 - November 2019",
    team: '<a href="https://www.twitter.com/SwiggyTech" rel="noopener noreferrer" target="_blank">@SwiggyTech</a> - Web Team',
    isCurrent: false,
    descriptions: [
      {
        title: "Description",
        items: [
          "Designed and developed multi-tenant payments module",
          "Designed and developed website generator (Gauntlet). 10+ dashboards.",
          "Designed and developed static site serving system for legal pages.",
          "Designed Hotstar-Pop integration and scaled codepath for 120k RPM.",
          "Moved codebase to a monorepo for improved developer experience.",
          "Developed automatic UA based asset serving system for smaller bundle sizes. (20%)",
          "Developed Restaurant Hygiene Pages for PWA and as webview for apps.",
          "Developed Everyday Offers Feature for mobile PWA.",
        ],
      },
    ],
    achievements: ["Awards: MVP (Oct 2018)"],
  },
  {
    id: "housing",
    company: "Housing.com, Mumbai",
    companyUrl: "https://housing.com",
    position: "Senior Software Development Engineer",
    duration: "October 2017 - January 2018",
    team: '<a href="https://twitter.com/HousingEngg" target="_blank" rel="noopener noreferrer">@HousingEngg</a> - Frontend team',
    isCurrent: false,
    descriptions: [
      {
        title: "Description",
        items: [
          "As part of frontend team, I worked on improving performance of housing PWA. This was achieved by following enhancements:",
          "Migrated to React 16 from version 15. 50% win for <code>renderToString</code> completion time.",
          "Migrated to NodeJS version 8 from version 6 gave another 50% win for above.",
          "Reduced asset size by roughly 20% using Brotli compression.",
          "Optimized PNGs, JPEGs, converted to SVGs wherever possible to reduce overall page size.",
          "Improved scroll performance of listing page by using <code>will-change</code> CSS rule, along with disabling <code>pointer-events</code> on scroll.",
        ],
      },
    ],
    achievements: undefined,
  },
  {
    id: "samsung",
    company: "Samsung R&D Institute, Bengaluru",
    companyUrl:
      "http://www.samsung.com/in/aboutsamsung/samsungelectronics/india/rnd.html",
    position: "Software Developer",
    duration: "June 2016 - October 2017",
    team: '<a href="https://twitter.com/SamsungInternet" target="_blank" rel="noopener noreferrer">@SamsungInternet</a> team',
    isCurrent: false,
    descriptions: [
      {
        title: "Description",
        items: [
          '<strong><a href="https://chrome.google.com/webstore/detail/samsung-internet/epejdmjgfibjaffbmojllapapjejipkh" target="_blank" rel="noopener noreferrer">Samsung Internet PC Extension</a></strong> Starting June 2016: Revamped the extension codebase by switching to modern JavaScript paradigms, UI overhaul and performance optimizations. Improved localization of strings and helped in <a href="https://medium.com/samsung-internet-dev/release-of-samsung-internet-chrome-extension-v2-644e7b97096e" target="_blank" rel="noopener noreferrer">rebranding</a> for version 2.0.',
          "Successfully shipped version 2.0 in March which received great response (chrome web store rating increased from 2.7 to 3.7 post launch).",
          "Currently working on adding new features and improving sync performance.",
          "Userbase increased from 8,000 to 60,000 monthly active users (~8x) within 4 months of 2.0 release.",
          '<strong><a href="https://www.tizenexperts.com/2017/06/galaxy-update-samsung-z2-z3-brings-samsung-z4-galaxy-app-features/" target="_blank" rel="noopener noreferrer">Gaana Web App</a></strong> Starting March 2017: Designed and developed the web application in ReactJS + Redux + <a href="https://github.com/styled-components/styled-components" target="_blank" rel="noopener noreferrer">Styled-Components</a> (later replaced with <a href="https://github.com/tkstrong4/emotion" target="_blank" rel="noopener noreferrer">Emotion</a> for perf wins).',
          "Challenges like performance on low end devices, inter-op between Tizen APIs and Web Platform were tackled along with the team.",
          "Successfully launched first phase of app within MyGalaxy on Tizen in Late May.",
          '<strong><a href="https://play.google.com/store/apps/details?id=com.sec.android.app.sbrowser" target="_blank" rel="noopener noreferrer">Samsung Internet</a> - <a href="http://www.samsung.com/global/galaxy/apps/bixby/" target="_blank" rel="noopener noreferrer">Bixby</a></strong> April 2017 – July 2017: Wrote JSGF gram files for Samsung Internet domain. [<a href="https://www.youtube.com/watch?v=k2IM_wHrSQ8" target="_blank" rel="noopener noreferrer">video</a>]',
          "Helped in bringing accuracy to 95%+ for Bixby US launch.",
        ],
      },
    ],
    achievements: [
      "<strong>Employee of the Month (December 2016)</strong> Awarded as Employee of the Month for supporting and developing Samsung Internet PC Extension v2.0 in HQ.",
      '<strong>Samsung Citizen Award (March 2017)</strong> <em>"Though a fresher and new to product development, [he] took up one of the key components of Samsung Internet browser, viz Samsung Internet Extension for Chrome and commercialized it flawlessly. All through the project, [he] has displayed enormous passion with a clear goal of making it much better."</em>',
    ],
  },
  {
    id: "fizzy",
    company: "Fizzy Food Lab's, Mumbai",
    companyUrl: "http://chefsbasket.com",
    position: "Fullstack JavaScript Developer",
    duration: "December 2015 - January 2016",
    team: undefined,
    isCurrent: false,
    descriptions: [
      {
        title: "Description",
        items: [
          'Developed an <a href="http://chefsbasket.herokuapp.com" target="_blank" rel="noopener noreferrer">SPA</a> using ReactJS, NodeJS and Postgresql',
        ],
      },
    ],
    achievements: undefined,
  },
  {
    id: "samsung-trainee",
    company: "Samsung Research Institute, Bengaluru",
    companyUrl: "//www.samsung.com/in/sri-b/siso.html",
    position: "Student Trainee",
    duration: "June 2015 - August 2015",
    team: undefined,
    isCurrent: false,
    descriptions: [
      {
        title: "Description",
        items: [
          "Developed tile based map server using NodeJS, mapnik and TileMill",
          "Set up Mongodb cluster (3 systems), developed scripts to convert data from mongodb to CSVs and CSVs to JSON to-and-from a Hadoop cluster, and a web app to display results of the road analysis done by Hadoop.",
        ],
      },
    ],
    achievements: undefined,
  },
  {
    id: "refiral",
    company: "Refiral, New Delhi",
    companyUrl: "//refiral.com",
    position: "Product Developer",
    duration: "October 2013 - October 2014",
    team: undefined,
    isCurrent: false,
    descriptions: [
      {
        title: "Description",
        items: [
          "Co-founding member. Managed JavaScript head of the tool.",
          "Health Report tool for analyzes all clients statistically and constantly check for API health status, hence benefiting in tracking downtimes and losses.",
          "Performance improvements by deploying faster routes to server calls. (300-400ms win)",
          "Expanding support to several e-commerce platforms.",
          "Extending help in creating the internal API. Made its use to make several customizable popouts, providing more options than industry.",
          "Integration with social networks to enable the tool. Studied Facebook documentation to leverage best out of its Graph API.",
          "Helped in strategy and planning of the tool in its initial phase.",
        ],
      },
    ],
    achievements: undefined,
  },
  {
    id: "frrole",
    company: "Frrole, Remote",
    companyUrl: "//frrole.com",
    position: "Frontend Development Intern",
    duration: "November 2013 - January 2014",
    team: undefined,
    isCurrent: false,
    descriptions: [
      {
        title: "Description",
        items: [
          "Buzzometer - Created an interactive and responsive web app using the APIs of Frrole using jQuery, PHP and XML for analyzing the buzz created by a particular movie.",
        ],
      },
    ],
    achievements: undefined,
  },
];
const educationData = {
  professionalInfo: {
    title: "Professionally Me",
    link: "https://linkedin.com/in/bogas04",
    resume: {
      text: "Download resume",
      link: "/resume",
    },
    programmingLanguages: [
      "C",
      "TypeScript",
      "JavaScript (ES2015+)",
      "PHP",
      "Java",
    ],
    stacksTechnologies: [
      { name: "(P)", link: "https://preactjs.com/" },
      { name: "ReactJS", link: "https://facebook.github.io/react/" },
      { name: "Redux", link: "https://redux.js.org/" },
      { name: "AngularJS", link: "https://angularjs.org/" },
      { name: "BootStrap", link: "https://getbootstrap.com/" },
      { name: "jQuery", link: "https://jquery.org/" },
      { name: "NodeJS", link: "httpss://nodejs.org/" },
      { name: "ExpressJS", link: "https://expressjs.com/" },
      { name: "Slim MicroFramework", link: "https://www.slimframework.com/" },
    ],
    databases: [
      { name: "PostgreSQL", link: "https://www.postgresql.org/" },
      { name: "MySQL", link: "https://www.mysql.com/" },
      { name: "MongoDB", link: "https://www.mongodb.com/" },
    ],
    tools: [
      { name: "npm", link: "https://www.npmjs.com/" },
      { name: "git", link: "https://git-scm.com/" },
      { name: "webpack", link: "http://webpack.js.org/" },
      { name: "rollup", link: "https://rollupjs.org/" },
      { name: "babel", link: "http://babeljs.io/" },
      { name: "Jest", link: "https://jestjs.io/" },
      { name: "Styleguidist", link: "https://react-styleguidist.js.org/" },
      { name: "heroku", link: "https://www.heroku.com/" },
      { name: "grunt", link: "https://gruntjs.com/" },
      { name: "lerna", link: "https://lerna.js.org/" },
      { name: "gulp", link: "https://gulpjs.com/" },
      { name: "bower", link: "https://bower.io/" },
      { name: "Visual Studio Code", link: "https://code.visualstudio.com/" },
      { name: "Vim", link: "https://vim.sourceforge.io/" },
      { name: "IntelliJ IDEA", link: "https://www.jetbrains.com/idea/" },
      { name: "Eclipse", link: "https://www.eclipse.org/" },
    ],
    otherLanguages: ["HTML", "CSS", "XML", "YAML", "Stylus"],
  },
  institutions: [
    {
      name: "Netaji Subhas Institute of Technology",
      link: "//nsit.ac.in/",
      type: "college",
      batch: "2012 - 2016",
      performance: {
        percentage: "79.48%",
        rank: "5th position in entire department (~190 students)",
      },
      major: "Computer Engineering",
      achievements: [
        "Granted merit scholarship for all four years.",
        "Consistently stood in top 10 performing students of the department.",
        "Mentored class of 30 in an IEEE NSIT SIG for Web Development and Design",
        {
          text: "Wrote a report on Rapes",
          link: "/Rapes.pdf",
        },
        {
          text: "Successfully completed projects like :",
          projects: [
            {
              name: "MVP Generator",
              link: "//github.com/bogas04/mvp-generator",
            },
            { name: "CollNet", link: "//github.com/bogas04/collnet" },
            { name: "CloudKeeper", link: "//github.com/bogas04/cloudkeeper" },
            {
              name: "Student Attendance System",
              link: "//github.com/bogas04/Attendance-System",
            },
          ],
        },
        "Worked on a research project under Vidhi Khanduja (Assistant Professor) on a database watermarking scheme.",
      ],
      societies: [
        { name: "IEEE NSIT", link: "//ieeensit.org", role: "Web Developer" },
        {
          name: "Junoon - The Official Photography Club",
          link: "//junoonnsit.com",
          role: "Core Member",
        },
        { name: "CollegeSpace", link: "//collegespace.in", role: "Tech Head" },
      ],
    },
    {
      name: "St. Mary's School",
      link: "http://www.stmarysschooldwarka.com/",
      type: "school",
      batch: "2002- 2012",
      board: "CBSE",
      performance: {
        grade12: "95.2%",
        grade10: "9.8 CGPA ~ 93.1%",
      },
      achievements: [
        "Granted merit scholarship for 3 years: 10th- 12th grades",
        "Topped Science department in 12th Grade",
      ],
    },
  ],
};
const socialLinks = [
  { title: "Twitter", url: "//twitter.com/bogas04" },
  { title: "YouTube", url: "//youtube.com/divjotbogas" },
];

const talks = [
  {
    image: "/img/upfront91-2024.png",
    title: "Surviving the Crunch",
    link: "https://docs.google.com/presentation/d/1ih3NXkM9A4bCoMZqlwuXT894savVdkyser812xAHANQ",
    event: "Upfront91 2024, Make My Trip Office",
    eventLink: "https://upfront91.makemytrip.com/",
    video:
      "https://www.youtube.com/live/Vh5ljTCqGcw?si=HAbW0TShr_TbfIPS&t=11912",
  },
  {
    image: "/img/designs-of-coder.png",
    title: "Designs of a Coder (2021)",
    link: "https://docs.google.com/presentation/d/1qm_7Td7GkyVud6V9SbhOOZ8zwdhxsm024JW7-C6ziag/edit?usp=sharing",
    event: "Pesto",
    eventLink: "https://pesto.tech/",
    video: "https://youtu.be/es-oXFtKshI",
  },
  {
    image: "/img/blazing-fast-web.png",
    title: "Web Performance in 2019",
    link: "http://bit.ly/web-performance-2019",
    eventLink: "https://www.hellomeets.com/",
    event: "Hello Meets, Swiggy Office",
  },
  {
    image:
      "https://ytimg.googleusercontent.com/vi/2mX8hmefCRI/maxresdefault.jpg",
    title: "Swiggy ♥️ Web",
    link: "https://www.swiggy.com",
    event: "Keynote, Google for Mobile India 2019",
    eventLink: "https://www.youtube.com/watch?v=2mX8hmefCRI",
    video:
      "https://www.youtube.com/watch?time_continue=450&amp;v=2mX8hmefCRI&amp;feature=emb_title",
  },
  {
    image: "/img/react-2019.png",
    title: "React in 2019",
    link: "http://bit.ly/react-2019",
    eventLink: "https://www.meetup.com/reactjs-bangalore/events/255737841/",
    event: "ReactJS Bangalore #41",
  },
  {
    image: "img/testing-with-jest.png",
    title: "Testing with Jest",
    link: "http://bit.ly/jest-04-2018",
    eventLink: "https://www.meetup.com/ReactJS-Bangalore/events/247773928",
    event: "ReactJS Bangalore #32",
  },
  {
    image:
      "https://ytimg.googleusercontent.com/vi/lN8b_fXRC_A/maxresdefault.jpg",
    video: "https://www.youtube.com/watch?v=lN8b_fXRC_A",
    title: "Delivering Fast Web-apps Fast",
    link: "http://bit.ly/gddx-dec2017",
    eventLink:
      "https://www.meetup.com/GDG-Mumbai/events/245206006/?_cookie-check=hdmhnBaW7ejxNONA",
    event: "Google Developers' Day, Extended (Mumbai)",
  },
];
const travelDestinations = [
  {
    name: "South Korea",
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
  },
  {
    name: "Maldives",
    description: "2023\n• Island Paradise",
    images: [
      "img/travel/maldives/maldives-1.jpg",
      "img/travel/maldives/maldives-2.jpg",
      "img/travel/maldives/maldives-3.jpg",
      "img/travel/maldives/maldives-4.jpg",
    ],
    lat: 4.1755,
    lng: 73.5093,
  },
  {
    name: "Thailand",
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
  },
  {
    name: "Malaysia",
    description: "2024\n• Beautiful temples, walkable cities!",
    images: [
      "img/travel/malaysia/malaysia-1.jpg",
      "img/travel/malaysia/malaysia-2.jpg",
      "img/travel/malaysia/malaysia-3.jpg",
      "img/travel/malaysia/malaysia-4.jpg",
      "img/travel/malaysia/malaysia-5.jpg",
    ],
    lat: 3.139,
    lng: 101.6869,
  },
  {
    name: "Bali, Indonesia",
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
  },
  {
    name: "Taiwan",
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
  },
  {
    name: "UK",
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
  },
  {
    name: "Ireland",
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
    description: "2025\n• Happy Pear, Galleries and vegan food!",
    lat: 53.3498,
    lng: -6.2603,
  },
].reverse();

function ImageGallery({ images }: { images: string[] }) {
  // image carousel using css, overflow, scroll snap, mobile friendly
  return (
    <div className="image-gallery flex overflow-x-auto [scroll-snap-type:x_mandatory] gap-2 pb-2 mb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Gallery image ${index + 1}`}
          className="w-[80%] aspect-[16/12] object-cover rounded-lg [scroll-snap-align:start] border border-white/20"
          loading="lazy"
        />
      ))}
      <style jsx>{`
        .image-gallery::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
function PopOver({
  destination,
}: {
  destination: (typeof travelDestinations)[0];
}) {
  const [rotateBy, setRotateBy] = useState(0);

  const rotatedArray = rotateArray(
    [...destination.images.reverse()],
    rotateBy % destination.images.length
  );
  return (
    <button
      className="appearance-none border-none bg-transparent relative mt-8 cursor-pointer h-72 px-16 w-full flex flex-col mb-8 hover:scale-[1.02] active:scale-[1.01]"
      onClick={(e) => {
        e.stopPropagation();
        setRotateBy((x) => x + 1);
      }}
    >
      {rotatedArray.map((x, i, arr) => (
        <img
          key={x}
          src={x}
          className="w-[calc(100%-64px)] self-center aspect-square bg-white object-cover absolute p-3 border border-solid border-black"
          style={{
            transform: `rotate(${
              i === arr.length - 1 ? 0 : (5 * i * 5) / arr.length
            }deg)`,
            paddingBottom: i === arr.length - 1 ? 64 : 12,
          }}
        />
      ))}
      <div className="absolute w-[240px] px-2 h-[52px] top-[180px] left-8">
        <h4 className="m-0 mb-1 text-base">
          {destination.name} ({(rotateBy % destination.images.length) + 1}/
          {destination.images.length}){" "}
          <button
            className="border rounded-md px-2 py-[2px] bg-gray-100 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              window.open(rotatedArray.at(-1));
            }}
          >
            Zoom
          </button>
        </h4>
        <p className="m-0 text-xs text-gray-700">{destination.description}</p>
      </div>
    </button>
  );
}

const rotateArray = (arr: any[], count = 1) => [
  ...arr.slice(count),
  ...arr.slice(0, count),
];
