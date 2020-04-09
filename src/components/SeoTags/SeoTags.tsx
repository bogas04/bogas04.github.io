import React, { memo } from "react";
import Head from "next/head";

export interface ISeoTagsProps {
  title?: string;
  keywords?: string;
  pageUrl?: string;
  description?: string;
  imageUrl?: string;
}

function SeoTags({
  title,
  keywords,
  pageUrl,
  description,
  imageUrl,
}: ISeoTagsProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {keywords && keywords.length !== 0 && (
        <meta name="keywords" content={keywords} />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={title} />

      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
    </Head>
  );
}
export default memo(SeoTags);
