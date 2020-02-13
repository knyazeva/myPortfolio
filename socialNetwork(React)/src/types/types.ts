export type profileType = {
    id: number,
    login: string,
    password: string,
    followed: boolean,
    photo: string,
    fullName: string,
    status: string,
    dateOfBirth: string,
    education: string,
    description: string,
    location: locationType,
    posts: Array<postType>
}

export type locationType = {
    country: string,
    city: string
}

export type postType = {
    id: number,
    textPost: string,
    likes: number,
    myLikes: boolean
}

export type dataPopUpType = {
    isActive: boolean,
    title: string,
    body: string,
    isSuccessSend: boolean
}

export type communitiesType = {
    id: number,
    followed: boolean,
    photo: string,
    fullName: string,
    description: string,
    imgNews: Array<imgNewsType>,
    date: string,
    likes: number,
    myLikes: boolean
}

export type newsType = {
    id: number,
    idProfile: number,
    title: string,
    img: string,
    text: string
}

export type imgNewsType = {
    id: number,
    src: string
}
