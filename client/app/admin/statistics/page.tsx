'use client'

import { ChartColumnBig, Clock, RefreshCcw, ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";

const Statistics = () => {

    const router = useRouter();

    return (
        <main className="text-[#e9e9e9] px-7 py-10 w-full">
            <section>
                <p className="font-semibold text-2xl">Admin Statistics</p>
                <p className="text-[#757575] mt-1">
                    Overview of statistics and recent actions.
                </p>
            </section>
            <section className="mt-8">
                <div className="bg-[#212529] w-full rounded-xl p-6">
                    <p className="font-semibold text-xl">Quick Statistics</p>
                    <div className="mt-6 gap-4 grid grid-cols-4">
                        <div className="bg-[#181C1F] p-5 rounded-lg lg:col-span-1 md:col-span-2 col-span-4">
                            <ChartColumnBig className="text-[#BCE29E]" />
                            <p className="text-sm mt-2"><span className="text-xl font-semibold">999</span> Licenses Registered</p>
                            <p className="text-xs text-[#BCE29E]">{"+999"}% from last month</p>
                        </div>
                        <div className="bg-[#181C1F] p-5 rounded-lg lg:col-span-1 md:col-span-2 col-span-4">
                            <ShieldX className="text-[#de6363]" />
                            <p className="text-sm mt-2"><span className="text-xl font-semibold">999</span> Licenses Expired</p>
                            <p className="text-xs text-[#de6363]">{"+999"}% from last month</p>
                        </div>
                        <div className="bg-[#181C1F] p-5 rounded-lg lg:col-span-1 md:col-span-2 col-span-4">
                            <RefreshCcw className="text-[#A9DFD8]" />
                            <p className="text-sm mt-2"><span className="text-xl font-semibold">999</span> Licenses Approved</p>
                            <p className="text-xs text-[#A9DFD8]">{"+999"}% from last month</p>
                        </div>
                        <div className="bg-[#181C1F] p-5 rounded-lg lg:col-span-1 md:col-span-2 col-span-4">
                            <Clock className="text-[#20AEF3]" />
                            <p className="text-sm mt-2"><span className="text-xl font-semibold">999</span> Pending Requests</p>
                            <p className="text-xs text-[#20AEF3]">{"+999"}% from last month</p>
                        </div>
                    </div>
                    <div className="mt-4 justify-self-end">
                        <a className="text-[#757575] text-sm hover:cursor-pointer hover:underline" onClick={() => router.push('/admin/license_analysis')}>View all statistics</a>
                    </div>
                </div>
            </section>
            <section className="mt-8">
                <div className="bg-[#212529] w-full rounded-xl py-6">
                    <p className="font-semibold text-xl ms-6">Activity Feed</p>
                    <div className="w-full overflow-x-auto mt-4">
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
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
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
                                    <td className="px-6 py-4">
                                        <button className="bg-[#E8B931] hover:bg-[#E8B931]/90 gap-3 w-32 py-2 flex justify-center items-center font-medium text-white rounded-full">
                                            Pending
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
                                    <td className="px-6 py-4">
                                        <button className="bg-[#14AE5C] hover:bg-[#14AE5C]/90 gap-3 w-32 py-2 flex justify-center items-center font-medium text-white rounded-full">
                                            Approved
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
                                    <td className="px-6 py-4">
                                        <button className="bg-[#4247E0] hover:bg-[#4247E0]/90 gap-3 w-32 py-2 flex justify-center items-center font-medium text-white rounded-full">
                                            Issued
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 justify-self-end me-6">
                        <a className="text-[#757575] text-sm hover:cursor-pointer hover:underline" onClick={() => router.push('/admin/activities_list')}>View all recent actions</a>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Statistics;