const Button = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="border-2 border-black inline-block rounded-md">
        <button className="flex justify-center items-center bg-green-600 border-2 border-white text-white font-bold py-2 px-4 rounded-md hover:bg-green-500 hover:border-green-300 hover:text-black">
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default Button;
