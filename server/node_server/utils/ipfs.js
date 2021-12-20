import { Web3Storage } from 'web3.storage';
import axios from "axios";

const IPFS = new Web3Storage({token: process.env.WEB3_STORAGE_API_KEY});

export const uploadToIPFS = async (file) => {
    try{
        // IPFS accepts array of File object. So it is possible to upload multiple files with one request.
        const cid = await IPFS.put(file);
        console.log('stored files with cid:', cid)
        return cid;
    }catch (error){
        throw new Error(error);
    }
}

export const getFilesFromIPFS = async (cid="bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu", filename="dr-is-tired.jpg") => {
   try{
       const gateway = "ipfs.dweb.link";
       const {data} = await axios({
           method: "GET",
           url: `${cid}.${gateway}/${filename}`
       });

       console.log({data});
   }catch (error){
       throw new Error(error);
   }
};