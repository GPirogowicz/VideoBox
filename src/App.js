import React from 'react';
import './assets/styles/common.scss';
import { VideoBox } from './components/VideoBox';

const App = () => {
    return (
        <>
            <VideoBox source="http://www.w3schools.com/html/mov_bbb.mp4" />
        </>
    );
};

export default App;
