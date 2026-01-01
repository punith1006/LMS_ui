import { AxiosError } from "axios";

 const errorHelper=(error:any):string=>{
return error?.response?.data["error"]??error?.response?.data["message"]
}

export default errorHelper;