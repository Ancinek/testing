import React from 'react';
import Helmet from 'react-helmet';

const AboutRoute = () => (
  <div style={{ textAlign: 'center' }}>
    <Helmet>
      <title>About</title>
    </Helmet>
    <p>Produced with love</p>
    <p>Built on top of React Universally</p>
    <p>
      View contributors on our
      {' '}
      <a href="https://github.com/ctrlplusb/react-universally">GitHub</a>
      {' '}
      page.
    </p>
  </div>
);

export default AboutRoute;
