import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from '../Button';
import { ControlledInput } from '../ControlledInput';
import { Container } from './styles';
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

type FormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const schema = yup.object({
  name: yup.string().required("Informe o seu nome"),
  email: yup.string().email("E-mail inválido").required("Informe o e-mail"),
  password: yup.string().min(6, "A senha deve ter no mínimo 6 dígitos").required("Informa a senha"),
  password_confirmation: yup.string().oneOf([yup.ref("password"), null, "As senhas não conferem"]),
})

export function Form() {
  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const { errors } = formState

  function handleUserRegister(data: FormData) {
    console.log(data);
  }

  return (
    <Container>
      <ControlledInput
        name="name"
        icon="user"
        placeholder="Nome"
        control={control}
        error={errors.name}
      />
      <ControlledInput
        icon="mail"
        name="email"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize='none'
        control={control}
        error={errors.email}
      />
      <ControlledInput
        icon="lock"
        placeholder="Senha"
        secureTextEntry
        control={control}
        name="password"
        error={errors.password}
      />
      <ControlledInput
        icon="lock"
        placeholder="Confirme a senha"
        secureTextEntry
        control={control}
        name="password_confirmation"
        error={errors.password_confirmation}
      />

      <Button
        title="Cadastrar"
        onPress={handleSubmit(handleUserRegister)}
      />
    </Container>
  )
}