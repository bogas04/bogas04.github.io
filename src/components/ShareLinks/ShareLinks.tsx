import { useEffect, useState } from "react";

const buttonStyle = {
  height: 40,
  width: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  border: "2px solid black",
  padding: 10,
  backgroundColor: "white",
  fill: "black",
  stoke: "white",
  transition: " 0.5s ease-in",
  opacity: 1,
};

export function ShareLinks(props: { url: string; description?: string }) {
  const description = encodeURIComponent(props.description);
  const url = encodeURIComponent(props.url);

  const [showNativeShare, setShowNativeShare] = useState(false);

  useEffect(() => {
    if (navigator && navigator.share) {
      setShowNativeShare(true);
    }
  }, []);

  function handleShare() {
    navigator.share({
      title: description,
      url,
      text: description,
    });
  }

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {showNativeShare && (
        <button style={buttonStyle} onClick={handleShare} title="Share">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="24px"
            height="24px"
            viewBox="0 0 1000 1000"
            enableBackground="new 0 0 1000 1000"
            xmlSpace="preserve"
          >
            <metadata>
              Svg Vector Icons : http://www.onlinewebfonts.com/icon
            </metadata>
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
              <path d="M4543.1,5013.8c-1164.8-119.2-2204.8-609.3-3015.9-1422.4C775.6,2841.7,318.2,1936.4,137.5,844.6c-50-303.7-50-1137.9,0-1441.7c180.7-1091.8,638.2-1997.2,1389.8-2746.8c930.3-930.3,2147.1-1433.9,3467.6-1433.9c1399.3,0,2685.3,569,3629.1,1603.1c1384,1516.6,1672.3,3752.1,717,5576.3c-649.7,1239.8-1828,2162.5-3183.2,2491.2C5781,4985,5558,5010,5081.3,5015.7C4827.6,5019.6,4585.4,5017.7,4543.1,5013.8z M6594.1,3141.6c347.9-107.6,640.1-421,736.2-790c46.1-173,30.8-482.5-28.8-642c-173-453.6-582.4-738.1-1057.2-740c-215.3,0-444,69.2-624.7,190.3l-57.7,38.4l-874.6-519c-480.6-286.4-884.2-524.8-895.7-532.4c-15.4-9.6-19.2-59.6-13.5-153.8l11.5-140.3l841.9-422.9c465.2-230.7,851.5-421,861.1-421c7.7,0,73,38.4,140.3,84.6c174.9,115.3,332.5,167.2,553.6,178.8c340.2,17.3,615.1-88.4,855.4-328.7c334.5-338.3,417.1-855.4,201.8-1280.2c-224.9-444-740-693.9-1216.7-588.2c-519,115.3-895.7,576.7-897.7,1097.6v96.1l-857.3,428.6l-855.4,428.7L3286-960.4c-190.3-126.9-392.1-190.3-617-190.3c-321-1.9-557.4,98-790,330.6c-226.8,226.8-324.9,465.2-324.9,786.2c0,303.7,103.8,547.8,326.8,774.7c240.3,244.1,488.2,338.3,847.7,321c219.1-11.5,338.3-46.1,519-155.7l103.8-63.4l893.8,530.5l893.8,530.5l-5.8,123c-13.5,273,103.8,595.9,290.2,799.6c157.6,173,384.4,303.7,619,353.7C6163.5,3207,6450,3187.7,6594.1,3141.6z" />
            </g>
          </svg>
        </button>
      )}
      <a
        href={`https://twitter.com/intent/tweet/?text=${description}&url=${url}`}
        target="_blank"
        rel="noopener"
        aria-label="Tweet"
        title="Tweet"
        style={buttonStyle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm5.26 9.38v.34c0 3.48-2.64 7.5-7.48 7.5-1.48 0-2.87-.44-4.03-1.2 1.37.17 2.77-.2 3.9-1.08-1.16-.02-2.13-.78-2.46-1.83.38.1.8.07 1.17-.03-1.2-.24-2.1-1.3-2.1-2.58v-.05c.35.2.75.32 1.18.33-.7-.47-1.17-1.28-1.17-2.2 0-.47.13-.92.36-1.3C7.94 8.85 9.88 9.9 12.06 10c-.04-.2-.06-.4-.06-.6 0-1.46 1.18-2.63 2.63-2.63.76 0 1.44.3 1.92.82.6-.12 1.95-.27 1.95-.27-.35.53-.72 1.66-1.24 2.04z" />
        </svg>
      </a>

      <a
        href={`mailto:?subject=${description}&body=${url}`}
        target="_self"
        rel="noopener"
        aria-label="Mail"
        title="Mail"
        style={buttonStyle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm8 16c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8z" />
          <path d="M17.9 8.18c-.2-.2-.5-.24-.72-.07L12 12.38 6.82 8.1c-.22-.16-.53-.13-.7.08s-.15.53.06.7l3.62 2.97-3.57 2.23c-.23.14-.3.45-.15.7.1.14.25.22.42.22.1 0 .18-.02.27-.08l3.85-2.4 1.06.87c.1.04.2.1.32.1s.23-.06.32-.1l1.06-.9 3.86 2.4c.08.06.17.1.26.1.17 0 .33-.1.42-.25.15-.24.08-.55-.15-.7l-3.57-2.22 3.62-2.96c.2-.2.24-.5.07-.72z" />
        </svg>
      </a>

      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${description}&summary=${description}&source=${url}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on LinkedIn"
        style={buttonStyle}
        title="Share on LinkedIn"
      >
        <svg
          version="1.1"
          x="0px"
          y="0px"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          enableBackground="new 0 0 24 24"
          xmlSpace="preserve"
        >
          <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M9.5,16.5h-2v-7h2V16.5z M8.5,7.5 c-0.553,0-1-0.448-1-1c0-0.552,0.447-1,1-1s1,0.448,1,1C9.5,7.052,9.053,7.5,8.5,7.5z M18.5,16.5h-3V13c0-0.277-0.225-0.5-0.5-0.5 c-0.276,0-0.5,0.223-0.5,0.5v3.5h-3c0,0,0.031-6.478,0-7h3v0.835c0,0,0.457-0.753,1.707-0.753c1.55,0,2.293,1.12,2.293,3.296V16.5z" />
        </svg>
      </a>

      <a
        href={`https://reddit.com/submit/?url=${url}&resubmit=true&title=${description}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on Reddit"
        title="Share on Reddit"
        style={buttonStyle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <circle cx="9.391" cy="13.392" r=".978" />
          <path d="M14.057 15.814c-1.14.66-2.987.655-4.122-.004-.238-.138-.545-.058-.684.182-.13.24-.05.545.19.685.72.417 1.63.646 2.568.646.93 0 1.84-.228 2.558-.642.24-.13.32-.44.185-.68-.14-.24-.445-.32-.683-.18zM5 12.086c0 .41.23.78.568.978.27-.662.735-1.264 1.353-1.774-.2-.207-.48-.334-.79-.334-.62 0-1.13.507-1.13 1.13z" />
          <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm6.673 14.055c.01.104.022.208.022.314 0 2.61-3.004 4.73-6.695 4.73s-6.695-2.126-6.695-4.74c0-.105.013-.21.022-.313C4.537 13.73 4 12.97 4 12.08c0-1.173.956-2.13 2.13-2.13.63 0 1.218.29 1.618.757 1.04-.607 2.345-.99 3.77-1.063.057-.803.308-2.33 1.388-2.95.633-.366 1.417-.323 2.322.085.302-.81 1.076-1.397 1.99-1.397 1.174 0 2.13.96 2.13 2.13 0 1.177-.956 2.133-2.13 2.133-1.065 0-1.942-.79-2.098-1.81-.734-.4-1.315-.506-1.716-.276-.6.346-.818 1.395-.88 2.087 1.407.08 2.697.46 3.728 1.065.4-.468.987-.756 1.617-.756 1.17 0 2.13.953 2.13 2.13 0 .89-.54 1.65-1.33 1.97z" />
          <circle cx="14.609" cy="13.391" r=".978" />
          <path d="M17.87 10.956c-.302 0-.583.128-.79.334.616.51 1.082 1.112 1.352 1.774.34-.197.568-.566.568-.978 0-.623-.507-1.13-1.13-1.13z" />
        </svg>
      </a>

      <a
        href={`https://news.ycombinator.com/submitlink?u=${url}&t=${description}`}
        target="_blank"
        rel="noopener"
        title="Share on HackerNews"
        aria-label="Share on HackerNews"
        style={buttonStyle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          width="24px"
          height="24px"
        >
          <path
            fillRule="evenodd"
            d="M128 256c70.692 0 128-57.308 128-128C256 57.308 198.692 0 128 0 57.308 0 0 57.308 0 128c0 70.692 57.308 128 128 128zm-9.06-113.686L75 60h20.08l25.85 52.093c.397.927.86 1.888 1.39 2.883.53.994.995 2.02 1.393 3.08.265.4.463.764.596 1.095.13.334.262.63.395.898.662 1.325 1.26 2.618 1.79 3.877.53 1.26.993 2.42 1.39 3.48 1.06-2.254 2.22-4.673 3.48-7.258 1.26-2.585 2.552-5.27 3.877-8.052L161.49 60h18.69l-44.34 83.308v53.087h-16.9v-54.08z"
          />
        </svg>
      </a>

      <a
        href={`https://telegram.me/share/url?text=${description}&url=${url}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on Telegram"
        title="Share on Telegram"
        style={buttonStyle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path
            d="M12 23.5c6.35 0 11.5-5.15 11.5-11.5S18.35.5 12 .5.5 5.65.5 12 5.65 23.5 12 23.5zM2.505 11.053c-.31.118-.505.738-.505.738s.203.62.513.737l3.636 1.355 1.417 4.557a.787.787 0 0 0 1.25.375l2.115-1.72a.29.29 0 0 1 .353-.01L15.1 19.85a.786.786 0 0 0 .746.095.786.786 0 0 0 .487-.573l2.793-13.426a.787.787 0 0 0-1.054-.893l-15.568 6z"
            fillRule="evenodd"
          />
        </svg>
      </a>
    </nav>
  );
}
