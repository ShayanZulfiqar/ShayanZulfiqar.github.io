"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    bio: "Visionary leader with 15+ years in tech innovation",
    image: "from-blue-500 to-cyan-500",
    initials: "JD",
  },
  {
    name: "Sarah Williams",
    role: "Chief Technology Officer",
    bio: "Tech enthusiast specializing in scalable solutions",
    image: "from-purple-500 to-pink-500",
    initials: "SW",
  },
  {
    name: "Michael Chen",
    role: "Head of Design",
    bio: "Award-winning designer creating beautiful experiences",
    image: "from-green-500 to-teal-500",
    initials: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    bio: "Strategic marketer driving growth and engagement",
    image: "from-orange-500 to-red-500",
    initials: "ER",
  },
  {
    name: "David Kim",
    role: "Lead Developer",
    bio: "Full-stack expert building robust applications",
    image: "from-indigo-500 to-purple-500",
    initials: "DK",
  },
  {
    name: "Lisa Anderson",
    role: "Project Manager",
    bio: "Organized leader ensuring seamless delivery",
    image: "from-pink-500 to-rose-500",
    initials: "LA",
  },
  {
    name: "James Wilson",
    role: "Head of Sales",
    bio: "Relationship builder connecting clients with solutions",
    image: "from-cyan-500 to-blue-500",
    initials: "JW",
  },
  {
    name: "Sophie Turner",
    role: "UX Researcher",
    bio: "User advocate crafting intuitive experiences",
    image: "from-yellow-500 to-orange-500",
    initials: "ST",
  },
];

const TeamSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, gray 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-purple-600 font-semibold text-sm uppercase tracking-wider mb-3"
          >
            Meet The Team
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            The Minds Behind{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Innovation
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Talented individuals united by passion, creativity, and commitment to
            excellence
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member._id || member.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Avatar */}
                <div className="relative aspect-square overflow-hidden">
                  <motion.div
                    className={`w-full h-full bg-gradient-to-br ${member.image} flex items-center justify-center relative`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)`,
                      }}
                    />
                    <span className="text-white text-6xl font-bold relative z-10">
                      {member.initials}
                    </span>
                  </motion.div>

                  {/* Social Links Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-6 gap-3"
                  >
                    {[Linkedin, Twitter, Mail].map((Icon, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-lg"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-semibold text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 max-w-3xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Want to Join Our Amazing Team?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              We&apos;re always looking for talented individuals who share our passion
              for innovation and excellence
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Open Positions
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
