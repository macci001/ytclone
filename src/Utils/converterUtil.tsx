export const getViews = (viewCnt: number) => {
    if (viewCnt >= 1000000000) {
        return String(Math.floor(viewCnt / 1000000000)) + "B";
    }
    else if (viewCnt >= 1000000) {
        return String(Math.floor(viewCnt / 1000000)) + "M";
    }
    else if (viewCnt >= 1000) {
        return String(Math.floor(viewCnt / 1000)) + "K";
    }
    return String(viewCnt);
}
export const getTimeUploaded = (dateUploaded: string) => {
    const date: number = new Date(dateUploaded).getTime();
    const currentDate: number = new Date().getTime();
    const diffInMilliSeconds = currentDate - date;

    if (diffInMilliSeconds >=  (2 * 525600 * 60 * 1000)) {
        return String(Math.floor(diffInMilliSeconds / (525600 * 60 * 1000))) + " years ";
    }
    else if (diffInMilliSeconds >= (525600 * 60 * 1000)) {
        return String(Math.floor(diffInMilliSeconds / (525600 * 60 * 1000))) + " year "
    }
    else if (diffInMilliSeconds >= (2 * 43800 * 60 * 1000)) {
        return String(Math.floor(diffInMilliSeconds / (43800 * 60 * 1000))) + " months ";
    }
    else if (diffInMilliSeconds >= (43800 * 60 * 1000)) {
        return String(Math.floor(diffInMilliSeconds / (43800 * 60 * 1000))) + " month ";
    }
    else if (diffInMilliSeconds >= (2 * 1440 * 60 * 1000)) {
        return String(Math.floor(diffInMilliSeconds / (1440 * 60 * 1000))) + " days ";
    }
    else if (diffInMilliSeconds >= (1440 * 60 * 1000)) {
        return String(Math.floor(diffInMilliSeconds / (1440 * 60 * 1000))) + " day ";
    }
    else if (diffInMilliSeconds >= (2 * 60 * 60 * 1000)) {
        return String(Math.floor(diffInMilliSeconds / (60 * 60 * 1000))) + " hours ";
    }
    else if (diffInMilliSeconds >= (60 * 60 * 1000)) {
        return String(Math.floor(diffInMilliSeconds / (60 * 60 * 1000))) + " hour ";
    }
    else if (diffInMilliSeconds >= (2 * 60 * 1000)) {
        return String(Math.floor(diffInMilliSeconds / (60 * 1000))) + " minutes ";
    }
    else if (diffInMilliSeconds >= (60 * 1000)) {
        return String(Math.floor(diffInMilliSeconds / (60 * 1000))) + " minute ";
    }

    return String(Math.floor(diffInMilliSeconds / (1000))) + " seconds ";
}