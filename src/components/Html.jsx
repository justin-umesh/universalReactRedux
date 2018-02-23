/* eslint-disable */
import React from 'react';
import fs from 'fs';
import { appName, cssName, inlineName, isDev, outputPath, statsName, vendorName } from '../../webpack/env';

export const getScript = (name) => {
  if (isDev) return `/${name}.js`;

  const file = fs.readFileSync(`${outputPath}/${statsName}.json`);
  const stats = JSON.parse(file);
  return name === appName && !isDev
    ? `/${stats.assetsByChunkName[appName][0]}`
    : name === cssName && !isDev
      ? `/${stats.assetsByChunkName[appName][1]}`
      : `/${stats.assetsByChunkName[name]}`;
};

export const getWebpackJsonpInlineScript = () => (isDev
  ? false
  : fs.readFileSync(`${outputPath}/${inlineName}.js`));


const Html = ({
  app,
  content,
  initalState,
  inline,
  styles,
  vendor,
}) => (
  <html
    className="no-js"
    lang="en"
  >
    <head>
      <meta charSet="utf-8" />
      <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible" />

      <title>Universal React Webpack Boilerplate</title>

      <meta content="" name="description" />
      <meta content="" name="keywords" />

      {/* Spiders must use meta description */}
      <meta content="noodp, noydir" name="robots" />

      {/* No Google Translate toolbar */}
      <meta content="notranslate" name="google" />

      {/* Viewport and mobile */}
      <meta
        content="width = device-width,
                     initial-scale = 1,
                     user-scalable = no,
                     maximum-scale = 1,
                     minimum-scale = 1"
        name="viewport"
      />
      <meta content="true" name="HandheldFriendly" />
      <meta content="320" name="MobileOptimized" />

      <link href="/apple-icon-57x57.png" rel="apple-touch-icon" sizes="57x57" />
      <link href="/apple-icon-60x60.png" rel="apple-touch-icon" sizes="60x60" />
      <link href="/apple-icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />
      <link href="/apple-icon-76x76.png" rel="apple-touch-icon" sizes="76x76" />
      <link href="/apple-icon-114x114.png" rel="apple-touch-icon" sizes="114x114" />
      <link href="/apple-icon-120x120.png" rel="apple-touch-icon" sizes="120x120" />
      <link href="/apple-icon-144x144.png" rel="apple-touch-icon" sizes="144x144" />
      <link href="/apple-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
      <link href="/apple-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/android-icon-192x192.png" rel="icon" sizes="192x192" type="image/png" />
      <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
      <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />

      <meta content="#ffffff" name="msapplication-TileColor" />
      <meta content="/ms-icon-144x144.png" name="msapplication-TileImage" />
      <meta content="#ffffff" name="theme-color" />
      {!isDev && <link href={styles} rel="stylesheet" />}
    </head>
    <body>
      <div id="app">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <script dangerouslySetInnerHTML={{ __html: `window.INITIAL_STATE = ${JSON.stringify(initalState).replace(/</g, '\\u003c')}` }} />
      {inline && <script dangerouslySetInnerHTML={{ __html: inline }} />}
      <script src={vendor} />
      <script src={app} />
    </body>
  </html>);

Html.defaultProps = {
  app: getScript(appName),
  inline: getWebpackJsonpInlineScript(),
  styles: getScript(cssName),
  vendor: getScript(vendorName),
};

export default Html;
