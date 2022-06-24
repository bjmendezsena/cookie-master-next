import React, { useState, FC } from "react";
import { GetServerSideProps } from "next";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Cookies from "js-cookie";
import Axios from "axios";
import { Layout } from "../components/layouts";

type ThemeType = "light" | "dark" | "custom";

interface Props {
  theme: ThemeType;
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {
  const [curentTheme, setCurentTheme] = useState<ThemeType>(theme);

  const onThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value as ThemeType;
    setCurentTheme(selectedTheme);

    Cookies.set("theme", selectedTheme);
  };

  const onClick = async () => {
    const { data } = await Axios.get("/api/hello");
    console.log({ data });
  };

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup value={curentTheme} onChange={onThemeChange}>
              <FormControlLabel
                value='light'
                control={<Radio />}
                label='light'
              />
              <FormControlLabel value='dark' control={<Radio />} label='dark' />
              <FormControlLabel
                value='custom'
                control={<Radio />}
                label='custom'
              />
            </RadioGroup>
          </FormControl>
          <Button onClick={onClick}>Solicitud</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const validThemes = ["light", "dark", "custom"];

  const { theme = "light", name = "No name" } = req.cookies;

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : "light",
      name,
    },
  };
};

export default ThemeChangerPage;
