export type CommentType = {
    id: string,
    snippet: {
        topLevelComment: {
            snippet: {
                authorProfileImageUrl: string,
                authorDisplayName: string,
                authorChannelUrl: string,
                likeCount: number,
                publishedAt: string,
                textOriginal: string
            }
        }
    }
}

export type VideoType = {
    id: string,
    snippet: {
        title: string,
        channelTitle: string,
        description: string,
        publishedAt: string,
        thumbnails: {
            standard: {
                url: string
            }
        }
    },
    statistics: {
        viewCount: number,
        likeCount: number,
    }
}

export type SearchedVideoType = {
    id: {
        videoId: string
    },
    snippet: {
        thumbnails: {
            high: {
                url: string
            }
        },
        title: string,
        channelTitle: string,
        publishedAt: string,
        description: string
    }
}