import React from 'react';
import './assets/styles/common.scss';
import { VideoBox } from './components/VideoBox';

const App = () => {
    return (
        <>
            <VideoBox source="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" />
        </>
    );
};

export default App;
