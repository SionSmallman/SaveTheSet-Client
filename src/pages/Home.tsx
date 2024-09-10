import Layout from "../components/LayoutComponents/Layout";
import FAQ from "../components/HomeComponents/FAQ";
import questions from "../assets/faq.json";
import RecentlySaved from "../components/HomeComponents/RecentlySaved";
import StepCards from "../components/HomeComponents/StepCards";
import Hero from "../components/HomeComponents/Hero";

export default function Home() {
  // Get FAQ questions from JSON file
  const questionList = questions.questions;

  return (
    <Layout>
      <Hero />
      <div className="flex w-screen flex-col items-center px-10 text-center">
        <div className="my-20">
          <StepCards />
        </div>
        <div className="w-screen bg-[#273955] md:h-[450px]">
          <RecentlySaved />
        </div>
        <FAQ data={questionList} />
      </div>
    </Layout>
  );
}
