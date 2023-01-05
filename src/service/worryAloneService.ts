import { UploadWorryAloneDTO } from './../interfaces/worryAlone/UploadWorryAloneDTO';
import { worryAloneRepository} from "../repository"
import { ClientException } from "../common/error/exceptions/customExceptions";

const uploadWorryAlone = async (uploadWorryAloneDTO:UploadWorryAloneDTO) => {
  const worryAlone = await worryAloneRepository.uploadWorryAlone(uploadWorryAloneDTO);
  if(!worryAlone){
    throw new ClientException();

  }
  console.log("worryAloneService");
  console.log(worryAlone);

  return worryAlone;
}



const worryAloneService = {
    uploadWorryAlone,
  
  };
  
  export default worryAloneService;
  