import { CreateAloneWorryDTO } from '../interfaces/worryAlone/CreateAloneWorryDTO';
import { worryAloneRepository} from "../repository"
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from '../constants/statusCode';

const createAloneWorry = async (createAloneWorryDTO:CreateAloneWorryDTO) => {
  const aloneWorry = await worryAloneRepository.createAloneWorry(createAloneWorryDTO);
  if(!aloneWorry){
    throw new ClientException("혼자고민글 생성 실패");
  }
  return aloneWorry;
}



const worryAloneService = {
    createAloneWorry,
  
  };
  
  export default worryAloneService;
  