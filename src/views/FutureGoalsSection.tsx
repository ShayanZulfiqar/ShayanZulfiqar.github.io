"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Users, Globe2, TrendingUp, Zap, Award } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchFutureGoals } from "@/store/slices/landingSlice";

const getIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Globe2: Globe2,
    Users: Users,
    Zap: Zap,
    TrendingUp: TrendingUp,
    Award: Award,
    Target: Target,
  };
  return icons[iconName] || Target;
};

const FutureGoalsSection = () => {
  const dispatch = useAppDispatch();
  const { data: goals, loading } = useAppSelector((state) => state.landing.futureGoals);

  React.useEffect(() => {
    dispatch(fetchFutureGoals());
  }, [dispatch]);

  if (loading || goals.length === 0) {
    return (
      <section className="py-24 bg-gray-50 flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-[#4F11C2] border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#4F11C2]/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/10 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4F11C2]/10 rounded-full filter blur-3xl opacity-30" />

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
            className="inline-block text-[#4F11C2] font-semibold text-sm uppercase tracking-wider mb-3"
          >
            Strategic Goals
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] bg-clip-text text-transparent">
              Future Milestones
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ambitious goals that will shape our journey toward becoming a global
            leader in digital innovation
          </p>
        </motion.div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <motion.div
                key={goal._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full relative overflow-hidden">
                  {/* Target Year Badge */}
                  <div className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-white rounded-full text-sm font-bold shadow-lg">
                    {goal.target}
                  </div>

                  {/* Background gradient on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute inset-0 bg-gradient-to-br ${goal.color} opacity-5 transition-opacity`}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="relative mb-6"
                  >
                    <div
                      className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${goal.color} shadow-lg`}
                    >
                      {(() => {
                        const Icon = getIcon(goal.icon);
                        return <Icon className="w-10 h-10 text-white" />;
                      })()}
                    </div>
                    <div
                      className={`absolute inset-0 ${goal.bgColor} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity`}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 relative">
                    {goal.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 relative">
                    {goal.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 relative">
                    {goal.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className={`text-center p-3 rounded-xl bg-gradient-to-br ${goal.color} bg-opacity-10`}
                      >
                        <p className="text-2xl font-bold bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] bg-clip-text text-transparent">
                          {metric.value}
                        </p>
                        <p className="text-xs text-gray-600 font-medium">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Progress Indicator */}
                  <div className="mt-6 relative">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.random() * 40 + 30}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        className={`h-full bg-gradient-to-r ${goal.color} rounded-full`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      In Progress
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-[#4F11C2]/10 to-[#8B31FF]/10 rounded-3xl p-10 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Journey to 2030
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Every milestone brings us closer to our ultimate vision of empowering
            businesses worldwide with transformative digital solutions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["2026", "2027", "2028", "2029", "2030"].map((year, index) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#4F11C2]"
              >
                <span className="font-bold text-gray-900">{year}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureGoalsSection;
