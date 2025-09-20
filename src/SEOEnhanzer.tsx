import React from "react";
import { Helmet } from "react-helmet-async";

import Archivo_Black from "./assests/Archivo_Black/ArchivoBlack-Regular.ttf";
import Archivo_Bold from "./assests/Archivo/Archivo-Bold.ttf";
import Archivo_Light from "./assests/Archivo/Archivo-Regular.ttf";
import Archivo_Italic from "./assests/Archivo/Archivo-Italic.ttf";

import { SEO_OptimizerProps } from "./types/types";

const siteName = "MyShop";
const defaultImage = "";

const SEOEnhanzer = ({ title, description, url, imageUrl }: SEO_OptimizerProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

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
