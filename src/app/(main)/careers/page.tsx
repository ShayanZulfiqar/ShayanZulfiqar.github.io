"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Code,
  Users,
  TrendingUp,
  X,
  Upload,
  CheckCircle,
  Mail,
  Phone,
  User,
  Building,
  DollarSign,
  Globe,
  Github,
  Linkedin,
  FileText,
  Calendar,
} from "lucide-react";
import AlertDialog from "@/utils/Alert";
import { createWithMultipart, post } from "@/services/ApiService";
import {
  CREATE_DEVELOPER,
  CREATE_INVESTOR,
  CREATE_JOIN_TEAM,
  CREATE_PARTNER,
} from "@/services/ApiRoutes";

type RoleType = "investor" | "developer" | "team" | "partner" | null;

const CareersPage = () => {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roles = [
    {
      id: "investor" as RoleType,
      icon: TrendingUp,
      title: "Join as Investor",
      description:
        "Partner with us to drive innovation and growth in the digital economy",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: "developer" as RoleType,
      icon: Code,
      title: "Join as Developer",
      description:
        "Build cutting-edge solutions with the latest technologies and frameworks",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "team" as RoleType,
      icon: Users,
      title: "Join the Team",
      description:
        "Be part of our creative team in design, marketing, or operations",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: "partner" as RoleType,
      icon: Briefcase,
      title: "Become a Partner",
      description:
        "Collaborate with us to expand our reach and create mutual value",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ];

  const closeModal = () => {
    setSelectedRole(null);
    setIsSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-purple-200 rounded-full px-6 py-2 mb-8"
          >
            <Briefcase className="w-4 h-4 text-purple-600" />
            <span className="text-purple-900 text-sm font-medium">
              Careers at HubMicro Pro
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Join Our{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Growing Team
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Whether you're an investor, developer, creative professional, or
            business partner, we have exciting opportunities for you to grow
            with us.
          </motion.p>
        </div>
      </section>

      {/* Role Cards Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`${role.bgColor} border-2 ${role.borderColor} rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl group`}
                onClick={() => setSelectedRole(role.id)}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${role.color} mb-6 shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {role.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {role.description}
                </p>

                <motion.button
                  whileHover={{ x: 5 }}
                  className={`text-sm font-semibold bg-gradient-to-r ${role.color} bg-clip-text text-transparent flex items-center gap-2 group-hover:gap-3 transition-all`}
                >
                  Apply Now
                  <span className="text-lg">→</span>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Modal for Application Forms */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div
                className={`bg-gradient-to-r ${roles.find((r) => r.id === selectedRole)?.color
                  } p-8 text-white relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      {roles.find((r) => r.id === selectedRole)?.title}
                    </h2>
                    <p className="text-white/90">
                      Fill out the application form below
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content - Form */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-160px)]">
                {isSubmitted ? (
                  <SuccessMessage onClose={closeModal} />
                ) : (
                  <ApplicationForm
                    roleType={selectedRole}
                    onSubmit={() => setIsSubmitted(true)}
                    roleColor={
                      roles.find((r) => r.id === selectedRole)?.color || ""
                    }
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

// Success Message Component
const SuccessMessage = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="inline-flex p-6 rounded-full bg-green-100 mb-6"
      >
        <CheckCircle className="w-16 h-16 text-green-600" />
      </motion.div>

      <h3 className="text-3xl font-bold text-gray-900 mb-4">
        Application Submitted!
      </h3>

      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        Thank you for your interest in joining HubMicro Pro. Our team will
        review your application and get back to you within 3-5 business days.
      </p>

      <button
        onClick={onClose}
        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
      >
        Close
      </button>
    </motion.div>
  );
};

// Application Form Component
const ApplicationForm = ({
  roleType,
  onSubmit,
  roleColor,
}: {
  roleType: RoleType;
  onSubmit: () => void;
  roleColor: string;
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    yearsOfExperience: "",
    linkedInProfile: "",
    githubProfile: "",
    portfolioWebsite: "",
    investmentInterest: "",
    companyOrganization: "",
    positionOfInterest: "",
    primaryExpertise: "",
    partnershipType: "",
    companyName: "",
    companyWebsite: "",
    additionalInformation: "",
  });

  const [resume, setResume] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    AlertDialog(
      "Confirm Submission",
      "Please review your information before submitting. Are you sure you want to proceed?",
      "question",
      0,
      true,
      true,
      "Submit",
      "Cancel",
      async () => {
        try {
          if (roleType === "developer") {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
              if (formData[key as keyof typeof formData]) {
                data.append(key, formData[key as keyof typeof formData]);
              }
            });
            if (formData.resume) {
              // Should have been handled by object iteration but resume is separate state
            }
            // Logic above constructs FormData 'data'
            if (resume) {
              data.append("resume", resume);
            }
            await createWithMultipart(CREATE_DEVELOPER, data);
          } else if (roleType === "investor") {
            await post(CREATE_INVESTOR, formData);
          } else if (roleType === "team") {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
              if (formData[key as keyof typeof formData]) {
                data.append(key, formData[key as keyof typeof formData]);
              }
            });
            if (resume) {
              data.append("resume", resume);
            }
            await createWithMultipart(CREATE_JOIN_TEAM, data);
          } else if (roleType === "partner") {
            await post(CREATE_PARTNER, formData);
          }

          AlertDialog(
            "Success",
            "Your application has been submitted successfully!",
            "success",
            2000
          );
          onSubmit();
        } catch (error) {
          console.error(error);
          AlertDialog(
            "Error",
            "Something went wrong. Please try again later.",
            "error",
            2000
          );
        }
      },
      () => { }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Common Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number *
          </label>
          <input
            type="tel"
            name="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Globe className="w-4 h-4 inline mr-2" />
            Location *
          </label>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="City, Country"
          />
        </div>
      </div>

      {/* Role-Specific Fields */}
      {roleType === "investor" && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Building className="w-4 h-4 inline mr-2" />
                Company/Organization
              </label>
              <input
                type="text"
                name="companyOrganization"
                value={formData.companyOrganization}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Investment Firm Name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Investment Interest *
              </label>
              <select
                name="investmentInterest"
                required
                value={formData.investmentInterest}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="">Select Range</option>
                <option value="Seed ($10k - $50k)">Seed ($10k - $50k)</option>
                <option value="Early Stage ($50k - $200k)">
                  Early Stage ($50k - $200k)
                </option>
                <option value="Growth Stage ($200k+)">
                  Growth Stage ($200k+)
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Linkedin className="w-4 h-4 inline mr-2" />
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="linkedInProfile"
              value={formData.linkedInProfile}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </>
      )}

      {roleType === "developer" && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Years of Experience *
              </label>
              <select
                name="yearsOfExperience"
                required
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="">Select Experience</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Code className="w-4 h-4 inline mr-2" />
                Primary Expertise *
              </label>
              <select
                name="primaryExpertise"
                required
                value={formData.primaryExpertise}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="">Select Expertise</option>
                <option value="Frontend">Frontend Development</option>
                <option value="Backend">Backend Development</option>
                <option value="Full Stack">Full Stack Development</option>
                <option value="Mobile">Mobile Development</option>
                <option value="DevOps">DevOps/Cloud</option>
                <option value="AI/ML">AI/ML Engineering</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Github className="w-4 h-4 inline mr-2" />
                GitHub Profile
              </label>
              <input
                type="url"
                name="githubProfile"
                value={formData.githubProfile}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="https://github.com/yourusername"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Portfolio Website
              </label>
              <input
                type="url"
                name="portfolioWebsite"
                value={formData.portfolioWebsite}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Upload Resume/CV *
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume-upload"
                required
              />
              <label
                htmlFor="resume-upload"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">
                  {fileName || "Click to upload (PDF, DOC, DOCX)"}
                </span>
              </label>
            </div>
          </div>
        </>
      )}

      {roleType === "team" && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Position of Interest *
              </label>
              <select
                name="positionOfInterest"
                required
                value={formData.positionOfInterest}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="">Select Position</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Graphic Designer">Graphic Designer</option>
                <option value="Marketing Specialist">Marketing Specialist</option>
                <option value="Content Creator">Content Creator</option>
                <option value="Sales Executive">Sales Executive</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Operations Manager">Operations Manager</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Years of Experience *
              </label>
              <select
                name="yearsOfExperience"
                required
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="">Select Experience</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Linkedin className="w-4 h-4 inline mr-2" />
                LinkedIn Profile
              </label>
              <input
                type="url"
                name="linkedInProfile"
                value={formData.linkedInProfile}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Portfolio Website
              </label>
              <input
                type="url"
                name="portfolioWebsite"
                value={formData.portfolioWebsite}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Upload Resume/CV *
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume-upload"
                required
              />
              <label
                htmlFor="resume-upload"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">
                  {fileName || "Click to upload (PDF, DOC, DOCX)"}
                </span>
              </label>
            </div>
          </div>
        </>
      )}

      {roleType === "partner" && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Building className="w-4 h-4 inline mr-2" />
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Your Company Name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Partnership Type *
              </label>
              <select
                name="partnershipType"
                required
                value={formData.partnershipType}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="">Select Type</option>
                <option value="Reseller">Reseller Partnership</option>
                <option value="Technology">Technology Partnership</option>
                <option value="Strategic Alliance">Strategic Alliance</option>
                <option value="Affiliate Program">Affiliate Program</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Company Website
              </label>
              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="https://yourcompany.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Linkedin className="w-4 h-4 inline mr-2" />
                LinkedIn Profile
              </label>
              <input
                type="url"
                name="linkedInProfile"
                value={formData.linkedInProfile}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
          </div>
        </>
      )}

      {/* Message Field (Common for all) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Additional Information *
        </label>
        <textarea
          name="additionalInformation"
          required
          value={formData.additionalInformation}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
          placeholder={
            roleType === "investor"
              ? "Tell us about your investment philosophy and why you're interested in HubMicro Pro..."
              : roleType === "developer"
                ? "Tell us about your technical skills, projects you've worked on, and why you want to join our team..."
                : roleType === "team"
                  ? "Tell us about your skills, achievements, and why you'd be a great fit for our team..."
                  : "Tell us about your company, partnership goals, and how we can create mutual value..."
          }
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 px-8 py-4 bg-gradient-to-r ${roleColor} text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow`}
        >
          Submit Application
        </motion.button>
      </div>
    </form>
  );
};

export default CareersPage;
