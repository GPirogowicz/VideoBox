import { useState, useEffect } from 'react';
import { debounce } from '../../../helpers/debounce';
var interval = null;

function useVideoMetaInfo(videoRef) {
    const handleChangeDuration = () => {
        setVideoMetaInfo(prev => {
            return {
                ...prev,
                duration: Math.round(videoRef.current.duration),
                offsetHeight: videoRef.current.offsetHeight,
                offsetWidth: videoRef.current.offsetWidth,
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
            }, 1000);
        }
    };
    const [videoMetaInfo, setVideoMetaInfo] = useState({
        currentTime: 0,
        handleChangeDuration: handleChangeDuration,
        handleTogglePlay: handleTogglePlay,
    });
    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setVideoMetaInfo(prevVideoMetainfo => {
                const scale = Math.min(
                    videoRef.current.offsetHeight /
                        prevVideoMetainfo.offsetHeight,
                    videoRef.current.offsetWidth / prevVideoMetainfo.offsetWidth
                );
                return {
                    ...prevVideoMetainfo,
                    duration: Math.round(videoRef.current.duration),
                    offsetHeight: videoRef.current.offsetHeight,
                    offsetWidth: videoRef.current.offsetWidth,
                    differenceOffsetWidth:
                        prevVideoMetainfo.offsetWidth -
                        videoRef.current.offsetWidth,
                    differenceOffsetHeight:
                        prevVideoMetainfo.offsetHeight -
                        videoRef.current.offsetHeight,
                    scale: scale > 1 ? 1 : scale,
                };
            });
        }, 100);

        window.addEventListener('resize', debouncedHandleResize);
        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    });

    return videoMetaInfo;
}

useVideoMetaInfo.propTypes = {};

export default useVideoMetaInfo;
