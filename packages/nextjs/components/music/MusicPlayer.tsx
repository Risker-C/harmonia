"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowPathIcon,
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { Track, formatDuration } from "~~/data/mockData";

interface MusicPlayerProps {
  track: Track;
  isOwned?: boolean;
  className?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ track, isOwned = false, className = "" }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  // 对于未拥有的音乐，限制试听30秒
  const maxPreviewTime = isOwned ? Infinity : 30;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);

      // 如果是试听模式且超过30秒，自动暂停
      if (!isOwned && audio.currentTime >= maxPreviewTime) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [isOwned, maxPreviewTime]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);

    // 在试听模式下限制进度条
    const seekTime = isOwned ? newTime : Math.min(newTime, maxPreviewTime);

    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleLoop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = !isLooping;
    setIsLooping(!isLooping);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.max(0, Math.min(currentTime + seconds, duration));

    // 在试听模式下限制跳转
    const skipTime = isOwned ? newTime : Math.min(newTime, maxPreviewTime);

    audio.currentTime = skipTime;
    setCurrentTime(skipTime);
  };

  // 计算进度条的最大值
  const progressMax = isOwned ? duration : Math.min(duration, maxPreviewTime);

  return (
    <div className={`relative ${className}`}>
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-60"></div>

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6">
        <audio
          ref={audioRef}
          src={isOwned ? track.audioUrl : track.previewUrl}
          onLoadedData={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration);
            }
          }}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Track Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={track.coverImage} alt={track.title} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{track.title}</h3>
            <p className="text-sm text-white/70 truncate">{track.artist.name}</p>
            {!isOwned && <p className="text-xs text-yellow-300 mt-1">试听版本 (30秒预览)</p>}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type="range"
                min={0}
                max={progressMax || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${
                    (currentTime / (progressMax || 1)) * 100
                  }%, rgba(255,255,255,0.2) ${(currentTime / (progressMax || 1)) * 100}%, rgba(255,255,255,0.2) 100%)`,
                }}
              />
              {/* 试听限制指示器 */}
              {!isOwned && duration > 0 && (
                <div
                  className="absolute top-0 h-2 w-1 bg-yellow-300 rounded-full"
                  style={{ left: `${(maxPreviewTime / duration) * 100}%` }}
                />
              )}
            </div>
            <div className="flex justify-between text-sm text-white/60">
              <span>{formatDuration(Math.floor(currentTime))}</span>
              <span>{formatDuration(Math.floor(duration))}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => skip(-10)}
              className="p-2 hover:bg-white/20 text-white/60 hover:text-white rounded-full transition-colors duration-200"
              title="后退10秒"
            >
              <BackwardIcon className="h-5 w-5" />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
            >
              {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6 ml-0.5" />}
            </button>

            <button
              onClick={() => skip(10)}
              className="p-2 hover:bg-white/20 text-white/60 hover:text-white rounded-full transition-colors duration-200"
              title="前进10秒"
            >
              <ForwardIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={toggleLoop}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isLooping ? "bg-yellow-300/20 text-yellow-300" : "hover:bg-white/20 text-white/60"
              }`}
              title="循环播放"
            >
              <ArrowPathIcon className="h-4 w-4" />
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="p-2 hover:bg-white/20 text-white/60 hover:text-white rounded-full transition-colors duration-200"
              >
                {isMuted ? <SpeakerXMarkIcon className="h-4 w-4" /> : <SpeakerWaveIcon className="h-4 w-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${
                    (isMuted ? 0 : volume) * 100
                  }%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fbbf24;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fbbf24;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};
