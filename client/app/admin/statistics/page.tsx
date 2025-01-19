'use client'

import { ChartColumnBig, Clock, RefreshCcw, ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";

const Statistics = () => {

    const router = useRouter();

    return (
        <main className="text-[#e9e9e9] px-7 py-10 size-full">
            <section>
                <p className="font-semibold text-2xl">Admin Statistics</p>
                <p className="text-[#757575] mt-1">
                    Overview of statistics and recent actions.
                </p>
            </section>
            <section className="mt-8">
                <div className="bg-[#212529] w-full rounded-xl p-6">
                    <p className="font-semibold text-xl">Quick Statistics</p>
                    <div className="m-4 gap-4 grid grid-cols-4">
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
                    <div className="mt-2 justify-self-end">
                        <a className="text-[#757575] text-sm hover:cursor-pointer hover:underline" onClick={() => router.push('/admin/license_analysis')}>View all statistics</a>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Statistics;