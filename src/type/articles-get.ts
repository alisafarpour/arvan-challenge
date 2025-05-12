export type All_ARTICLE = {
    articles:      ARTICLE[];
    articlesCount: number;
}

export type ARTICLE = {
    slug:           string;
    title:          string;
    description:    string;
    body:           string;
    tagList:        string[];
    createdAt:      Date;
    updatedAt:      Date;
    favorited:      boolean;
    favoritesCount: number;
    author:         string;
}
