import { Check, X } from "lucide-react";

export default function RequestDashboard() {
  return (
    <main className="text-[#E9E9E9] w-full">
      <div className="m-6">
        <p className="font-semibold text-2xl">Request Dashboard</p>
        <p className="text-[#757575] mt-1">
          List of features requested by operators to reject or approve.
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
                Operator
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-[#181C1F] even:bg-[#212529]">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </th>
              <td className="px-6 py-4">Placeholder operator</td>
              <td className="px-6 py-4">02/01/2025</td>
              <td className="px-6 py-4 flex justify-center items-center gap-2">
                <button className="bg-white hover:bg-white/90 gap-3 px-6 py-2 flex justify-center items-center font-medium text-[#FF6262] rounded-full">
                  <X />
                  Reject
                </button>

                <button className="bg-white hover:bg-white/90 gap-3 px-6 py-2 flex justify-center items-center font-medium text-[#72E1AC] rounded-full">
                  <Check />
                  Approve
                </button>
              </td>
            </tr>

            <tr className="odd:bg-[#181C1F] even:bg-[#212529]">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </th>
              <td className="px-6 py-4">Placeholder operator</td>
              <td className="px-6 py-4">02/01/2025</td>
              <td className="px-6 py-4 flex justify-center items-center gap-2">
                <button className="bg-white hover:bg-white/90 gap-3 px-6 py-2 flex justify-center items-center font-medium text-[#FF6262] rounded-full">
                  <X />
                  Reject
                </button>

                <button className="bg-white hover:bg-white/90 gap-3 px-6 py-2 flex justify-center items-center font-medium text-[#72E1AC] rounded-full">
                  <Check />
                  Approve
                </button>
              </td>
            </tr>

            <tr className="odd:bg-[#181C1F] even:bg-[#212529]">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </th>
              <td className="px-6 py-4">Placeholder operator</td>
              <td className="px-6 py-4">02/01/2025</td>
              <td className="px-6 py-4 flex justify-center items-center gap-2">
                <button className="bg-white hover:bg-white/90 gap-3 px-6 py-2 flex justify-center items-center font-medium text-[#FF6262] rounded-full">
                  <X />
                  Reject
                </button>

                <button className="bg-white hover:bg-white/90 gap-3 px-6 py-2 flex justify-center items-center font-medium text-[#72E1AC] rounded-full">
                  <Check />
                  Approve
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
