import Image from "next/image";

const Header = () => {
  return (
    <div className="flex justify-center items-center mt-6 bg-slate-100">
      <Image
        src="../../../../logoPasseVerde.svg"
        alt="Passe Verde Logo"
        height={100}
        width={250}
        priority
        style={{ filter: "none" }}
      />
    </div>
  );
};

export default Header;
