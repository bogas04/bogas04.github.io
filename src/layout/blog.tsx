const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <style>{`
        main {
            position: relative;
            max-width: 56em;
            background-color: white;
            padding: 2em;
            margin: 0 auto;
            box-sizing: border-box;
        }

        img {
            width: 100%;
        }

        @media (prefers-color-scheme: dark) {
            body,
            main {
                background: #333;
                color: white;
            }

            a {
                color: lightsalmon;
            }
        }
    `}</style>
      <main>{children}</main>
    </>
  );
};
export default BlogLayout;
