export const handlePhotoChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setPhoto: React.Dispatch<React.SetStateAction<File | null>>,
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const file = event.target.files?.[0];

  if (file) {
    setPhoto(file);

    const imageUrl = URL.createObjectURL(file);

    setPreviewImage(imageUrl);
  } else {
    setPhoto(null);
    setPreviewImage(null);
  }
};
