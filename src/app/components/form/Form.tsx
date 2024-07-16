"use client";

import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import Image from "next/image";
import defaultImage from "../../../../public/iconPasseVerde.svg";
import { handleNomeChange } from "../hooks/handleNomeChange";
import { handlePhotoChange } from "../hooks/handlePhotoChange";
import { handleSubmit } from "../hooks/handleSubmit";
import { handleEdit } from "../hooks/handleEdit";
import { handleGetEmail } from "../hooks/handleGetEmail";
import Button from "../button/Button";

const Form = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [serverResponse, setServerResponse] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showEmailField, setShowEmailField] = useState(true);
  const [validUntil, setValidUntil] = useState(
    format(new Date(), "dd/MM/yyyy")
  );
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formSubmitted) {
      setShowMessage(true);
    }
  }, [formSubmitted]);

  const handleChangeNome = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleNomeChange(event, setNome);
    setShowEmailField(true);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setServerResponse(""); // Limpa a mensagem de erro ou sucesso ao alterar o email
  };

  const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePhotoChange(event, setPhoto, setPreviewImage);
    setShowEmailField(true);
  };

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const checkEmailExists = async () => {
    try {
      const { exists, serverResponse } = await handleGetEmail(email);

      if (exists) {
        setServerResponse(serverResponse);
        return true;
      } else {
        setServerResponse(serverResponse);
        return false;
      }
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      setServerResponse(`Erro ao verificar email - ${error}`);
      throw new Error(`Erro ao verificar email - ${error}`);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const emailExists = await checkEmailExists();

      if (emailExists) {
        await handleEdit(
          email, // emailAtual: email atual do recurso que deseja editar
          nome, // novoNome: novo nome, se houver alteração
          email, // emailAtual: email atual (mesmo que o novo)
          email, // novoEmail: novo email, se houver alteração
          photo, // photo: nova foto, se houver alteração
          setNome,
          setEmail,
          setPhoto,
          setPreviewImage,
          setServerResponse,
          setShowMessage,
          setValidUntil
        );
        setShowEmailField(false);
        setEmail("");
      } else {
        await handleSubmit(
          event,
          nome,
          email,
          photo,
          setNome,
          setEmail,
          setPhoto,
          setPreviewImage,
          setServerResponse,
          setShowMessage,
          setValidUntil
        );

        setShowEmailField(false);
        setEmail("");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setServerResponse(`Erro ao enviar formulário - ${error}`);
      setErrorMessage(`Erro ao enviar formulário - ${error}`);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 bg-slate-100">
      <div className="max-w-md w-full p-6 rounded-md">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="mb-10">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <div
              className="mt-1 flex items-center justify-center"
              onClick={handleImageClick}
            >
              <div className="relative border-8 border-green-400 rounded-xl">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Icone Passe Verde"
                    width={200}
                    height={200}
                    className="h-32 w-32 object-cover rounded-full cursor-pointer"
                  />
                ) : (
                  <Image
                    src={defaultImage}
                    alt="sua imagem"
                    width={200}
                    height={200}
                    className="h-32 w-32 object-cover rounded-full cursor-pointer"
                  />
                )}
                {!previewImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-75 rounded-full">
                    <span className="text-gray-700">Foto padrão</span>
                  </div>
                )}
              </div>
            </div>
            <input
              ref={inputRef}
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              required
              onChange={handleChangePhoto}
              className="hidden"
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="nome"
              className="text-sm font-semibold text-black mt-4 flex items-center justify-center"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite seu nome"
              required
              value={nome}
              onChange={handleChangeNome}
              className="w-full px-3 mb-2 bg-transparent border-none focus:outline-none font-semibold text-4xl text-center"
            />
          </div>
          <div className="mb-2 relative">
            <label
              htmlFor="email"
              className={`text-sm font-semibold text-black mt-4 flex items-center justify-center ${
                showEmailField ? "" : "hidden"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email"
              required
              value={email}
              onChange={handleChangeEmail}
              className={`w-full px-3 mb-4 bg-transparent border-none focus:outline-none font-semibold text-2xl text-center ${
                showEmailField ? "" : "hidden"
              }`}
            />
          </div>
          <Button />
          <div className="mb-4">
            <p className="text-sm font-semibold text-center">
              Acesso válido até
            </p>
            <div className="text-xl font-medium text-center">
              {validUntil === format(new Date(), "dd/MM/yyyy") ? (
                <span className="text-black">{validUntil}</span>
              ) : (
                <span className="text-green-500 font-bold text-3xl">
                  {validUntil}
                </span>
              )}
            </div>
          </div>
          {showMessage && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-center text-lime-600">
                {serverResponse}
              </p>
            </div>
          )}
          {errorMessage && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-center text-red-600">
                {errorMessage}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
