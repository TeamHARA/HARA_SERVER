import { CreateAloneWorryDTO } from '../interfaces/worryAlone/CreateAloneWorryDTO';
import { worryAlone } from "@prisma/client";

import prisma from "./prismaClient";


/* 혼자고민생성 */
const createAloneWorry = async (createAloneWorryDTO: CreateAloneWorryDTO) => {

  const worryData = await prisma.worryAlone.create({
      data: {
        title: createAloneWorryDTO.title,
        content: createAloneWorryDTO.content,
        finalOption: null,
        categoryId: createAloneWorryDTO.categoryId,
        userId: createAloneWorryDTO.userId,
      }
  });

  const options = createAloneWorryDTO.options;

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



export default { createAloneWorry, };