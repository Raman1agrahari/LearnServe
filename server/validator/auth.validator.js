const { z } = require("zod");

const signupSchema =z.object({
    username:z
    .string({required_error: "Name is required"})
    .trim()
    .min(3,{message:"Name must at least of 3 char"})
    .max(255,{message:"name must not be more than 255 char"}),
    email:z
    .string({required_error: "email is required"})
    .trim()
    .email({ message:"invalid email address"})
    .min(3,{message:"email must at least of 3 char"})
    .max(255,{message:"email must not be more than 255 char"}),
    phone:z
    .string({required_error: "phone is required"})
    .trim()
    .min(10,{message:"phone must at least of 10 char"})
    .max(20,{message:"phone must not be more than 20 char"}),
    password :z
    .string({required_error: "password is required"})
    .trim()
    .min(7,{message:"password must at least of 7 char"})
    .max(1024,{message:"password must not be more than 1024 char"}),
});

module.exports = signupSchema ;
