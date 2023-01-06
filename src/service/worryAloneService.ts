import { CreateAloneWorryDTO } from '../interfaces/worryAlone/CreateAloneWorryDTO';
import { worryAloneRepository} from "../repository"
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from '../constants/statusCode';

const createAloneWorry = async (createAloneWorryDTO:CreateAloneWorryDTO) => {
  const worryAlone = await worryAloneRepository.createAloneWorry(createAloneWorryDTO);
  if(!worryAlone){
    throw new ClientException('');

  }
  return worryAlone;
}



const worryAloneService = {
    createAloneWorry,
  
  };
  
  export default worryAloneService;
  