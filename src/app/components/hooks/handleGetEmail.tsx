import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const handleGetEmail = async (email: string) => {
  try {
    const herokuFront = "https://immuniebackend-55e5196ab5db.herokuapp.com";
    //const localhost = "http://localhost:8000";
    const response = await axios.get<{ exists: boolean; userEmail: string }>(
      `${herokuFront}/carteirinha/${email}`
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
