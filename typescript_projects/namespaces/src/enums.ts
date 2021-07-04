import { get } from "http";

export enum siteEnum {
    at = 'at',
    alingsastidning = 'at',
    bohuslaningen = 'bhn',
    bhn = 'bhn',
    gp = 'gp',
    hallandsposten = 'hp',
    hp = 'hp',
    hn = 'hn',
    stromstadstidning = 'stnb',
    stnb = 'stnb',
    ttela = 'ttela',
}

const site = 'stnb1'


const getFileNameFromKey = (objectKey: string): string => {
    if(!objectKey) throw new Error(`${getFileNameFromKey.name}: can not get key from empty string`)
    const keyParts: string[] = objectKey.split('/')
    console.log(keyParts)
	return keyParts[keyParts.length - 1].split('.')[0]
}

if (!!siteEnum[site.toLowerCase()]) {
    console.log('found ', site)
} else {
    console.log(siteEnum[site.toLowerCase()])
}

console.log(getFileNameFromKey('fardin'))