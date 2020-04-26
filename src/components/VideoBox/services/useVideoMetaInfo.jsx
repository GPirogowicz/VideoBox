import { useState, useEffect } from 'react';
import { debounce } from '../../../helpers/debounce';
var interval = null;

function useVideoMetaInfo(videoRef) {
    const handleChangeDuration = () => {
        setVideoMetaInfo(prev => {
            return {
                ...prev,
                duration: Math.round(videoRef.current.duration),
                initialHeight: videoRef.current.offsetHeight,
                initialWidth: videoRef.current.offsetWidth,
                offsetHeight: videoRef.current.offsetHeight,
                offsetWidth: videoRef.current.offsetWidth,
            };
        });
    };
    const handleTimeUpdate = () => {
        setVideoMetaInfo(prev => {
            return {
                ...prev,
                currentTime: Math.round(videoRef.current.currentTime),
            };
        });
    };
    const handleTogglePlay = () => {
        clearTimeout(interval);
        if (!videoRef.current.paused) {
            interval = setInterval(() => {
                setVideoMetaInfo(prev => {
                    return {
                        ...prev,
                        currentTime: Math.round(videoRef.current.currentTime),
                    };
                });
            }, 100);
        }
    };
    const [videoMetaInfo, setVideoMetaInfo] = useState({
        currentTime: 0,
        handleChangeDuration,
        handleTogglePlay,
        handleTimeUpdate,
    });
    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setVideoMetaInfo(prevVideoMetainfo => {
                const scale = Math.min(
                    videoRef.current.offsetHeight /
                        prevVideoMetainfo.initialHeight,
                    videoRef.current.offsetWidth /
                        prevVideoMetainfo.initialWidth
                );
                return {
                    ...prevVideoMetainfo,
                    duration: Math.round(videoRef.current.duration),
                    offsetHeight: videoRef.current.offsetHeight,
                    offsetWidth: videoRef.current.offsetWidth,
                    scale: scale,
                };
            });
        }, 10);

        window.addEventListener('resize', debouncedHandleResize);
        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    });

    return videoMetaInfo;
}

useVideoMetaInfo.propTypes = {};

export default useVideoMetaInfo;
