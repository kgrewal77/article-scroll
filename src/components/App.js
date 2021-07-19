import '../styles/App.css';
import '@fontsource/roboto';
import {Helmet} from 'react-helmet';
import React from 'react';
import Queue from './Queue';


const App = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title> Dig Into </title>
        <meta property="og:title" content="Dig Into: An Infinite Scroll Demo" data-rh="true"/>
        <meta property="og:description" content="My tech demo for infinite scroll content generation in React" data-rh="true"/>
        <meta property="og:url" content="https://article-scroll.web.app"/>
        <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </Helmet>
      <Queue/>
    </React.Fragment>
  );
}

export default App;
