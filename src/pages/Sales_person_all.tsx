import { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom"; // Ensure you're using react-router if needed

const api_url = import.meta.env.VITE_API_URL;

type Counselor = {
  sales_personId: number;
  name: string;
  email: string;
};

type ProfilePics = {
  [key: number]: string;
};

const Sales_personAll = () => {
  const [alldata, setData] = useState<Counselor[]>([]);
  const [profilePics, setProfilePics] = useState<ProfilePics>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/sales_person/getAll`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch counselor data");
        }

        const data: Counselor[] = await response.json();
        setData(data);
        await fetchProfilePictures(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProfilePictures = async (counselors: Counselor[]) => {
    try {
      const profilePicPromises = counselors.map(async (counselor) => {
        const response = await fetch(
          `${api_url}/api/sales_person/get/profilepic/${counselor.sales_personId}`
        );

        if (!response.ok) {
          console.error(
            `Failed to fetch profile picture for counselor ${counselor.sales_personId}`
          );
          return { sales_personId: counselor.sales_personId, profilePicture: "" };
        }

        const { profilePicture } = await response.json();
        return {
          sales_personId: counselor.sales_personId,
          profilePicture: `${api_url}${profilePicture}`,
        };
      });

      const results = await Promise.all(profilePicPromises);
      const newProfilePics: ProfilePics = results.reduce(
        (acc, { sales_personId, profilePicture }) => {
          acc[sales_personId] = profilePicture;
          return acc;
        },
        {} as ProfilePics
      );

      setProfilePics(newProfilePics);
    } catch (error) {
      console.error("Error fetching profile pictures:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-900 transition-all duration-300 flex items-center"
      >
        <IoMdArrowRoundBack className="mr-2" /> Back
      </button>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-600"></div>
        </div>
      ) : alldata.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {alldata.map((counselor) => (
            <div
              key={counselor.sales_personId}
              className="shadow-md rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-lg border border-gray-300 flex flex-col justify-between h-full"
            >
              <div className="flex flex-col items-center p-4">
                {profilePics[counselor.sales_personId] ? (
                  <img
                    src={profilePics[counselor.sales_personId]}
                    alt={`${counselor.name}'s profile`}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                ) : (
                  <FaUserTie className="text-8xl text-gray-400" />
                )}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center">
                  {counselor.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{counselor.sales_personId}</p>
              </div>

              <div className="p-2 mt-auto">
                <button
                  onClick={() =>
                    navigate(`/dashboard/salesprofile/${counselor.sales_personId}`)
                  }
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-black hover:text-white transition-all duration-300 w-full"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No counselors found.</p>
      )}
    </div>
  );
};

export default Sales_personAll;
