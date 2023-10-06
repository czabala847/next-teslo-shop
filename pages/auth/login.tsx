import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { ErrorOutline } from "@mui/icons-material";

import { AuthLayout } from "@/components/layouts";
import { validations } from "@/utils";
import { useAuthContext } from "@/context/auth";
import { tesloApi } from "@/api";
import { useRouter } from "next/router";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { loginUser } = useAuthContext();
  const router = useRouter();

  const destination = useMemo(
    () => router.query.p?.toString() || "/",
    [router.query.p]
  );

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    router.replace(destination);
  };

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>
              {showError && (
                <Chip
                  label="No reconocemos ese usuario / contraseña"
                  color="error"
                  icon={<ErrorOutline />}
                  className="fadeIn"
                />
              )}
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
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                disabled={showError}
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <Link href={`/auth/register?p=${destination}`}>
                ¿No tienes cuenta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
