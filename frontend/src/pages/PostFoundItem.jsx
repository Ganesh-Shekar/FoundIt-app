import { useState } from "react";
import axios from "axios";

function PostFoundItem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    dateFound: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:3000/found", form);
      setSubmitSuccess(true);
      setForm({ title: "", description: "", location: "", dateFound: "" });
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Error reporting item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
        🔎 Report Found Item
      </h1>
      <p className="text-center text-gray-500 mb-8 max-w-xl mx-auto">
        Help reunite people with their belongings by reporting items you've found.
      </p>
      
      {submitSuccess && (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-sm">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <p>Found item reported successfully!</p>
          </div>
        </div>
      )}
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-6 border border-gray-100"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
          <input
            id="title"
            name="title"
            placeholder="What did you find?"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the item in detail (but don't include identifying information that only the owner would know)"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Found Location</label>
          <input
            id="location"
            name="location"
            placeholder="Where did you find it?"
            value={form.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>
        
        <div>
          <label htmlFor="dateFound" className="block text-sm font-medium text-gray-700 mb-1">Date Found</label>
          <input
            id="dateFound"
            type="date"
            name="dateFound"
            value={form.dateFound}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${isSubmitting ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} text-white font-semibold py-3 rounded-lg transition-all duration-300 flex justify-center items-center`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Report'
          )}
        </button>
      </form>
    </div>
  );
}

export default PostFoundItem;