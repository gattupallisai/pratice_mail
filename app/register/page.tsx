"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function RegisterPage() {
  const router = useRouter();

  // Form state
  const [fullName, setFullName] = useState("");
  const [companyEmailPrefix, setCompanyEmailPrefix] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("@cqmail.in");
  const [email, setEmail] = useState(""); // personal email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [terms, setTerms] = useState(false);

  // Password validations
  const [showPasswordPopover, setShowPasswordPopover] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  // Preview and flow states
  const [preview, setPreview] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [credentialsSent, setCredentialsSent] = useState(false);
  const [sendingError, setSendingError] = useState<string | null>(null);

  // Update password validations
  useEffect(() => {
    setPasswordValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    });
  }, [password]);

  // Auto-generate company email prefix from full name
  useEffect(() => {
    if (!preview) {
      if (fullName.trim() === "") {
        setCompanyEmailPrefix("");
      } else {
        const prefix = fullName
          .trim()
          .toLowerCase()
          .replace(/[^a-z\s]/g, "")
          .replace(/\s+/g, ".");
        setCompanyEmailPrefix(prefix);
      }
    }
  }, [fullName, preview]);

  const isPasswordValid = Object.values(passwordValidations).every(Boolean);

  // Validate company email prefix
  const isCompanyEmailPrefixValid =
    /^[a-z0-9.]+$/.test(companyEmailPrefix) && companyEmailPrefix.length > 0;

  // Full company email
  const fullCompanyEmail = companyEmailPrefix + selectedDomain;

  // Overall form validation
  const isFormValid =
    fullName.trim() !== "" &&
    isCompanyEmailPrefixValid &&
    email &&
    isPasswordValid &&
    confirmPassword === password &&
    phone &&
    terms;

  // Handle form submit: show preview
  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setPreview(true);
  };

  // Final confirm: simulate registration success and show send credentials prompt
  const handleFinalConfirm = () => {
    // Simulate registration API call
    setTimeout(() => {
      setRegistered(true);
    }, 1000);
  };

  // Handle send credentials simulation and redirect
  const handleSendCredentials = async () => {
    setSendingError(null);
    try {
      // Simulate sending email delay
      await new Promise((res) => setTimeout(res, 1000));
      setCredentialsSent(true);
      // After sending credentials, redirect after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setSendingError("Failed to send credentials. Please try again.");
    }
  };

  // Reset form and flow
  const resetForm = () => {
    setFullName("");
    setCompanyEmailPrefix("");
    setSelectedDomain("@cqmail.in");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setTerms(false);
    setPreview(false);
    setRegistered(false);
    setCredentialsSent(false);
    setSendingError(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-400 via-blue-300 to-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex w-screen max-w-4xl overflow-hidden bg-white shadow-lg rounded-2xl"
      >
        {/* Left Side Content */}
        <div
          className="relative flex-col justify-center hidden p-10 overflow-hidden text-white md:flex md:w-1/2"
          style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.7), rgba(59, 130, 246, 0.7)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="mb-4 text-4xl font-extrabold">Welcome to CQ Mail!</h2>
          <p className="text-lg leading-relaxed">
            Join our community and start managing your emails smarter, faster, and securely. CQ Mail offers the best tools to organize your inbox and stay connected.
          </p>
          <div className="mt-8">
            <Image
              src="https://static.vecteezy.com/system/resources/thumbnails/003/241/969/small/collaboration-of-professional-teamwork-inthe-meeting-concept-free-vector.jpg"
              alt="Welcome Illustration"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Right Side Form or Preview */}
        <div className="w-full p-10 md:w-1/2">
          {!preview && (
            <>
              <h1 className="mb-8 text-3xl font-semibold text-center text-blue-700">
                Create your account
              </h1>
              <form onSubmit={handlePreview} className="relative space-y-6">
                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName" className="text-blue-700">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="border-blue-400 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                {/* Company Email Prefix + Domain */}
                <div>
                  <Label htmlFor="companyEmailPrefix" className="text-blue-700">
                    Company Email
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="companyEmailPrefix"
                      type="text"
                      value={companyEmailPrefix}
                      onChange={(e) =>
                        setCompanyEmailPrefix(
                          e.target.value.toLowerCase().replace(/[^a-z0-9.]/g, "")
                        )
                      }
                      placeholder="username"
                      required
                      className={`border-blue-400 focus:ring-blue-600 focus:border-blue-600 flex-grow ${
                        !isCompanyEmailPrefixValid ? "border-gray-100" : ""
                      }`}
                    />
                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md"
                      aria-label="Select email domain"
                    >
                      <option value="@cqmail.in">@cqmail.in</option>
                      <option value="@camelq.in">@camelq.in</option>
                    </select>
                  </div>
                  {!isCompanyEmailPrefixValid && (
                    <p className="mt-1 text-sm text-blue-600">
                      Only lowercase letters, numbers, and dots allowed.
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Full email:{" "}
                    <strong>{fullCompanyEmail || "(username)@domain"}</strong>
                  </p>
                </div>

                {/* Personal Email */}
                <div>
                  <Label htmlFor="email" className="text-blue-700">
                    Personal Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="border-blue-400 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-blue-700">
                    Phone Number
                  </Label>
                  <PhoneInput
                    id="phone"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter phone number"
                    defaultCountry="IN"
                    value={phone}
                    onChange={(value) => setPhone(value || "")}
                    international
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Label htmlFor="password" className="text-blue-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    onFocus={() => setShowPasswordPopover(true)}
                    onBlur={() =>
                      setTimeout(() => {
                        setShowPasswordPopover(false);
                      }, 200)
                    }
                    className="border-blue-400 focus:ring-blue-600 focus:border-blue-600"
                  />
                  {/* Password criteria popover */}
                  {showPasswordPopover && (
                    <div className="absolute left-0 z-10 p-4 mt-2 text-blue-700 bg-white border border-blue-400 rounded-md shadow-lg top-full w-72">
                      <p className="mb-2 font-semibold">Password must include:</p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">
                          {passwordValidations.length ? (
                            <AiOutlineCheckCircle className="mr-2 text-green-600" />
                          ) : (
                            <AiOutlineCloseCircle className="mr-2 text-red-600" />
                          )}
                          Minimum 8 characters
                        </li>
                        <li className="flex items-center">
                          {passwordValidations.uppercase ? (
                            <AiOutlineCheckCircle className="mr-2 text-green-600" />
                          ) : (
                            <AiOutlineCloseCircle className="mr-2 text-red-600" />
                          )}
                          At least one uppercase letter
                        </li>
                        <li className="flex items-center">
                          {passwordValidations.lowercase ? (
                            <AiOutlineCheckCircle className="mr-2 text-green-600" />
                          ) : (
                            <AiOutlineCloseCircle className="mr-2 text-red-600" />
                          )}
                          At least one lowercase letter
                        </li>
                        <li className="flex items-center">
                          {passwordValidations.number ? (
                            <AiOutlineCheckCircle className="mr-2 text-green-600" />
                          ) : (
                            <AiOutlineCloseCircle className="mr-2 text-red-600" />
                          )}
                          At least one number
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirmPassword" className="text-blue-700">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                    className={`border ${
                      confirmPassword && confirmPassword !== password
                        ? "border-red-500"
                        : "border-blue-400"
                    } focus:ring-blue-600 focus:border-blue-600`}
                  />
                  {confirmPassword && confirmPassword !== password && (
                    <p className="mt-1 text-sm text-red-600">Passwords do not match.</p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={terms}
                    onCheckedChange={(checked) => setTerms(!!checked)}
                    className="border-blue-400"
                  />
                  <Label htmlFor="terms" className="text-blue-700">
                    I agree to the Terms and Conditions
                  </Label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
                >
                  Preview Details
                </Button>

                <p className="mt-4 text-center text-blue-700">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold underline hover:text-blue-900">
                    Login
                  </Link>
                </p>
              </form>
            </>
          )}

          {/* Preview */}
          {preview && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-center text-blue-700">
                Please Confirm Your Details
              </h2>
              <div className="p-6 space-y-4 border border-gray-300 rounded-md bg-gray-50">
                <p>
                  <strong>Full Name:</strong> {fullName}
                </p>
                <p>
                  <strong>Company Email:</strong>{" "}
                  <span className="font-mono text-blue-600">{fullCompanyEmail}</span>
                </p>
                <p>
                  <strong>Personal Email:</strong> {email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {phone}
                </p>
                <p>
                  <strong>Password:</strong>{" "}
                  <span className="px-2 py-1 font-mono bg-gray-200 rounded">{password}</span>
                </p>
              </div>

              {!registered ? (
                // Show Confirm and Register button before registration
                <div className="mt-6 space-y-4">
                  <Button
                    onClick={handleFinalConfirm}
                    className="w-full text-white bg-green-600 hover:bg-green-700"
                  >
                    Confirm and Register
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPreview(false);
                      setCredentialsSent(false);
                      setSendingError(null);
                    }}
                    className="w-full"
                  >
                    Edit Details
                  </Button>
                </div>
              ) : !credentialsSent ? (
                // After registration, ask to send credentials
                <div className="flex flex-col gap-3 mt-6">
                  <p className="font-semibold text-green-600 text-center">
                    Registration successful! Please send credentials to your personal email.
                  </p>
                  <Button
                    onClick={handleSendCredentials}
                    className="text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Send Credentials to Personal Email
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="w-full"
                  >
                    Cancel and Reset
                  </Button>
                  {sendingError && <p className="text-red-600">{sendingError}</p>}
                </div>
              ) : (
                // After sending credentials, show success message
                <p className="mt-6 font-semibold text-green-600 text-center">
                  Credentials sent successfully! Redirecting to login...
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
