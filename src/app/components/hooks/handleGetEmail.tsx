import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const handleGetEmail = async (email: string) => {
  try {
    //const herokuFront = "https://backendimmunie-97b7adec259a.herokuapp.com";
    const response = await axios.get<{ exists: boolean; userEmail: string }>(
      `${process.env.API_BACKEND}/carteirinha/${email}`
    );
    console.log(response.status);
    return {
      exists: response.data.exists,
      serverResponse:
        response.status === 200 ? "Email encontrado." : "Resposta vazia",
    };
  } catch (error) {
    console.error("Erro ao buscar email:", error);
    throw new Error(`Erro ao buscar email - ${error}`);
  }
};
