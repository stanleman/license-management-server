'use client'

import { BookDashed, Check, Divide, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Request } from "@/app/interface";
import { toast } from "react-toastify";

export default function RequestDashboard() {

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(false);

  const getPendingRequests = async () => {
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

      const pendingRequests = data.filter((request: Request) => request.approved === "pending")

      setRequests(pendingRequests);

    } catch (err: any) {
      toast(err.message, { type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  const handleUpdate = async (e: React.FormEvent, id: string, status: string, title: string, operator: string) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = `http://127.0.0.1:5000/license/${id}/status`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      toast(`${data.status[0].toUpperCase() + data.status.slice(1)} request titled "${title}" by ${operator}.`, { type: 'success' })
      getPendingRequests();
      
    } catch (err: any) {
      toast(err.message, { type: 'error' });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPendingRequests()
  }, [])

  return (
    <main className="text-[#E9E9E9] w-full">
      <div className="m-6">
        <p className="font-semibold text-2xl">Request Dashboard</p>
        <p className="text-[#757575] mt-1">
          List of features requested by operators to reject or approve.
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
                    Actions
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
                    <td className="px-6 py-4">{`${Math.floor(request.duration_in_months / 12)} years ${request.duration_in_months % 12 > 0 && `and ${request.duration_in_months % 12} months`}`}</td>
                    <td className="px-6 py-4">{request.created_at}</td>
                    <td className="px-6 py-4">{request.notes}</td>
                    <td className="px-6 py-4 flex justify-center items-center gap-2">
                      <button onClick={(e) => handleUpdate(e, request._id, "rejected", request.title, request.operator.name)} className="bg-white hover:bg-white/90 gap-3 px-6 py-2 flex justify-center items-center font-medium text-[#FF6262] rounded-full">
                        <X />
                        Reject
                      </button>

                      <button onClick={(e) => handleUpdate(e, request._id, "approved", request.title, request.operator.name)} className="bg-white hover:bg-white/90 gap-3 px-6 py-2 flex justify-center items-center font-medium text-[#72E1AC] rounded-full">
                        <Check />
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div> :
          <div className="w-full flex justify-center items-center flex-col opacity-30 min-h-[70%]">
            <BookDashed size={50} />
            <p className="mt-4 text-lg italic">No new requests found.</p>
          </div>
      }
    </main>
  );
}
