import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { useState, useContext, useRef } from "react";
import {
  ArrowUpRight,
  Asterisk,
  Eye,
  EyeOff,
  GithubIcon,
  InstagramIcon,
  Loader,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function AuthenticationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
  });

  const onChangeHander = (e: any) => {
    setcredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  async function onSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);

    const username = credentials.username;
    const password = credentials.password;

    login(username, password);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="w-full">
      <div className="relative min-h-screen flex items-center justify-center md:grid lg:grid-cols-1 lg:px-0 px-6">
        {/* <div className="lg:p-8"> */}
        <div className="flex w-full flex-col justify-center space-y-6 ">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to Admin Panel
            </h1>
          </div>
          <div className={cn("grid gap-6 justify-center")}>
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <Label
                    // className="sr-only"
                    htmlFor="email"
                  >
                    Username
                  </Label>
                  <Input
                    name="username"
                    placeholder="username"
                    type="text"
                    value={credentials.username}
                    onChange={onChangeHander}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-1 relative">
                  <Label
                    // className="sr-only"
                    htmlFor="email"
                  >
                    Password
                  </Label>
                  <Input
                    name="password"
                    placeholder="some@1234"
                    value={credentials.password}
                    onChange={onChangeHander}
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <Button disabled={isLoading} className="w-auto">
                  {isLoading && (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
              </div>
            </form>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
