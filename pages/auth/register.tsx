import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { AuthLayout } from "@/components/layouts";
import { validations } from "@/utils";
import { useAuthContext } from "@/context/auth";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { registerUser } = useAuthContext();
  const router = useRouter();

  const destination = useMemo(
    () => router.query.p?.toString() || "/",
    [router.query.p]
  );

  const onRegisterUser = async ({ email, password, name }: FormData) => {
    setError("");
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setError(message!);
      setTimeout(() => setError(""), 3000);
      return;
    }

    router.replace(destination);
  };

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>
              {error && (
                <Chip
                  label={error}
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Mínimo 2 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <Link href={`/auth/login?p=${destination}`}>
                ¿Ya tienes cuenta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
