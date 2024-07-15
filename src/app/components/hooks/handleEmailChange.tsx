export const handleEmailChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setEmail: React.Dispatch<React.SetStateAction<string>>
) => {
  const novoEmail = event.target.value;

  setEmail(novoEmail);
};
