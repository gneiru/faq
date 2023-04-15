import { type NextPage } from "next";
import Head from "next/head";

import { PageLayout } from "~/components/Layout";
import { LoadingSpinner } from "~/components/Loading";
import { FAQCard, FAQForm } from "~/components/faq";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "~/ui/dialog";
import { Input } from "~/ui/input";
import { api } from "~/utils/api";  

const FAQPage: NextPage = () => {
  api.faq.getAll.useQuery();
  return (
    <>
      <Head>
        <title>FAQ</title>
        <meta name="description" content="Frequently Asked Questions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <Dialog>
          <DialogTrigger asChild>
            <Input
              className="w-1/3 opacity-70"
              value="✍🏻 What is my tech stack?"
            />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Post a FAQ</DialogTitle>
            <DialogDescription>
              FAQ stands for Frequently Asked Question
            </DialogDescription>
            <FAQForm />
          </DialogContent>
        </Dialog>
        <FAQPosts />
      </PageLayout>
    </>
  );
};

function FAQPosts() {
  const { data, isLoading } = api.faq.getAll.useQuery();

  if (isLoading)
    return (
      <div className="flex grow">
        <LoadingSpinner />
      </div>
    );

  if (!data) return <div>Nothing to display</div>;

  return (
    <div className="space-y-3">
      {data.map((faq) => (
        <FAQCard faq={faq} key={faq.id} />
      ))}
    </div>
  );
}

export default FAQPage;
