import Head from "next/head";
import {PageLayout} from "~/components/layout";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <PageLayout>
        <div className="bg-base-red h-full w-full">test</div>
      </PageLayout>
    </>
  );
}
