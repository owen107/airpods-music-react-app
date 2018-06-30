import Helmet from 'react-helmet';
import React, { Component } from 'react';

const Meta = () => (
  <Helmet
    htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
    titleTemplate="%s | Airpods Music SSR React App"
    titleAttributes={{itemprop: "name", lang: "en"}}
    meta={[
      {charset: "utf-8"},
      {'http-equiv': "X-UA-Compatible", content: "IE=edge"},
      {name: "description", content: "Server side rendering React Music App"},
      {name: "viewport", content: "width=device-width, initial-scale=1"}
    ]}
  />
);

export default Meta;
