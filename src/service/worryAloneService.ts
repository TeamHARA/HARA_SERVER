import { CreateAloneWorryDTO } from '../interfaces/worryAlone/CreateAloneWorryDTO';
import { worryAloneRepository} from "../repository"
import { ClientException } from "../common/error/exceptions/customExceptions";

const createAloneWorry = async (createAloneWorryDTO:CreateAloneWorryDTO) => {
  const worryAlone = await worryAloneRepository.createAloneWorry(createAloneWorryDTO);
  if(!worryAlone){
    throw new ClientException();

  }
  console.log("worryAloneService");
  console.log(worryAlone);

  return worryAlone;
}



const worryAloneService = {
    createAloneWorry,
  
  };
  
  export default worryAloneService;
  