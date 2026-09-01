'use client';
import { useEffect, useRef, useState } from 'react';

/* Draws a still out of the recording itself, so the picture standing for a clip
   is always a picture of that clip and there is no separate image to keep in
   step with it. The clip fades up from black, so the opening frame is not worth
   showing and a moment in is. */
export function useVideoFrame(src: string, at = 9) {
    const [frame, setFrame] = useState<string>();
    const cancelled = useRef(false);

    useEffect(() => {
        cancelled.current = false;

        const video = document.createElement('video');
        video.muted = true;
        video.preload = 'auto';

        const draw = () => {
            if (cancelled.current) {
                return;
            }

            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d')?.drawImage(video, 0, 0);

            try {
                setFrame(canvas.toDataURL('image/jpeg', 0.8));
            } catch {
                /* A cross-origin recording taints the canvas. Nothing to show,
                   and the still stays empty rather than breaking the page. */
            }
        };

        const seek = () => { video.currentTime = Math.min(at, video.duration || at); };

        video.addEventListener('loadeddata', seek);
        video.addEventListener('seeked', draw, { once: true });
        video.src = src;

        return () => {
            cancelled.current = true;
            video.removeEventListener('loadeddata', seek);
            video.removeAttribute('src');
            video.load();
        };
    }, [src, at]);

    return frame;
}

interface VideoFrameProps {
    src: string;
    at?: number;
    alt: string;
    className?: string;
}

export default function VideoFrame({src, at, alt, className}: VideoFrameProps) {
    const frame = useVideoFrame(src, at);

    return frame
        ? <img className={className} src={frame} alt={alt} />
        : <div className={`${className ?? ''} plate-placeholder`} aria-hidden="true" />;
}
