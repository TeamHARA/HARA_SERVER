import { CreateAloneWorryDTO } from '../interfaces/worryAlone/CreateAloneWorryDTO';
import { worryAloneRepository} from "../repository"
import { ClientException } from "../common/error/exceptions/customExceptions";

const createAloneWorry = async (createAloneWorryDTO:CreateAloneWorryDTO) => {
  const aloneWorry = await worryAloneRepository.createAloneWorry(createAloneWorryDTO);
  if(!aloneWorry){
    throw new ClientException();

  }
 // console.log("worryAloneService");
 // console.log(worryAlone);

  return aloneWorry;
}



const worryAloneService = {
    createAloneWorry,
  
  };
  
  export default worryAloneService;
  