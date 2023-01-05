import { UploadWorryAloneDTO } from './../interfaces/worryAlone/UploadWorryAloneDTO';
import { Request, Response } from "express";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import worryAloneService from '../service/worryAloneService';


const uploadWorryAlone = async (req:Request, res:Response) => {

    const uploadWorryAloneDTO : UploadWorryAloneDTO = req.body;
    //console.log(uploadWorryAloneDTO);


    const data = await worryAloneService.uploadWorryAlone(uploadWorryAloneDTO);

    if(!data){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.UPLOAD_WORRY_ALONE_ERROR))
    }

    res.status(sc.OK).send(success(sc.OK, rm.UPLOAD_WORRY_ALONE_SUCCESS));


    
}

const worryAloneController = {
    uploadWorryAlone,

}

export default worryAloneController;
