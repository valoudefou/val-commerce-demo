import React, { useState, useCallback } from "react";

const Footer = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    subscribed: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormData((prev) => ({ ...prev, message: "" }));

    try {
      const response = await fetch("https://live-server1.vercel.app/submit-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ email: "", subscribed: true, message: data.message });
      } else {
        setFormData((prev) => ({ ...prev, message: data.error }));
      }
    } catch (error) {
      setFormData((prev) => ({ ...prev, message: "Network error. Please try again later." }));
    } finally {
      setIsLoading(false);
    }
  }, [formData.email]);

  return (
    <div className="bg-gray-900 text-white mt-auto">
      <div className="p-6 ml-3">
        <div className="container mx-auto pt-10 px-6 flex flex-col md:flex-col justify-between items-left">
          <h4 className="text-xl font-bold mb-2">Newsletter</h4>
          <p className="text-base text-gray-400 mb-4">Get the latest updates and offers.</p>
          {!formData.subscribed ? (
            <div className="flex flex-col md:flex-row w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleEmailChange}
                className="w-full md:w-64 py-4 px-4 text-base rounded-2xl md:rounded-l-2xl md:rounded-r-none focus:outline-none text-gray-800"
              />
              <button
                onClick={handleSubmit}
                className={`font-medium bg-slate-700 hover:bg-slate-600 text-white px-4 py-4 rounded-2xl mt-4 md:rounded-r-2xl md:rounded-l-none md:mt-0 flex items-center justify-center ${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={isLoading}
                style={{ width: "120px" }}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
          ) : (
            <p className="text-base text-[#5bb543] font-bold">{formData.message}</p>
          )}
          {formData.message && !formData.subscribed && (
            <p className="mt-1 ml-1 text-left text-sm text-red-500">{formData.message}</p>
          )}
        </div>
      </div>
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Menus */}
        <div>
          <h4 className="text-lg font-bold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Press</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Services</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Product Recommendations</a></li>
            <li><a href="#" className="hover:underline">AB Testing</a></li>
            <li><a href="#" className="hover:underline">Personalization</a></li>
            <li><a href="#" className="hover:underline">Optimization</a></li>
            <li><a href="#" className="hover:underline">Analytics</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Cookie Policy</a></li>
            <li><a href="#" className="hover:underline">FAQs</a></li>
          </ul>
        </div>
      </div>
      <div className="py-6">
        <div className="container mx-auto px-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} AB Tasty. For Demonstration Purposes.
        </div>
      </div>
    </div>
  );
};

export default React.memo(Footer);
