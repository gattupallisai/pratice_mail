
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { motion } from "framer-motion";
import { MdEmail, MdLock, MdArrowBack } from "react-icons/md";
import { FaGoogle as FaGoogleIcon, FaTwitter as FaTwitterIcon } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "camelq@admin.in" && password === "admin123") {
      router.push("/admin");
    } else {
      alert("❌ Invalid credentials! Use camelq@admin.in / admin123");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 to-blue-300">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col max-w-6xl overflow-hidden bg-white shadow-2xl w-fit rounded-2xl md:flex-row"
      >
        {/* Back Button at container top-left */}
        <button
          onClick={() => router.push("/")}
          aria-label="Go back"
          className="absolute flex items-center p-2 text-blue-600 transition-transform duration-200 rounded-full top-4 left-4 hover:bg-blue-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <MdArrowBack className="w-6 h-6" />
        </button>

        {/* Left Side with Image and Welcome Text */}
        <div className="flex flex-col items-center justify-center p-8 bg-white md:w-1/2">
          <h2 className="mb-6 text-4xl font-extrabold text-center text-blue-900">
            Welcome Back!
          </h2>
          <div className="w-full max-w-md">
            <Image
              src="https://img.freepik.com/premium-vector/man-working-computer-with-blue-background-with-clouds-blue-sky_889056-208011.jpg"
              alt="Welcome Illustration"
              width={400}
              height={300}
              className="object-cover h-56 rounded-lg"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center p-8 md:w-1/2">
          <h2 className="mb-6 text-3xl font-bold text-center text-blue-800 md:text-left">
            Access your CQ Mail account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="py-3 pl-12 pr-4 text-base font-medium text-blue-900 placeholder-blue-400 transition-all duration-200 border-2 border-blue-200 shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-gradient-to-r from-blue-50 to-white"
                />
                <span className="absolute text-blue-400 transform -translate-y-1/2 left-4 top-1/2">
                  <MdEmail className="w-6 h-6" />
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="py-3 pl-12 pr-4 text-base font-medium text-blue-900 placeholder-blue-400 transition-all duration-200 border-2 border-blue-200 shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-gradient-to-r from-blue-50 to-white"
                />
                <span className="absolute text-blue-400 transform -translate-y-1/2 left-4 top-1/2">
                  <MdLock className="w-6 h-6"/>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(!!checked)}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="flex items-center justify-center w-full gap-2 py-3 text-lg font-bold tracking-wide text-white transition-all duration-200 shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 rounded-xl"
            >
              Sign in
            </Button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative px-2 text-sm text-gray-500 bg-white">
                or continue with
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center w-1/2 py-2 space-x-2 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <FaGoogleIcon className="text-xl text-red-500" />
                <span>Sign in with Google</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center w-1/2 py-2 space-x-2 text-base font-semibold text-blue-500 transition-all duration-200 bg-white border-2 border-blue-200 rounded-lg shadow-sm hover:bg-blue-50"
              >
                <FaTwitterIcon className="text-xl text-blue-400" />
                <span>Sign in with Twitter</span>
              </Button>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-gray-700">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
