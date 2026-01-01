import { basepath } from "@/app/common/constants";
import React from "react";
import { Parallax } from "react-scroll-parallax";

const Journey: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-" >
      <div className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className=" relative  overflow-hidden rounded-lg">
            <Parallax translateY={[-20, 20]} className="h-full ">
            <img
                  src={`${basepath}/images/journey.jpg`}
                  alt="Mission"
                  className="w-full h-full object-cover opacity-90"
                />
            </Parallax>
          </div>

          <div className="text-white space-y-6 ">
            <div className="space-y-2 animate-fade-in">
              {/* <h2 className="text-2xl md:text-3xl font-bold">
                Welcome to Meta Cognitive
              </h2> */}
              <p className="text-3xl md:text-4xl text-blue-400 font-bold">
                Our Journey
              </p>
                           <p className="text-md  leading-relaxed text-justify">
                           <span className="font-bold">Meta Cognitive Technologies</span>, a subsidiary of <span className="font-bold">Global Knowledge</span>, is a globally recognized software company with over two decades of experience in delivering high-quality training and industry-recognized certifications.
                            </p>
                           <p className="text-md  leading-relaxed text-justify">
                            More than just a software developer, MCT is committed to bridging the technology skills gap by offering comprehensive, hands-on, and future-focused learning programs. Our mission is to empower individuals and organizations to thrive in an ever-evolving digital landscape.
We have built a <span className="font-semibold">robust ecosystem of learning</span>, partnering with leading technology vendors and continuously aligning our curriculum with emerging market trends to ensure relevance and impact.
</p>
                           <p className="text-md  leading-relaxed text-justify">
Since our inception, MCT has evolved in step with the rapid pace of technological advancement — from the early days of desktop applications to today’s era of <span className="font-semibold">Cloud Computing, Artificial Intelligence, Quantum Computing and Cybersecurity.</span>
Our enduring success reflects our ability to anticipate industry needs and deliver transformative learning experiences that go beyond theory. At MCT, we don’t just teach technology — we teach how to apply technology to solve real-world problems.
             </p>
              {/* <p className="text-md  leading-relaxed text-justify">
              At Meta Cognitive Technologies, we are passionate about connecting the power of Artificial Intelligence to revolutionize the way people learn and grow. As a cutting-edge AI firm, we specialize in developing innovative solutions that transform the educational landscape. Our team of expert data scientists, machine learning engineers, and educational professionals work tirelessly to create AI-driven tools and platforms that personalize learning experiences, streamline educational processes, and empower learners of all ages to reach their full potential.               </p>
              <p className="text-md  leading-relaxed text-justify">
              We believe that education is the key to unlocking a brighter future, and we are committed to making high-quality, AI-powered learning accessible to everyone. Through our intuitive interfaces, engaging content, and seamless integration with existing educational systems, we strive to create a world where every individual can learn, grow, and thrive.               </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
