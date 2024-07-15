export const handleNomeChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setNome: React.Dispatch<React.SetStateAction<string>>
) => {
  const novoNome = event.target.value;

  setNome(novoNome);
};
