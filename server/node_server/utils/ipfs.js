import { Web3Storage, File } from 'web3.storage';
import axios from "axios";

const IPFS = new Web3Storage({token: process.env.WEB3_STORAGE_API_KEY});
const gateway = "ipfs.dweb.link";


/*
@params
file: File object
filename: string
*/

export const uploadSingleFileToIPFS = async (file, filename) => {
    try{
        const encodedFile = [new File([file.data], filename)];

        const cid = await IPFS.put(encodedFile);

        // return IPFS url to retrieve file
        const fileUrl = `https://${cid}.${gateway}/${filename}`

        return fileUrl;
    }catch (error){
        throw new Error(error);
    }
};

export const uploadMultipleFilesToIPFS = async (files) => {
    try{
        const encodeFiles = files.map(file => new File([file.data], file.name));

        const cid = await IPFS.put(encodeFiles);

        // return IPFS url to retrieve file
        const fileUrls = files.map(file => ({type: file.type, url: `https://${cid}.${gateway}/${file.name}`}));

        return fileUrls;
    }catch (error){
        throw new Error(error);
    }
};