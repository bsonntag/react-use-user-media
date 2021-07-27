export interface UserMediaState {
  error: MediaError | null;
  state: string;
  stream: MediaStream | undefined;
}
/**
 * React hook for accessing user media.
 *
 * @remarks Please make sure you wrap your constraint object inside a useEffect or
 * useMemo hook to prevent infinite render loops.
 */
export declare const useUserMedia: (
  constraints: MediaStreamConstraints
) => UserMediaState;
export default useUserMedia;
