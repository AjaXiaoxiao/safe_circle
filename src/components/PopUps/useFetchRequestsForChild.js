import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";

const useFetchRequestsForChild = (username) => {
  const [childRequests, setChildRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestsForChild = async () => {
      setLoading(true);
      setError(null);

      try {
        const userQuery = new Parse.Query("UserProfile");
        userQuery.equalTo("username", username);

        console.log("Fetching child for username:", username);
        const child = await userQuery.first();

        if (!child) {
          throw new Error(`No user found with username: ${username}`);
        }

        const userPointer = child.get("userPointer"); // Pointer to the _User object
        const requestQuery = new Parse.Query("Requests");
        requestQuery.equalTo("Child", userPointer); // Match Requests to this child
        requestQuery.equalTo("Status", "Pending"); // Only pending requests
        requestQuery.include("Status");

        const fetchedRequests = await requestQuery.find();
        console.log("Fetched child requests:", fetchedRequests);

        setChildRequests(fetchedRequests);
      } catch (err) {
        console.error("Error fetching requests for child:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchRequestsForChild();
    }
  }, [username]);

  return { childRequests, error, loading };
};

export default useFetchRequestsForChild;
