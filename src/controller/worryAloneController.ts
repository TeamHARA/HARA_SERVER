import { Request, Response } from "express";


const uploadWorryAlone = async (req:Request, res:Response) => {

    const {title, content, categoryId, option} = req.body;

    if(!title){
        return res.status(400).json({ status: 400, message: "유저 업데이트 실패" });
    }

    
}

const worryAloneController = {
    uploadWorryAlone,

}

export default worryAloneController;
