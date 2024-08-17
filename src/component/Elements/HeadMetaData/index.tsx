import { Helmet } from "react-helmet-async";

interface HeadMetaData {
  title?: string;
  metaDescription?: string;
  ogImageUrl?: string;
  pathname?: string;
}

export const HeadMetaData = ({
  title = "Hello welcome guyss",
  metaDescription,
  ogImageUrl = "images/banner.png",
  pathname = "",
}: HeadMetaData) => {
  const defaultTitle = "CiniKupi";
  const baseUrl = "https://cini-kupi.vercel.app";
  const pageUrl = new URL(pathname, baseUrl).toString();
  return (
    <Helmet>
      <meta charSet="UTF-8"></meta>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <title>{title + " | " + defaultTitle}</title>
      {/* metadata */}
      <meta name="title" content={title + " | " + defaultTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="og:image" itemProp="image" content={ogImageUrl} />
      <meta property="og:url" content={pageUrl} />
      <link rel="shortcut icon" href="images/logo.png" />

      <meta property="og:type" content="website" />
      <meta property="og:image" itemProp="image" content={ogImageUrl} />
      <meta property="og:title" content={title + " | " + defaultTitle} />
      <meta property="og:description" content={metaDescription} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={title + " | " + defaultTitle} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta property="twitter:description" content={metaDescription} />
    </Helmet>
  );
};
