import { useGetMyCertificationQuery } from "../api/certificationApiSlice";
import Spinner from "../components/ui/Spinner";
import Table from "../components/ui/Table";

const ProfilePage = () => {
  const { data, isLoading, error } = useGetMyCertificationQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load profile data.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-4 text-3xl font-bold">My Profile</h1>
      <div className="mb-8 rounded-lg bg-indigo-100 p-6">
        <h2 className="text-xl font-semibold text-indigo-800">
          Highest Certification Level
        </h2>
        <p className="mt-2 text-4xl font-bold text-indigo-600">
          {data?.highestLevel || "Not Certified"}
        </p>
      </div>

      <h2 className="mb-4 text-2xl font-bold">Assessment History</h2>
      {data?.history && data.history.length > 0 ? (
        <Table headers={["Date", "Step", "Score", "Level Achieved"]}>
          {data.history.map((item: any) => (
            <tr key={item._id} className="border-b">
              <td className="p-4">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="p-4">{item.currentStep}</td>
              <td className="p-4">{item.score.toFixed(2)}%</td>
              <td className="p-4 font-semibold">{item.levelAchieved}</td>
            </tr>
          ))}
        </Table>
      ) : (
        <p>You have not completed any assessments yet.</p>
      )}
    </div>
  );
};

export default ProfilePage;
