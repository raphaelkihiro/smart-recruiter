import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function CreateProfile() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const token = localStorage.getItem("access_token");

    // Clean the data to avoid sending empty strings
    const cleanedData = {
      name: data.name,
      company: data.company,
      role: data.role,
      location: data.location || null,
      skills: data.skills || null,
      education: data.education || null,
      experience: data.experience || null
    };

    try {
      const res = await fetch(`${API_BASE_URL}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cleanedData)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to create profile");
      }

      toast.success("Profile created successfully!");
      
      navigate("/intervieweedashboard");
      
    } catch (error) {
      console.error("Error:", error);
      toast.error(`🚫 ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1d34] px-4">
      <div className="w-full max-w-3xl bg-[#112240] rounded-2xl shadow-xl p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 text-center">
          Create Profile
        </h2>
        <p className="text-gray-300 text-center mb-8">
          Fill out your profile details below
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic fields */}
          {[
            { name: "name", label: "User Name" },
            { name: "company", label: "Previous Company" },
            { name: "role", label: "Interested Role" },
            { name: "location", label: "Place of Residence" }
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-gray-200 font-medium mb-1">{label}</label>
              <input
                type="text"
                {...register(name, { required: `${label} is required` })}
                className="w-full px-4 py-2 bg-[#0f1a2b] text-white border border-cyan-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              {errors[name] && (
                <p className="text-sm text-red-400 mt-1">{errors[name].message}</p>
              )}
            </div>
          ))}

          {/* Text areas */}
          {[
            { name: "skills", label: "Skills" },
            { name: "education", label: "Education" },
            { name: "experience", label: "Experience" }
          ].map(({ name, label }) => (
            <div key={name} className="md:col-span-2">
              <label className="block text-gray-200 font-medium mb-1">{label}</label>
              <textarea
                rows="4"
                {...register(name)}
                className="w-full px-4 py-2 bg-[#0f1a2b] text-white border border-cyan-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
              ></textarea>
            </div>
          ))}
           {/* Update Profile Prompt */}
            <p className="text-center text-sm text-gray-400 md:col-span-2">
              Already have a profile?{" "}
              <a
                href="/update/profile"
                className="text-cyan-400 font-medium hover:underline"
              >
                Update your profile here
              </a>
            </p>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-cyan-400 hover:bg-cyan-500 text-[#0f1a2b] font-semibold px-6 py-2 rounded-xl transition"
            >
              Submit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProfile;
