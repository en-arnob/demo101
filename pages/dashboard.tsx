import React from "react";
import Link from "next/link";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [data, setData] = useState<any>({});
  useEffect(() => {
    const userData: any = JSON.parse(router.query.data as string);
    setData(userData);
    console.log(userData);
  }, [router.query]);
  return (
    <div className="flex h-screen bg-gray-200 dark:bg-gray-900">
      <aside className="w-64 bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-700">
        <div className="h-16 flex items-center justify-center border-b-2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Welcome, {data?.name}
          </h2>
        </div>
        <ul className="">
          <li className="flex items-center p-6 hover:bg-gray-100 dark:hover:bg-gray-700 selected bg-gray-200">
            <Link className="flex items-center space-x-4" href="#">
              <span className="text-sm font-medium">🗒️ Dashboard</span>
            </Link>
          </li>
          {data?.permissions?.map((permission: any) => (
            <li
              className="flex items-center p-6 hover:bg-gray-100 dark:hover:bg-gray-700"
              key={permission.id}
            >
              <Link className="flex items-center space-x-4" href="#">
                <span className="text-sm font-medium">
                  ⚙️ {permission?.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <Card className="bg-yellow-200 rounded-md">
            <CardHeader className="pb-2">
              <CardTitle>Some Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">12345</span>
            </CardContent>
          </Card>
          <Card className="bg-red-200">
            <CardHeader className="pb-2">
              <CardTitle>Some Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">12345</span>
            </CardContent>
          </Card>
          <Card className="bg-blue-200">
            <CardHeader className="pb-2">
              <CardTitle>Some Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">12345</span>
            </CardContent>
          </Card>
          <Card className="bg-green-200">
            <CardHeader className="pb-2">
              <CardTitle>Some Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">12345</span>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
