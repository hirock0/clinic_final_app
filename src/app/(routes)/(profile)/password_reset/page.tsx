"use client";

import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiMail } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";

const Password_resetPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Simple email validation
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      if (!formRef.current) return;

      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setMessage("Reset link sent to your email!");
      formRef.current.reset();
      setTimeout(() => {
        router.back();
      }, 5000);
      setEmail("");
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tokenHandler = async () => {
      try {
        const response = await axios.get("/pages/api/token");
        const fetchedToken = response?.data?.token;
        setToken(fetchedToken);
      } catch (error: any) {
        setError("Failed to fetch token");
      }
    };
    tokenHandler(); // 👈 Removed wrong dependency
  }, [token]); // ✅ Should run once only

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Reset Your Password
        </h2>
        <form ref={formRef} onSubmit={handleReset} className="space-y-4">
          <div>
            <label
              htmlFor="user_email"
              className="block text-sm font-medium mb-1"
            >
              Email Address
            </label>
            <div className="flex items-center border rounded px-3 py-2">
              <FiMail className="text-gray-400 mr-2" />
              <input
                id="user_email"
                name="user_email"
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <input type="hidden" name="from_name" value="Hirock Dutta" />
          <input type="hidden" name="message" value={token} />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-600 text-center font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-600 text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Password_resetPage;
