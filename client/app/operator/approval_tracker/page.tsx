'use client'
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Request } from "@/app/interface";

export default function ApprovalTracker() {

  type StatusColours = {
    [key: string]: string,
  }

  const statusColours = {
    "pending": "bg-[#E8B931]",
    "approved": "bg-[#14AE5C]",
    "issued": "bg-[#4247E0]",
    "rejected": "bg-[#FF6262]",
  } as StatusColours

  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  const getRequests = async () => {
    setLoading(true);

    const apiUrl = `http://127.0.0.1:5000/license/operator`;

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
      toast(err.message, { type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = async (e: React.FormEvent, id: string, title: string) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = `http://127.0.0.1:5000/license/${id}/cancel`;

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      toast(`Cancelled request titled "${title}".`, { type: 'success' })
      getRequests();

    } catch (err: any) {
      toast(err.message, { type: 'error' });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests()
  }, [])

  return (
    <main className="text-[#E9E9E9] w-full">
      <div className="m-6">
        <p className="font-semibold text-2xl">Approval Tracker</p>
        <p className="text-[#757575] mt-1">
          History of approvals, assigned features, and associated documents.
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="text-xs uppercase bg-[#212529] text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3"></th>
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
                <td className="px-6 py-4">
                  <button className={`${statusColours[request.approved]} gap-3 w-32 py-2 flex justify-center items-center font-medium text-white rounded-full cursor-auto`}>
                    {request.approved[0].toUpperCase() + request.approved.slice(1)}
                  </button>
                </td>
                <td className="px-6 py-4">{request.created_at}</td>

                <td className="px-6 py-4 flex justify-center items-center gap-2">
                  {request.approved === "pending" &&
                    <button onClick={(e) => handleCancel(e, request._id, request.title)} className="bg-white hover:bg-white/90 gap-3 px-8 py-2 flex justify-center items-center font-medium text-[#FF6262] rounded-full">
                      <X />
                      Cancel
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
