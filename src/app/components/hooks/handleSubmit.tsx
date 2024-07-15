import axios from "axios";
import { format, addYears } from "date-fns";
import dotenv from "dotenv";
dotenv.config();

export const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  nome: string,
  email: string,
  photo: File | null,
  setNome: React.Dispatch<React.SetStateAction<string>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPhoto: React.Dispatch<React.SetStateAction<File | null>>,
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>,
  setServerResponse: React.Dispatch<React.SetStateAction<string>>,
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setValidUntil: React.Dispatch<React.SetStateAction<string>>
) => {
  event.preventDefault();

  try {
    const herokuFront = "https://immuniebackend-55e5196ab5db.herokuapp.com";
    //const localhost = "http://localhost:8000";
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    if (photo) {
      formData.append("photo", photo);
    }

    const response = await axios.post(`${herokuFront}/carteirinha`, formData);

    if (response.status === 200) {
      setShowMessage(true);
      setServerResponse("Dados inseridos com sucesso");
      setTimeout(() => {
        setShowMessage(false);
      }, 6000);

      const dataAtual = new Date();
      const dataAposUmAno = addYears(dataAtual, 1);
      const dataFormatada = format(dataAposUmAno, "dd/MM/yyyy");

      setValidUntil(dataFormatada);
    } else {
      console.error("Erro ao enviar formulário - Resposta vazia");
      setServerResponse("Erro ao enviar formulário - Resposta vazia");
    }
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
    setServerResponse("Erro ao enviar formulário - " + error);
  }
};
