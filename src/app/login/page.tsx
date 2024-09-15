"use client";

import { api } from "@/lib/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function LoginPage() {
  const [crendential, setCredential] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post("/login", {
        username: crendential.username,
        password: crendential.password,
      });
      alert("success");
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError<{ message: string }>(err)) {
        alert(err.response?.data.message);
      }
    }
  };
  return (
    <form className="border rounded-sm max-w-72 p-4" onSubmit={handleSubmit}>
      <div>
        <h1 className="text-2xl font-bold mb-2">Login</h1>
      </div>
      <div>
        <label>Username</label>
        <div>
          <input
            type="text"
            name="username"
            className="border"
            required
            onChange={(event) =>
              setCredential({
                ...crendential,
                [event.target.name]: event.target.value,
              })
            }
          />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <input
            type="password"
            name="password"
            className="border"
            required
            onChange={(event) =>
              setCredential({
                ...crendential,
                [event.target.name]: event.target.value,
              })
            }
          />
        </div>
        <button className="bg-blue-500 text-white rounded-md px-2 mt-3">
          Login
        </button>
      </div>
    </form>
  );
}
export default LoginPage;
