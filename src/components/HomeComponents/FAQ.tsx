import { useState } from "react";

interface IFaqRow {
  question: string;
  answer: string;
}

interface Props {
  data: IFaqRow[];
}

export default function FAQ({ data }: Props) {
  const [selected, setSelected] = useState<number>();

  //If already selected FAQ item, then close. Else, set selected to clicked item
  const toggle = (id: number) => {
    console.log(id);
    if (selected == id) {
      return setSelected(undefined);
    }
    return setSelected(id);
  };

  return (
    <>
      <h1 className="m-4 text-5xl font-extrabold  tracking-tight sm:text-[3rem]">
        F.A.Q
      </h1>
      <div className="wrapper m-4 w-full justify-center rounded bg-[#b9c5da] text-left align-middle md:w-[50vw]">
        <div id="accordian">
          {data.map((entry: IFaqRow, id: number) => {
            return (
              <>
                <div id="faq-entry" className="w-full ">
                  <div
                    className={`m-2 border-b-2 ${
                      selected == id
                        ? "border-b-white text-white"
                        : "border-b-[#3a3c61]"
                    } p-4 font-bold hover:cursor-pointer `}
                    onClick={() => toggle(id)}
                  >
                    {entry.question}
                    <span className="float-right">
                      {selected == id ? "-" : "+"}
                    </span>
                  </div>
                  {/* hide if id is not selected. */}
                  <div
                    className={`m-2 overflow-hidden p-3 transition-all duration-150 ease-in-out ${
                      selected === id
                        ? "max-h-screen border-b border-b-[#3a3c61] "
                        : "my-0 max-h-0 py-0"
                    }`}
                  >
                    {entry.answer}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
