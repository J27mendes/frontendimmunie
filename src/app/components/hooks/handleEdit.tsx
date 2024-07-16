import axios from "axios";
import { format, addYears } from "date-fns";
import dotenv from "dotenv";
dotenv.config();

export const handleEdit = async (
  emailAtual: string,
  novoNome: string,
  novoEmail: string,
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
  try {
    const herokuFront = "https://backendimmunie-97b7adec259a.herokuapp.com";
    const formData = new FormData();
    formData.append("nome", novoNome);
    formData.append("email", novoEmail);
    if (photo) {
      formData.append("photo", photo);
    }

    const response = await axios.put(`${herokuFront}/carteirinha`, formData);

    if (response.status === 200) {
      setShowMessage(true);
      setServerResponse("Dados atualizados com sucesso");
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      const dataAtual = new Date();
      const dataAposUmAno = addYears(dataAtual, 1);
      const dataFormatada = format(dataAposUmAno, "dd/MM/yyyy");

      setValidUntil(dataFormatada);
      if (novoEmail !== emailAtual) {
        setEmail(novoEmail);
      }

      if (photo) {
        setPhoto(photo);
        const imageUrl = URL.createObjectURL(photo);
        setPreviewImage(imageUrl);
      }
    } else {
      setServerResponse("Erro ao atualizar dados");
      setTimeout(() => {
        setServerResponse("");
      }, 10000);
    }
  } catch (error) {
    setServerResponse("Erro ao enviar formulário - ");
    setTimeout(() => {
      setServerResponse("");
    }, 10000);
  }
};
