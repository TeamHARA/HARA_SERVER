import { CreateAloneWorryDTO } from '../interfaces/worryAlone/CreateAloneWorryDTO';
import { Request, Response } from "express";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import worryAloneService from '../service/worryAloneService';
import { validationResult } from 'express-validator';


const createAloneWorry = async (req:Request, res:Response) => {

    const createAloneWorryDTO : CreateAloneWorryDTO = req.body;
    //console.log(uploadWorryAloneDTO);

    //? validation의 결과를 바탕으로 분기 처리
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST))
    }
  
    if(!createAloneWorryDTO.categoryId || !createAloneWorryDTO.content || !createAloneWorryDTO.options || !createAloneWorryDTO.title || !createAloneWorryDTO.userId){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

    }

    const data = await worryAloneService.createAloneWorry(createAloneWorryDTO);

    if(!data){
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.UPLOAD_WORRY_ALONE_ERROR))
    }

    res.status(sc.OK).send(success(sc.OK, rm.UPLOAD_WORRY_ALONE_SUCCESS));


    
}

const worryAloneController = {
    createAloneWorry,

}

export default worryAloneController;
