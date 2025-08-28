import React from 'react';

function Image({ src, ...rest }) {
  const imageUrl = `${process.env.PUBLIC_URL}${src}`;
  return <img src={imageUrl} {...rest} />;
}

export default Image;