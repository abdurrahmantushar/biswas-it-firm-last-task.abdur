import { useState } from "react";
import { ArrowRight, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);
      navigate("/login", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
              <UserPlus size={21} />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Register to access your client portal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />

            <Input
              label="Company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
            />

            <Input
              label="Phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Creating account..." : "Create Account"}
              {!loading && <ArrowRight size={17} />}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-slate-900 transition hover:text-slate-600"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;