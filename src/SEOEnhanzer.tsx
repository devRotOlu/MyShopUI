import React from "react";
import { Helmet } from "react-helmet-async";

import Archivo_Black from "./assests/Archivo_Black/ArchivoBlack-Regular.ttf";
import Archivo_Bold from "./assests/Archivo/Archivo-Bold.ttf";
import Archivo_Light from "./assests/Archivo/Archivo-Regular.ttf";
import Archivo_Italic from "./assests/Archivo/Archivo-Italic.ttf";

import { SEO_OptimizerProps } from "./types/types";
import { getOgImageUrl } from "./helperFunctions/utilityFunctions";
import { useLocation } from "react-router-dom";

const siteName = "MyShop";
const defaultImage = getOgImageUrl("https://res.cloudinary.com/dbtv7vwpx/image/upload/v1758410429/logo_new_2_vpg8ib.png");
const baseUrl = "https://maishop.netlify.app/";

const SEOEnhanzer = ({ title, description, imageUrl, robots }: SEO_OptimizerProps) => {
  const location = useLocation();
  const url = `${baseUrl}${location.pathname}${location.search || ""}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots || "index, follow"} />
      {/* ✅ Canonical */}
      <link rel="canonical" href={url} />

      {/* ✅ Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl || defaultImage} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />

      {/* ✅ Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl || defaultImage} />

      <link rel="preload" href={Archivo_Black} as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={Archivo_Bold} as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={Archivo_Light} as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={Archivo_Italic} as="font" type="font/woff2" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOEnhanzer;
