export const checkIfVideoIdValid = (videoId: string) => {
    if(
        videoId === undefined ||
        videoId === "" ||
        videoId === null ||
        videoId.length < 7
    ) {
        return false;
    }
    return true;
}