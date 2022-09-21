import React from "react";
import { Link } from "react-router-dom";

function CTA({ sp1, sp2, p, a, cta }) {
  return (
    <div className="bg-indigo-700">
      <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="block">{sp1}</span>
          <span className="block">{sp2}</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-indigo-200">{p}</p>
        {/* <Link
          to={cta}
          className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 sm:w-auto"
        >
          {" "}
          {a}
        </Link> */}
        <a
          href={cta}
          className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 sm:w-auto"
        >
          {a}
        </a>
      </div>
    </div>
  );
}

export default CTA;
