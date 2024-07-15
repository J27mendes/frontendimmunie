import Image from "next/image";

const Header = () => {
  return (
    <div className="flex justify-center items-center mt-6">
      <Image
        src="../../../../logoPasseVerde.svg"
        alt="Passe Verde Logo"
        className="dark:invert"
        height={100}
        width={250}
        priority
      />
    </div>
  );
};

export default Header;
