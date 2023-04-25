import axios from "axios";


const axiosInstance = async () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
  });
 
  return instance;
};
const parseResponse = (response) => {
    try {
      const data = JSON.parse(response);
     if (data.status === false) {
        return {
          remote: "failure",
          data: {
            errors: data.statusMessage,
          },
        };
      }
      return {
        remote: "success",
        data: data,
      };
    } catch (error) {
      return {
        remote: "failure",
        error: {
          errors: response,
        },
      };
    }
  };
  
  export const apiRoot = async (reqParams) => {
    try {
      const instance = await axiosInstance();
      reqParams.headers = {
        "Content-Type": reqParams.contentType
          ? reqParams.contentType
          : "application/json",
          mode: "no-cors",
      };
      if (reqParams?.token) {
        reqParams.headers.Authorization = `Bearer ${reqParams?.token}`;
      }
      const response = await instance.request({
        ...reqParams,
        transformResponse: (res) => {
          const resp =  parseResponse(res); 
          return resp.remote === "success" ? resp.data : resp;
        },
      });
     
     
      if (response.data.status === false ||  response.data.statusCode === 401) {
        // localStorage.removeItem("token");
        return response.data
      }
      
      return {
        remote: "success",
        data: response.data,
      };
    } catch (error) {
      if (error) {
        if (error?.response) {
          const axiosError = error;
          if (axiosError?.response?.data) {
            let errorMessage = axiosError?.response?.data?.data?.errors;
            if (axiosError?.response?.status === 500) {
              errorMessage = "";
              if(axiosError?.response?.data?.data.errors === 'jwt expired')
              {
                errorMessage = 'Session Expired'
                window.location.reload()
              }else{
                errorMessage = axiosError?.response?.data?.data.errors;
              }
            } else if (axiosError?.response?.status === 401) {
              errorMessage = axiosError?.response?.data?.data.errors;
            } else if (axiosError?.response?.status === 400) {
              errorMessage = axiosError?.response?.data?.statusMessage;
            }
            
            else {
              errorMessage =
                error?.response?.data?.error?.errors ||
                axiosError?.response?.data?.data?.errors || axiosError.message;
            }
            return {
              remote: "failure",
              errors: {
                status: axiosError?.response?.status,
                errors: errorMessage,
              },
            };
          } else {
            const axiosError = error;
            let errorMessage = axiosError.message;
          //   if (errorMessage === "Network Error") {
          //     errorMessage = "No internet connection";
          //   }
            return {
              remote: "failure",
              errors: {
                errors: errorMessage,
              },
            };
          }
        }
      } else {
        const axiosError = error;
        let errorMessage = axiosError.message;
        if (errorMessage === "Network Error") {
          errorMessage = "No internet connection";
        }
        return {
          remote: "failure",
          errors: {
            errors: errorMessage,
          },
        };
      }
      throw error;
    }
  };
  