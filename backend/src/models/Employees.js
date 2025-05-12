/*
    Campos:
        name
        lastname
        email
        password
        telephone
        dui
        address
        birthdate
        hireDate
        isssNumber
*/

import { Schema, model } from "mongoose";

const employeesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: [
        /^[A-Za-z\s]+$/,
        "El nombre solo puede contener letras y espacios",
      ], // Solo letras y espacios
      minlength: [3, "El nombre debe tener al menos 3 caracteres"], //PD: un nombre corto de 3 letras puede ser Ana, Eva, Luz,
    },
    lastName: {
      type: String,
      required: true,
      match: [
        /^[A-Za-z\s]+$/,
        "El nombre solo puede contener letras y espacios",
      ], // Solo letras y espacios
      minlength: [3, "El nombre debe tener al menos 3 caracteres"], //PD: No encontré un apellido corto, solo "Paz" pero que tampoco sea chabacan no 3 letras en apellido
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Por favor, ingrese un correo electrónico válido",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    telephone: {
      type: String,
      required: true,
      match: [
        /^[0-9]{8}$/,
        "El teléfono debe contener exactamente 8 dígitos numéricos",
      ],
    },
    dui: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{8}-\d$/, "Invalid DUI format. Must follow XXXXXXXX-X."],
    },
    address: {
      type: String,
      required: true,
      minlength: 10,
    },
    birthdate: {
      type: String,
      required: true,
      max: [new Date(), "La fecha de nacimiento no puede ser una fecha futura"],
      message: "La fecha de nacimiento no puede ser una fecha futura",
    },
    hireDate: {
      type: String,
      required: true,
      max: [new Date(), "La fecha de nacimiento no puede ser una fecha futura"],
      message: "La fecha de contratación no puede ser una fecha futura",
    },
    isssNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Employees", employeesSchema);
