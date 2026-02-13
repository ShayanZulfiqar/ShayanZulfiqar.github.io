"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      name: "Starter",
      icon: Star,
      description: "Perfect for individuals and small projects",
      monthlyPrice: 29,
      annualPrice: 290,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      features: [
        "5 Product Downloads",
        "Basic Support",
        "Community Access",
        "Regular Updates",
        "Documentation",
      ],
      popular: false,
    },
    {
      name: "Professional",
      icon: Zap,
      description: "Best for professionals and growing teams",
      monthlyPrice: 79,
      annualPrice: 790,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      features: [
        "20 Product Downloads",
        "Priority Support",
        "Community Access",
        "Lifetime Updates",
        "Premium Documentation",
        "Early Access to New Products",
        "Commercial License",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      icon: Crown,
      description: "For large teams and organizations",
      monthlyPrice: 199,
      annualPrice: 1990,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      features: [
        "Unlimited Downloads",
        "24/7 Premium Support",
        "Private Community",
        "Lifetime Updates",
        "Custom Development",
        "Dedicated Account Manager",
        "Extended License",
        "Custom Integrations",
      ],
      popular: false,
    },
  ];

  const savings = (monthly: number, annual: number) => {
    const monthlyCost = monthly * 12;
    const saved = monthlyCost - annual;
    const percentage = Math.round((saved / monthlyCost) * 100);
    return percentage;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-purple-600 font-semibold text-sm uppercase tracking-wider mb-3"
          >
            Pricing Plans
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Flexible pricing options to fit your needs and budget
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center items-center gap-4 mb-12"
        >
          <span
            className={`text-lg font-semibold ${
              billingCycle === "monthly" ? "text-gray-900" : "text-gray-400"
            }`}
          >
            Monthly
          </span>
          <motion.button
            onClick={() =>
              setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")
            }
            className={`relative w-16 h-8 rounded-full transition-colors ${
              billingCycle === "annual"
                ? "bg-gradient-to-r from-purple-600 to-pink-600"
                : "bg-gray-300"
            }`}
          >
            <motion.div
              layout
              className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
              animate={{
                x: billingCycle === "annual" ? 32 : 0,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.button>
          <div className="flex items-center gap-2">
            <span
              className={`text-lg font-semibold ${
                billingCycle === "annual" ? "text-gray-900" : "text-gray-400"
              }`}
            >
              Annual
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
              Save up to 20%
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price =
              billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
            const savingsPercent = savings(plan.monthlyPrice, plan.annualPrice);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: plan.popular ? 1.02 : 1.05 }}
                className={`relative ${plan.popular ? "md:scale-105" : ""}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 h-full flex flex-col ${
                    plan.popular
                      ? "border-purple-500"
                      : "border-gray-100 hover:border-purple-200"
                  }`}
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="relative mb-6"
                  >
                    <div
                      className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${plan.color} shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div
                      className={`absolute inset-0 ${plan.bgColor} rounded-xl blur-xl opacity-50`}
                    />
                  </motion.div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ${price}
                      </span>
                      <span className="text-gray-600">
                        /{billingCycle === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                    {billingCycle === "annual" && (
                      <p className="text-sm text-green-600 font-semibold mt-2">
                        Save {savingsPercent}% with annual billing
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 rounded-full font-semibold text-lg mb-8 transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Get Started
                  </motion.button>

                  {/* Features */}
                  <div className="space-y-4 flex-1">
                    {plan.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            All plans include our 30-day money-back guarantee
          </p>
          <p className="text-sm text-gray-500">
            Need a custom plan?{" "}
            <a
              href="/contact"
              className="text-purple-600 font-semibold hover:underline"
            >
              Contact us
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
