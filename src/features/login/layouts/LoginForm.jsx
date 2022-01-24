import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import useLocalization from "../../../hooks/useLocalization";
import Form, { Input, FormControl, FormLabel } from "../../../components/Form";
import { login } from "../../../redux/authSlice";
import { Button } from "@chakra-ui/react";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  // const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const t = useLocalization("login");

  const onSubmit = (data) => {
    let done = {
      apiKey:
        "6yK25XB0uchcQ78vFA28HY7hwt2enhudwkH1n1ERwiYmpijhYcNuXUmrwdwmzDPS",
      secret:
        "ZSA2XTZgwkvJpe4igFV1iq8bG1Jgv7EnZS1mDBWh4SP1zIatzskBTUwB9UYeSlj3",
      ...data,
    };
    dispatch(login(done));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="username" my="4">
        <FormLabel>{t("username")}</FormLabel>

        <Input
          type="username"
          placeholder={t("username")}
          isRequired
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("username")}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>{t("password")}</FormLabel>
        <Input
          placeholder={t("password")}
          type="password"
          {...register("password")}
        />
      </FormControl>
      <Button mt={4} type="submit" alignSelf="center">
        {t("sign-in")}
      </Button>
    </Form>
  );
};

export default LoginForm;
