import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  X,
  Sparkles,
  Target,
  ShieldCheck,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import LiveProjectButton from './LiveProjectButton';

export type ProjectFilterGroup = 'cafe' | 'resort' | 'ai-ugc';

export interface ProjectData {
  number: string;
  name: string;
  category: string;
  filterGroup: ProjectFilterGroup;
  buttonLabel?: string;
  metric?: string;
  formatLabel?: string;
  mediaUrl: string;
  posterUrl?: string;
  mediaType?: 'image' | 'video';
  hasAudio?: boolean;
  mediaTitle?: string;
  mediaHint?: string;
  description?: string;
  conceptDetails?: string;
  creativeDirection?: string;
  toolsUsed?: string[];
  tags?: string[];
}

export interface ProjectLightboxHandle {
  playFromGesture: () => void;
}

interface ProjectLightboxProps {
  project: ProjectData | null;
  onClose: () => void;
  onContact: () => void;
}

const isVideoMedia = (url: string, explicitType?: 'image' | 'video') => {
  if (explicitType) return explicitType === 'video';
  return url.startsWith('data:video/') || /\.(mp4|mov|webm|m4v)(\?|$)/i.test(url);
};

export const ProjectLightbox = forwardRef<ProjectLightboxHandle, ProjectLightboxProps>(
  ({ project, onClose, onContact }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const gestureStartedRef = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasError, setHasError] = useState(false);

    const hasAudioTrack = project?.hasAudio !== false;

    const triggerPlayback = (vid: HTMLVideoElement, wantSound: boolean) => {
      setHasError(false);
      setIsBuffering(true);
      vid.setAttribute('playsinline', 'true');
      vid.setAttribute('webkit-playsinline', 'true');
      vid.setAttribute('x5-playsinline', 'true');
      vid.defaultMuted = !wantSound;
      vid.muted = !wantSound;
      vid.volume = 1;
      setIsMuted(!wantSound);

      const p = vid.play();
      if (p !== undefined) {
        p.then(() => {
          setIsPlaying(true);
          setIsBuffering(false);
          setIsMuted(vid.muted);
        }).catch(() => {
          if (wantSound) {
            // Browser blocked unmuted autoplay — try muted inline playback so video still starts
            vid.defaultMuted = true;
            vid.muted = true;
            setIsMuted(true);
            vid
              .play()
              .then(() => {
                setIsPlaying(true);
                setIsBuffering(false);
              })
              .catch(() => {
                setIsPlaying(false);
                setIsBuffering(false);
              });
          } else {
            setIsPlaying(false);
            setIsBuffering(false);
          }
        });
      }
    };

    // Called synchronously inside the user's card tap handler via flushSync
    useImperativeHandle(ref, () => ({
      playFromGesture: () => {
        const vid = videoRef.current;
        if (!vid) return;
        gestureStartedRef.current = true;
        if (vid.paused || (hasAudioTrack && vid.muted)) {
          triggerPlayback(vid, hasAudioTrack);
        }
      },
    }));

    // Lock background scroll cleanly while modal is open & stop video on close
    useEffect(() => {
      if (!project) {
        gestureStartedRef.current = false;
        setIsPlaying(false);
        setIsBuffering(false);
        setHasError(false);
        return;
      }

      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [project, onClose]);

    // Fallback start if opened without synchronous playFromGesture (e.g. keyboard)
    useEffect(() => {
      if (!project || !project.mediaUrl) return;
      const vid = videoRef.current;
      if (!vid) return;

      vid.setAttribute('playsinline', 'true');
      vid.setAttribute('webkit-playsinline', 'true');
      vid.setAttribute('x5-playsinline', 'true');

      if (!gestureStartedRef.current) {
        triggerPlayback(vid, hasAudioTrack);
      }

      return () => {
        vid.pause();
        gestureStartedRef.current = false;
      };
    }, [project?.number, project?.mediaUrl]);

    if (!project) return null;

    const handleTogglePlay = () => {
      const vid = videoRef.current;
      if (!vid) return;
      if (vid.paused) {
        triggerPlayback(vid, hasAudioTrack);
      } else {
        vid.pause();
        setIsPlaying(false);
      }
    };

    const handleToggleMute = () => {
      const vid = videoRef.current;
      if (!vid || !hasAudioTrack) return;
      const nextMuted = !vid.muted;
      vid.muted = nextMuted;
      if (!nextMuted) {
        vid.volume = 1;
        if (vid.paused) {
          vid.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }
      setIsMuted(nextMuted);
    };

    const handleRetry = () => {
      const vid = videoRef.current;
      if (!vid) return;
      setHasError(false);
      vid.load();
      triggerPlayback(vid, hasAudioTrack);
    };

    const isVideo = isVideoMedia(project.mediaUrl, project.mediaType);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/92 backdrop-blur-sm"
        />

        {/* Lightbox Modal (mounted synchronously for instant mobile gesture video+audio unlock) */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label={project.name}
          className="relative w-full max-w-5xl bg-[#0C0C0C] border border-[#38bdf8]/40 rounded-[28px] sm:rounded-[44px] p-4 sm:p-10 shadow-2xl z-10 my-auto text-[#D7E2EA] max-h-[92svh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-[#1F1F1F] text-[#D7E2EA] hover:bg-[#2A2A2A] hover:text-white transition-colors cursor-pointer z-20"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Header info */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 sm:pb-8 border-b border-[#222] pr-12">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                <span className="text-xl sm:text-3xl font-black text-[#D7E2EA]/40">
                  {project.number}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-[11px] sm:text-xs uppercase font-medium tracking-wider text-[#38bdf8]">
                  {project.category}
                </span>
                {project.metric && (
                  <span className="px-3 py-1 rounded-full bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-[#38bdf8] flex items-center gap-1.5">
                    <ShieldCheck size={14} />
                    {project.metric}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
                {project.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/80 mt-2 font-light max-w-2xl leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <LiveProjectButton
                onClick={() => {
                  onClose();
                  onContact();
                }}
                label="Book Similar Reel"
              />
            </div>
          </div>

          {/* Single Reel Stage + Production Details (video first on mobile!) */}
          <div className="mt-5 sm:mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Reel Player Column */}
            <div className="md:col-span-6 md:order-2 flex flex-col items-center gap-3">
              <div className="relative overflow-hidden rounded-[24px] sm:rounded-[34px] border border-[#38bdf8]/40 bg-black w-full max-w-[320px] aspect-[9/16] max-h-[60svh] shadow-[0_0_40px_rgba(56,189,248,0.12)]">
                {project.mediaUrl &&
                  (isVideo ? (
                    <>
                      <video
                        ref={videoRef}
                        key={project.mediaUrl}
                        src={project.mediaUrl}
                        poster={project.posterUrl}
                        controls
                        controlsList="nodownload"
                        playsInline
                        loop
                        preload="auto"
                        onLoadStart={() => setIsBuffering(true)}
                        onWaiting={() => setIsBuffering(true)}
                        onCanPlay={() => setIsBuffering(false)}
                        onPlaying={() => {
                          setIsPlaying(true);
                          setIsBuffering(false);
                          setHasError(false);
                        }}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
                        onError={() => {
                          setIsBuffering(false);
                          setIsPlaying(false);
                          setHasError(true);
                        }}
                        className="w-full h-full object-contain bg-black"
                      />

                      {/* Non-blocking buffering indicator */}
                      {isBuffering && !hasError && (
                        <div className="pointer-events-none absolute inset-x-0 top-0 bottom-14 flex items-center justify-center bg-black/35 z-10">
                          <div className="w-12 h-12 rounded-full bg-black/75 border border-[#38bdf8]/60 flex items-center justify-center text-[#38bdf8]">
                            <Loader2 size={24} className="animate-spin" />
                          </div>
                        </div>
                      )}

                      {/* Mobile Tap-to-Play overlay — leaves bottom 56px native controls 100% accessible */}
                      {!isPlaying && !isBuffering && !hasError && (
                        <button
                          type="button"
                          onClick={handleTogglePlay}
                          aria-label="Play video with sound"
                          className="absolute inset-x-0 top-0 bottom-14 flex flex-col items-center justify-center bg-black/35 cursor-pointer z-10 border-0"
                        >
                          <div className="w-16 h-16 rounded-full bg-[#38bdf8] text-[#0C0C0C] flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.6)]">
                            <Play size={26} className="fill-current ml-1" />
                          </div>
                          <span className="mt-3 text-xs uppercase tracking-widest font-bold text-white bg-black/75 px-3.5 py-1.5 rounded-full border border-white/15">
                            {hasAudioTrack ? 'Tap to Play with Sound' : 'Tap to Play'}
                          </span>
                        </button>
                      )}

                      {/* Network/codec retry fallback */}
                      {hasError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/85 p-5 text-center z-20">
                          <p className="text-xs uppercase tracking-wider text-[#D7E2EA]/80">
                            Video couldn&apos;t load right now
                          </p>
                          <button
                            type="button"
                            onClick={handleRetry}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#38bdf8] text-[#0C0C0C] text-xs font-bold uppercase tracking-wider cursor-pointer border-0"
                          >
                            <RotateCcw size={14} />
                            <span>Retry Playback</span>
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <img
                      src={project.mediaUrl}
                      alt={project.mediaTitle || project.name}
                      className="w-full h-full object-contain bg-black"
                    />
                  ))}
              </div>

              {/* Dedicated Mobile-Friendly Play & Audio Control Bar */}
              {isVideo && (
                <div className="w-full max-w-[320px] flex items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#151c26] hover:bg-[#1d2735] border border-[#38bdf8]/40 text-xs font-semibold uppercase tracking-wider text-white cursor-pointer transition-colors"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-current" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  {hasAudioTrack ? (
                    <button
                      type="button"
                      onClick={handleToggleMute}
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                        isMuted
                          ? 'bg-[#38bdf8] text-[#0C0C0C] border-[#38bdf8] font-bold'
                          : 'bg-[#151c26] hover:bg-[#1d2735] text-[#38bdf8] border-[#38bdf8]/40'
                      }`}
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                      <span>{isMuted ? 'Tap for Sound' : 'Sound On'}</span>
                    </button>
                  ) : (
                    <div className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-[#141418] border border-white/10 text-[11px] uppercase tracking-wider text-[#D7E2EA]/55 select-none">
                      <VolumeX size={13} />
                      <span>Visual Reel</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Story, Direction & Focus Column */}
            <div className="md:col-span-6 md:order-1 space-y-5">
              {project.conceptDetails && (
                <div className="p-5 sm:p-6 bg-[#121820] border border-[#38bdf8]/20 rounded-3xl space-y-4">
                  <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#38bdf8]">
                    <Target size={16} />
                    <span>Story &amp; Production Approach</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/90 font-light leading-relaxed">
                    {project.conceptDetails}
                  </p>

                  {project.creativeDirection && (
                    <p className="text-xs sm:text-sm text-[#D7E2EA]/80 font-light leading-relaxed border-t border-[#38bdf8]/15 pt-4">
                      <strong className="text-white font-medium">Visual Direction: </strong>
                      {project.creativeDirection}
                    </p>
                  )}

                  {project.toolsUsed && project.toolsUsed.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-[#D7E2EA]/60 uppercase tracking-wider mr-1">
                        Focus:
                      </span>
                      {project.toolsUsed.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-[#1a2533] border border-[#38bdf8]/30 text-[11px] font-mono text-[#38bdf8]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 sm:mt-8 pt-5 border-t border-[#222] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#D7E2EA]/60 uppercase tracking-wider">
              <Sparkles size={14} className="text-[#38bdf8]" />
              <span>UGC &amp; Visual Production by SUBHANSHU RAJ</span>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onContact();
              }}
              className="text-xs uppercase tracking-widest font-bold text-white hover:text-[#38bdf8] transition-colors underline underline-offset-4 cursor-pointer bg-transparent border-0"
            >
              Inquire About Availability
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ProjectLightbox.displayName = 'ProjectLightbox';

export default ProjectLightbox;
