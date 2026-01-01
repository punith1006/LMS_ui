
import { axiosPublic } from "./axiosPublic";

const refreshTokenFn = async () => {
   

  try {
    const localStorageSession:string| null=localStorage.getItem("session");
    let localSession ;
   if(localStorageSession!=null){
    localSession= JSON.parse(localStorageSession);
   }

    const response:any = await axiosPublic.post("/user/refresh", {
      refreshToken:localSession?.refreshToken,
    });

    const { session } = response.data;

    if (!session?.accessToken) {
      localStorage.removeItem("session");
      localStorage.removeItem("user");
    }

    localStorage.setItem("session", JSON.stringify(session));

    return session;
  } catch (error) {
    localStorage.removeItem("session");
    localStorage.removeItem("user");
  }
};



export default refreshTokenFn ;