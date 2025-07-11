"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import {
  FaUser,
  FaMobile,
  FaAt,
  FaCheck,
  FaTimes,
  FaArrowLeft,
  FaCalendar,
  FaSpinner,
  FaPaperPlane,
  FaEnvelope,
  FaUserPlus,
  FaInfoCircle,
  FaLink,
  FaLock,
  FaIdCard,
} from "react-icons/fa";

type DomainOption = { value: string; label: string };

interface FormData {
  name: string;
  mobile: string;
  alternateEmail: string;
  companyEmailPrefix: string;
  dob: string;
  doj: string;
  employeeId: string;
}

interface Errors {
  [key: string]: string;
}

interface CreateEmailModalProps {
  onClose: () => void;
  onConfirm: (data: {
    name: string;
    companyEmail: string;
    mobile: string;
    alternateEmail: string;
    dob: string;
    doj: string;
    employeeId: string;
    password: string;
  }) => Promise<void> | void;
}

const CreateEmailModal: React.FC<CreateEmailModalProps> = ({
  onClose,
  onConfirm,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    alternateEmail: "",
    companyEmailPrefix: "",
    dob: "",
    doj: "",
    employeeId: "",
  });

  const [selectedDomain, setSelectedDomain] = useState<string>("@cqmail.in");
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [checkingEmail, setCheckingEmail] = useState<boolean>(false);

  const [preview, setPreview] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [createdEmail, setCreatedEmail] = useState<string>("");
  const [showCredentials, setShowCredentials] = useState<boolean>(false);
  const [credentialsSent, setCredentialsSent] = useState<boolean>(false);
  const [sendingError, setSendingError] = useState<string | null>(null);

  const domainOptions: DomainOption[] = [
    { value: "@cqmail.in", label: "@cqmail.in" },
    { value: "@camelq.in", label: "@camelq.in" },
    { value: "@cqmail.co.in", label: "@cqmail.co.in" },
    { value: "@camel.net", label: "@camel.net" },
  ];

  useEffect(() => {
    const checkAvailability = async () => {
      if (formData.companyEmailPrefix && selectedDomain) {
        setCheckingEmail(true);
        try {
          await new Promise((res) => setTimeout(res, 500));
          const available = Math.random() > 0.3;
          setEmailAvailable(available);
        } catch (error) {
          setEmailAvailable(null);
        } finally {
          setCheckingEmail(false);
        }
      } else {
        setEmailAvailable(null);
      }
    };
    const timer = setTimeout(checkAvailability, 500);
    return () => clearTimeout(timer);
  }, [formData.companyEmailPrefix, selectedDomain]);

  const generatePassword = (): string => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if (name === "name") {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
      const emailPrefix = filteredValue.toLowerCase().replace(/\s+/g, ".");
      setFormData({
        ...formData,
        [name]: filteredValue,
        companyEmailPrefix: emailPrefix,
      });
      return;
    }

    if (name === "mobile") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
      return;
    }

    if (name === "employeeId") {
      const filteredValue = value.replace(/[^A-Za-z0-9]/g, "");
      if (filteredValue.length < 3) {
        const lettersOnly = filteredValue.replace(/[^A-Za-z]/g, "");
        setFormData({ ...formData, [name]: lettersOnly.toUpperCase() });
      } else {
        const firstThree = filteredValue.slice(0, 3).replace(/[^A-Za-z]/g, "");
        const rest = filteredValue.slice(3).replace(/[^A-Za-z0-9]/g, "");
        setFormData({
          ...formData,
          [name]: (firstThree + rest).toUpperCase(),
        });
      }
      return;
    }

    if (name === "companyEmailPrefix") {
      const filtered = value.toLowerCase().replace(/[^a-z0-9.]/g, "");
      setFormData({ ...formData, companyEmailPrefix: filtered });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }
    if (!formData.alternateEmail.trim()) {
      newErrors.alternateEmail = "Alternate email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.alternateEmail)) {
      newErrors.alternateEmail = "Invalid email format";
    }
    if (!formData.companyEmailPrefix.trim()) {
      newErrors.companyEmail = "Email prefix is required";
    } else if (!/^[a-z0-9.]+$/.test(formData.companyEmailPrefix)) {
      newErrors.companyEmail =
        "Only lowercase letters, numbers and dots allowed";
    } else if (emailAvailable === false) {
      newErrors.companyEmail = "Email already taken";
    }
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.doj) newErrors.doj = "Date of joining is required";
    if (!formData.employeeId) {
      newErrors.employeeId = "Employee ID is required";
    } else if (!/^[A-Za-z]{3}/.test(formData.employeeId)) {
      newErrors.employeeId = "First 3 characters must be letters";
    } else if (formData.employeeId.length < 3) {
      newErrors.employeeId = "Minimum 3 characters required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreview = (): void => {
    if (validateForm()) setPreview(true);
  };

  const handleConfirm = async (): Promise<void> => {
    const password = generatePassword();
    const companyEmail = formData.companyEmailPrefix + selectedDomain;
    setGeneratedPassword(password);
    setCreatedEmail(companyEmail);
    setShowCredentials(true);
  };

  const handleSendCredentials = async (): Promise<void> => {
    try {
      setSendingError(null);
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (Math.random() < 0.2) throw new Error("Network error");
      setCredentialsSent(true);
    } catch (error) {
      setSendingError("Failed to send credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalConfirm = async (): Promise<void> => {
    await onConfirm({
      name: formData.name,
      companyEmail: createdEmail,
      mobile: formData.mobile,
      alternateEmail: formData.alternateEmail,
      dob: formData.dob,
      doj: formData.doj,
      employeeId: formData.employeeId,
      password: generatedPassword,
    });
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        {success ? (
          <div className="text-center">
            <FaCheck className="mx-auto text-4xl text-green-600" />
            <h2 className="mt-4 text-2xl font-bold">Email Created Successfully!</h2>
            <button
              onClick={onClose}
              className="px-4 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : preview ? (
          <div>
            <button
              onClick={() => setPreview(false)}
              className="flex items-center mb-4 text-sm text-gray-600"
            >
              <FaArrowLeft className="mr-1" /> Back
            </button>
            <h2 className="mb-4 text-xl font-bold">Preview Details</h2>
            <ul className="mb-4 space-y-2">
              <li><strong>Name:</strong> {formData.name}</li>
              <li><strong>Mobile:</strong> {formData.mobile}</li>
              <li><strong>Alternate Email:</strong> {formData.alternateEmail}</li>
              <li><strong>Company Email:</strong> {formData.companyEmailPrefix}{selectedDomain}</li>
              <li><strong>DOB:</strong> {formData.dob}</li>
              <li><strong>DOJ:</strong> {formData.doj}</li>
              <li><strong>Employee ID:</strong> {formData.employeeId}</li>
            </ul>
            {showCredentials ? (
              <div>
                <p><strong>Generated Password:</strong> {generatedPassword}</p>
                <p><strong>Company Email:</strong> {createdEmail}</p>
                {credentialsSent ? (
                  <p className="mt-2 text-green-600">Credentials sent successfully!</p>
                ) : (
                  <>
                    {sendingError && (
                      <p className="mt-2 text-red-600">{sendingError}</p>
                    )}
                    <button
                      onClick={handleSendCredentials}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      {loading && <FaSpinner className="animate-spin" />}
                      Send Credentials
                    </button>
                  </>
                )}
                {credentialsSent && (
                  <button
                    onClick={handleFinalConfirm}
                    className="px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
                  >
                    Confirm & Create
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Generate Password & Continue
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Create New Company Email</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  <FaUser className="inline mr-1" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  <FaMobile className="inline mr-1" /> Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.mobile && <p className="text-sm text-red-600">{errors.mobile}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  <FaAt className="inline mr-1" /> Alternate Email
                </label>
                <input
                  type="email"
                  name="alternateEmail"
                  value={formData.alternateEmail}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.alternateEmail && <p className="text-sm text-red-600">{errors.alternateEmail}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  <FaEnvelope className="inline mr-1" /> Company Email Prefix
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="companyEmailPrefix"
                    value={formData.companyEmailPrefix}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border rounded-l"
                  />
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="px-3 py-2 border rounded-r"
                  >
                    {domainOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {checkingEmail ? (
                  <p className="text-sm text-blue-600">Checking availability...</p>
                ) : emailAvailable === true ? (
                  <p className="text-sm text-green-600">Email is available</p>
                ) : emailAvailable === false ? (
                  <p className="text-sm text-red-600">Email is already taken</p>
                ) : null}
                {errors.companyEmail && <p className="text-sm text-red-600">{errors.companyEmail}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  <FaCalendar className="inline mr-1" /> Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.dob && <p className="text-sm text-red-600">{errors.dob}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  <FaCalendar className="inline mr-1" /> Date of Joining
                </label>
                <input
                  type="date"
                  name="doj"
                  value={formData.doj}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.doj && <p className="text-sm text-red-600">{errors.doj}</p>}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  <FaIdCard className="inline mr-1" /> Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                {errors.employeeId && <p className="text-sm text-red-600">{errors.employeeId}</p>}
              </div>
            </div>
            <button
              onClick={handlePreview}
              className="w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Preview
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEmailModal;
