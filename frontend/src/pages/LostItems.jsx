import { useEffect, useState } from "react";
import axios from "axios";

function LostItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://backend-service:3000/lost")
      .then((res) => {
        const data = res.data || {};
        const list = Object.entries(data).map(([id, item]) => ({
          id,
          ...item,
        }));
        setItems(list.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent shadow-md"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
        🧳 Lost Items
      </h1>
      <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
        Browse through items that have been reported lost. If you recognize
        something, please contact the owner.
      </p>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg">No lost items reported yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col transition-all duration-300 ease-in-out transform hover:-translate-y-2"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {item.title}
                </h2>
                <span className="bg-red-100 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Lost
                </span>
              </div>
              <p className="text-gray-600 mb-4 flex-1">{item.description}</p>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="text-sm text-blue-600 font-medium flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {item.location}
                </div>
                {item.dateLost && (
                  <div className="text-xs text-gray-500">
                    Lost on: {new Date(item.dateLost).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LostItems;
