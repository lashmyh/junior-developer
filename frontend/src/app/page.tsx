import Image from "next/image";
import Content from "@/components/Content";
import { Data } from "../../utils/interfaces";

async function fetchData(): Promise<Data[]> {
  try {
    const res = await fetch(`${process.env.API_URL}`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }

}


export default async function Home() {

  const data = await fetchData();
  console.log(data);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-[100%] sm:w-[95%] max-w-3xl">
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/logo.png"
            alt="Citizens Advice SORT"
            width={150}
            height={150}
            priority
          />
          <h1 className="text-2xl font-bold mt-4">
            Adviser Guidance Portal
          </h1>
          <h2 className="text-lg font-medium">
            Junior Developer Practical
          </h2>
        </div>
        <Content data={data}  />
      </main>
    </div>
  );
}
