import { UploadWorryAloneDTO } from './../interfaces/worryAlone/UploadWorryAloneDTO';
import { worryAlone } from "@prisma/client";

import prisma from "./prismaClient";


/* 혼자고민생성 */
const uploadWorryAlone = async (uploadWorryAloneDTO: UploadWorryAloneDTO) => {

  const worryData = await prisma.worryAlone.create({
      data: {
        title: uploadWorryAloneDTO.title,
        content: uploadWorryAloneDTO.content,
        finalOption: null,
        categoryId: uploadWorryAloneDTO.categoryId,
        userId: uploadWorryAloneDTO.userId,
      }
  });

  const options = uploadWorryAloneDTO.options;

  for(var i=0;i<options.length;i++){
    const optionData= await prisma.aloneOption.create({
      
      data:{
          worryAloneId: worryData.id,
          title: options[i].title,
          advantage: options[i].advantage,
          disadvantage: options[i].disadvantage,
          image: options[i].image,
  
        }
    });

  }//for 


  return worryData;


};



export default { uploadWorryAlone, };