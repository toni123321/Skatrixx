const profile = {
    "id" : 1,
    "name" : "Pedro Dimitrov",
    "levelProg" : {
        "level" : 12,
        "progressToNexLvl" : 33 
    },
    "rankings" : {
        "frRank" : 2,
        "conRank" : 46,
        "wrRank" : 4023
    },
    "achievements" : [
        "../images/badges/Badge2.png",
        "../images/badges/Badge3.png",
        "../images/badges/Badge4.png",
        "../images/badges/Badge5.png"
    ],
    "friends": [
        {
            "name" : "Ivan Ivanov",
            "level" : 32,
            "progressToNexLvl" : 28,
            "frRank" : 3,
            "nlRank" : 201,
            "wrRank" : 11004,
            "image" : "./images/profile-picture.png"
        },
        {
            "name" : "George Petrov",
            "level" : 32,
            "progressToNexLvl" : 28,
            "frRank" : 3,
            "nlRank" : 201,
            "wrRank" : 11004,
            "image" : "./images/profile-picture.png"
        },
        {
            "name" : "Phil Jones",
            "level" : 32,
            "progressToNexLvl" : 28,
            "frRank" : 3,
            "nlRank" : 201,
            "wrRank" : 11004,
            "image" : "./images/profile-picture.png"
        },
        {
            "name" : "Mark Wilson",
            "level" : 32,
            "progressToNexLvl" : 28,
            "frRank" : 3,
            "nlRank" : 201,
            "wrRank" : 11004,
            "image" : "./images/profile-picture.png"
        },
        {
            "name" : "Bobby White",
            "level" : 32,
            "progressToNexLvl" : 28,
            "frRank" : 3,
            "nlRank" : 201,
            "wrRank" : 11004,
            "image" : "./images/profile-picture.png"
        },
        {
            "name" : "Victor Borisov",
            "level" : 32,
            "progressToNexLvl" : 28,
            "frRank" : 3,
            "nlRank" : 201,
            "wrRank" : 11004,
            "image" : "./images/profile-picture.png"
        },
        {
            "name" : "Elena Atanasova",
            "level" : 32,
            "progressToNexLvl" : 28,
            "frRank" : 3,
            "nlRank" : 201,
            "wrRank" : 11004,
            "image" : "./images/profile-picture.png"
        },
        {
            "name" : "Henry Walkmart",
            "level" : 32,
            "progressToNexLvl" : 28,
            "frRank" : 3,
            "nlRank" : 201,
            "wrRank" : 11004,
            "image" : "./images/profile-picture.png"
        },
        {
            "name" : "Ioan Efremov",
            "level" : 32,
            "progressToNexLvl" : 28,
            "frRank" : 3,
            "nlRank" : 201,
            "wrRank" : 11004,
            "image" : "./images/profile-picture.png"
        },
        {
            "name" : "Angel Hristov",
            "level" : 32,
            "progressToNexLvl" : 28,
            "frRank" : 3,
            "nlRank" : 201,
            "wrRank" : 11004,
            "image" : "./images/profile-picture.png"
        }
    ],
    "image" : "./images/profile-picture.png"
}

export const getProfileName = () => {
    return profile.name;
}
export const getProfileImage = () => {
    return profile.image;
}

export const getProfileLevel = () => {
    return profile.levelProg;
}

export const getProfileRanking = () => {
    return profile.rankings;
}

export const getProfileAchievements = () => {
    return profile.achievements;
} 

export const getFriends = () => {
    return profile.friends;
}