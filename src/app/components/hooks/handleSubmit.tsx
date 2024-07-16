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
    const herokuFront = "https://backendimmunie-97b7adec259a.herokuapp.com";
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
      setServerResponse("Erro ao enviar formulário");
      setTimeout(() => {
        setServerResponse("");
      }, 10000);
    }
  } catch (error) {
    setServerResponse("Erro ao enviar formulário");
    setTimeout(() => {
      setServerResponse("");
    }, 10000);
  }
};
