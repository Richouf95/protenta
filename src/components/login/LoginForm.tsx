import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import { useState } from "react";
import { authUserService, IUserCredentials } from "@/lib/auth/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/reducers/auth/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";

export function LoginForm() {
  const {access_token} = useSelector((state: RootState) => state.auth);
  const [userName, setUserName] = useState<string>("");
  const [passWord, setPassWord] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  const submitLogin = async () => {
    const data: IUserCredentials = { userName, passWord };
    const response = await authUserService(data);
    if(response) dispatch(login(response));
  };

  if(access_token) {
    router.push('/culture-config');
  }

  return (
    <Card
      className="mx-auto max-w-sm"
      style={{ boxShadow: "0px 0px 20px black" }}
    >
      <CardHeader>
        <CardTitle className="text-2xl flex flex-col items-center justify-center">
          <Leaf size={80} color="green" />
          Connexion
        </CardTitle>
        <CardDescription className="text-lg text-center">
          Entrez votre email ci-dessous pour vous connecter à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-lg">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setUserName(e.target.value)}
               className="text-lg"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password" className="text-lg">Mot de passe</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => setPassWord(e.target.value)}
               className="text-lg"
            />
            <Link href="#" className="inline-block text-sm underline">
              Mot de passe oublié ?
            </Link>
          </div>
          <Button type="button" className="w-full mb-5" onClick={submitLogin}>
            Connexion
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
