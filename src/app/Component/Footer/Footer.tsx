"use client";
import { basepath } from "@/app/common/constants";
import Link from "next/link";
import React from "react";
import { useState } from "react";

type FooterProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Footer: React.FC<FooterProps> = (props) => {
  const [data, setData] = useState<any[]>([]);

  return (
    <>
      <footer className="w-full grid grid-cols-1 justify-end items-center md:grid-cols-3 gap-8 md:gap-6 p-10 bg-black text-white">
        <section className="flex flex-col items-start md:items-start justify-center space-y-4">
          <h4 className="text-lg font-semibold text-blue-400">Reach us</h4>
          <p className="text-base">
            Meta Cognitive Technologies Pvt Ltd <br />
            #714A, Spencer plaza phase 2,
            <br /> 7th floor, Anna Road,
            <br /> Chennai - 600002.
          </p>
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="flex items-center gap-2">
              <img
                alt="call icon"
                className="h-4 w-4"
                src={`${basepath}/footer_call.svg`}
              />
              <p className="text-sm">+91 8310165136</p>
            </div>
            <div className="flex items-center gap-2">
              <img
                alt="email icon"
                className="h-4 w-4"
                src={`${basepath}/footer_email.svg`}
              />
              <a
                href="mailto:support@metacognitive.co.in "
                className="text-sm"
              >
                support@metacognitive.co.in 
              </a>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-start md:items-center space-y-4">
          <h4 className="text-lg font-semibold text-green-500">Follow us</h4>
          <div className="flex flex-wrap gap-4">
            <Link
              href="https://twitter.com/meta-cognitive"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="twitter icon"
                className="h-6 w-6"
                src={`${basepath}/Icon fa-brands-x-twitter.svg`}
              />
            </Link>
            <Link
              href="https://www.instagram.com/metacognitivecertifications/?igshid=NzZlODBkYWE4Ng%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="instagram icon"
                className="h-6 w-6"
                src={`${basepath}/Icon akar-instagram-fill.svg`}
              />
            </Link>
        
            <Link
              href="https://www.linkedin.com/company/meta-cognitive/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="linkedIn icon"
                className="h-6 w-6"
                src={`${basepath}/Icon ion-social-linkedin-outline.svg`}
              />
            </Link>
            <Link
              href="https://www.facebook.com/people/Meta-Cognitive/61550610522824/?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="facebook icon"
                className="h-6 w-6"
                src={`${basepath}/Icon-facebook.svg`}
              />
            </Link>
          </div>
        </section>

        <section className="flex flex-col items-start md:items-center space-y-4">
          <h4 className="text-lg font-semibold text-purple-600">Company</h4>
          <div className="flex flex-col space-y-2">

            <Link href="/Privacy" className="text-sm ">
              Privacy Policy
            </Link>
            <Link href="/Refund" className="text-sm ">
              Refund Policy
            </Link>
          </div>
        </section>
      </footer>

      <div className="text-center py-0 bg-black text-white text-sm">
        © 2025 metacognitive.co.in
      </div>
    </>
  );
};

export default Footer;
