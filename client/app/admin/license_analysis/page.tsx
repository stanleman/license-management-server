'use client'
import AreaChartAnalysis from '@/app/components/area_chart';
import BarChartAnalysis from '@/app/components/bar_chart';
import PieChartAnalysis from '@/app/components/pie_chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/select';
import { TrendingDown, TrendingUp } from 'lucide-react';

const LicenseAnalysis = () => {

    const areaGraphData = [
        {
            title: "License Registered",
            pct: 125
        },
        {
            title: "License Renewed",
            pct: -125
        },
        {
            title: "License Approved",
            pct: 125
        },
    ]

    return (
        <main className="text-[#e9e9e9] px-7 py-10 w-full">
            <section>
                <p className="font-semibold text-2xl">License Trend Analysis</p>
                <p className="text-[#757575] mt-1">
                    Track the license usage trends and expiration patterns.
                </p>
            </section>
            <section className="mt-8 grid grid-cols-6 gap-8">
                {areaGraphData.map((item, index) => {
                    return (
                        <div className="bg-[#212529] w-full rounded-xl p-6 lg:col-span-2 col-span-6 grid grid-rows-4" key={index}>
                            <div className='row-span-1 flex justify-between items-center'>
                                <div>
                                    <p className="text-[#757575] mt-1">
                                        {item.title}
                                    </p>
                                    <p className="font-semibold text-2xl mt-2">{999}</p>
                                </div>
                                <div className={`${item.pct > 0 ? "text-green-400" : "text-red-400"} flex gap-2`}>
                                    <p>{item.pct > 0 ? "+" + item.pct.toString() : item.pct.toString()}%</p>
                                    {item.pct > 0 ? <TrendingUp /> : <TrendingDown />}
                                </div>
                            </div>
                            <div className='row-span-3 mt-8'>
                                <AreaChartAnalysis trend={item.pct > 0 ? "positive" : "negative"} id={index} />
                            </div>
                        </div>
                    )
                })}
            </section>
            <section className="mt-8 grid grid-cols-6 gap-8 min-h-80">
                <div className="bg-[#212529] w-full rounded-xl lg:col-span-4 md:col-span-3 col-span-6 p-4 grid grid-rows-5">
                    <div className="flex justify-between row-span-1">
                        <p className="text-[#757575] mt-1">
                            License Usage Patterns
                        </p>
                        <Select defaultValue='weekly'>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='row-span-4'>
                        <BarChartAnalysis />
                    </div>
                </div>
                <div className="bg-[#212529] w-full rounded-xl lg:col-span-2 md:col-span-3 col-span-6 relative">
                    <PieChartAnalysis />
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
                        <p className='text-3xl font-semibold'>{999}</p>
                        <p className='text-base'>registrations</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default LicenseAnalysis;