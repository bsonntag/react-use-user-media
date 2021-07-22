export interface UserMediaState {
  error: MediaError | null;
  state: string;
  stream: MediaStream | null;
}
/**
 * React hook for accessing user media.
 * This hook ensures that getUserMedia is only called one time.
 *
 * @remarks Please make sure you wrap your constraint object inside a useEffect or
 * useMemo hook to prevent infinite render loops.
 */
export declare const useUserMedia: (
  constraints: MediaStreamConstraints
) => UserMediaState;
export default useUserMedia;
