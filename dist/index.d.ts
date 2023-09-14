export interface UserMediaState {
  error: MediaError | null;
  state: string;
  stream: MediaStream | undefined;
}

declare function useUserMedia(constraints: MediaStreamConstraints): UserMediaState;

export default useUserMedia;
