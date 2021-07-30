import { Duration, Author } from 'yt-search';
import {FFmpeg, opus} from 'prism-media';
import {
    AudioPlayer,
    VoiceConnection
} from '@discordjs/voice';

type StatusTypes = "ONLINE" | "IDLE" | "INVISIBLE" | "DND";
type ActivityTypes = "PLAYING" | "WATCHING" | "LISTENING" | "CUSTOM" | "STREAMING" | "COMPETING";
type MusicFinishReasons = "ENDED" | "ERROR" | "STOPPED" | "DESTROYED";

interface TemplateStatus {
    name: string,
    type: ActivityTypes,
    url: string,
    Lifetime: 10 | number
    status: StatusTypes
}

interface Track {
    title : string;
    description: string;
    duration: Duration;
    Id: string;
    url: string;
    author: Author;
    createdTimestamp: string;
    thumbnail: string;
    stream: opus.Encoder | FFmpeg | null;
    streamFinished: false | boolean;
    getStream: function (): opus.Encoder | FFmpeg | null;
}

interface MusicEvents {
    start: [Track: Track, AudioPlayer: AudioPlayer, VoiceConnection: VoiceConnection],
    finish: [Track: Track, Reason: MusicFinishReasons, AudioPlayer: AudioPlayer, VoiceConnection: VoiceConnection],
    error: [Error: Error, Track: Track, AudioPlayer: AudioPlayer, VoiceConnection: VoiceConnection]
}

interface MySQLDatabaseOptions {
    host: string;
    user: string;
    password: string | null;
    database: string;
    /**
     * Cleanup unlisted variables in the Database
     */
    doCleanup: false | boolean;
}
export function musicOnCallback<K extends keyof MusicEvents>(Event: K, listener: (...args: MusicEvents[K]) => void): void;