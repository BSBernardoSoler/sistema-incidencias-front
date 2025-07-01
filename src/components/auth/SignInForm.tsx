"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";


export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();


  const handleSubmit = async () => {
      if (!email || !password) {
        toast.error("Por favor, completa todos los campos");
        return;
      }
      try {

         const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl: "/",
        });
        if(result?.status === 200){
          router.push(`${result?.url || "/"}`);
          toast.success("Inicio de sesión exitoso");

        }else{
          result?.error && toast.error(result.error);
        }

      
      } catch (error) {
        toast.error("Error al iniciar sesión");
      }
   };
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Inicio  de sesion
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tu correo electrónico y contraseña para iniciar sesión.
            </p>
          </div>
          <div>
      
      
            
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="info@gmail.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
          
                <div>
                  <Button className="w-full" size="sm"
                  onClick={()=>{
                    handleSubmit();
                  }}
                  disabled={!email || !password}
                  >
                  
                    Iniciar sesión
                  </Button>
                </div>
              </div>
            

          
          </div>
        </div>
      </div>
    </div>
  );
}
