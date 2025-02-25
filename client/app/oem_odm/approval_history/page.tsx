'use client'
import { useEffect, useState } from "react";
import { Request } from "@/app/interface";
import { BookDashed } from "lucide-react";

export default function ApprovalHistory() {

  type StatusColours = {
    [key: string]: string,
  }

  const statusColours = {
    "pending": "bg-[#E8B931]",
    "approved": "bg-[#14AE5C]",
    "issued": "bg-[#4247E0]",
    "rejected": "bg-[#FF6262]",
  } as StatusColours

  const [requests, setRequests] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getRequests = async () => {
    setError("");
    setLoading(true);

    const apiUrl = `http://127.0.0.1:5000/license/`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setRequests(data);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRequests()
  }, [])

  return (
    <main className="text-[#E9E9E9] w-full">
      <div className="m-6">
        <p className="font-semibold text-2xl">Approval History</p>
        <p className="text-[#757575] mt-1">
          History of approvals, assigned features, and associated documents.
        </p>
      </div>

      {
        requests.length > 0 ?
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
              <thead className="text-xs uppercase bg-[#212529] text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Operator
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Features
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request: Request) => (
                  <tr className="odd:bg-[#181C1F] even:bg-[#212529]" key={request._id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-white"
                    >
                      {request.title}
                    </th>
                    <td className="px-6 py-4">{request.operator.name}</td>
                    <td className="px-6 py-4">{request.type}</td>
                    <td className="px-6 py-4">{request.features.map((feature) => feature.name).join(', ')}</td>
                    <td className="px-6 py-4">{request.duration_in_months}</td>
                    <td className="px-6 py-4">{request.created_at}</td>
                    <td className="px-6 py-4">{request.notes}</td>
                    <td className="px-6 py-4">
                      <button className={`${statusColours[request.approved]} gap-3 w-32 py-2 flex justify-center items-center font-medium text-white rounded-full cursor-auto`}>
                        {request.approved[0].toUpperCase() + request.approved.slice(1)}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> :
          <div className="w-full flex justify-center items-center flex-col opacity-30 min-h-[70%]">
            <BookDashed size={50} />
            <p className="mt-4 text-lg italic">No requests found.</p>
          </div>
      }
    </main>
  );
}
