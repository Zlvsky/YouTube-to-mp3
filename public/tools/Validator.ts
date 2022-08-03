export const convertLinkToId = (youtubeLink: string) => {
    var firstReg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
    var secondReg = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    if (youtubeLink.match(firstReg) || youtubeLink.match(secondReg)) {
        const preID = youtubeLink.match(firstReg).toString();
        const finalID = preID.match(secondReg)[7];
        return {
            status: "success",
            videoId: finalID
        }
    } else {
        return {
            status: "fail"
        }
    }  
};

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