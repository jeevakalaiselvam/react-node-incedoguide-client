import React from 'react';
import ReactPlayer from 'react-player';

export default function GuideVideo({ type, url }) {
  return (
    <ReactPlayer
      url="https://www.youtube.com/watch?v=6JfAzmpFSxY"
      width={'100%'}
      height={'100%'}
    />
  );
}
