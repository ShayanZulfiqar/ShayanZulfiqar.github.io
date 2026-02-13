export interface DeleteResponse {
    success: boolean;
    message: string;
}

// Hero Section
export interface HeroSection {
    _id?: string;
    id?: string;
    title: string;
    highlight: string;
    subtitle: string;
    gradient: string;
    bgGradient: string;
    icon?: string;
    badge: string;
    badgeColor: string;
    createdAt?: string;
    updatedAt?: string;
}

// About Contact
export interface Contact {
    text: string;
    href: string;
}

export interface CtaButton {
    label: string;
    href: string;
}

export interface AboutContact {
    _id?: string;
    id?: string;
    mainTitle: string;
    subtitle: string;
    contacts: Contact[];
    ctaButtons: CtaButton[];
    createdAt?: string;
    updatedAt?: string;
}

// Client Brand
export interface ClientBrand {
    id?: string;
    _id?: string;
    name: string;
    logo: string;
    gradient: string;
    industry: string;
    createdAt?: string;
    updatedAt?: string;
}

// Client Stats
export interface ClientStat {
    _id?: string;
    id?: string;
    value: string;
    label: string;
    createdAt?: string;
    updatedAt?: string;
}

// Contact Hero
export interface ContactItem {
    title: string;
    value: string;
    icon: string;
    color: string;
}

export interface ContactHero {
    _id?: string;
    id?: string;
    badgeText: string;
    mainTitle: string;
    subtitle: string;
    contacts: ContactItem[];
    createdAt?: string;
    updatedAt?: string;
}

// Contact Submission
export interface ContactSubmission {
    _id?: string;
    id?: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service: string;
    message: string;
    createdAt?: string;
    updatedAt?: string;
}

// Core Values
export interface CoreValue {
    _id?: string;
    title: string;
    description: string;
    color: string;
    bgColor: string;
    createdAt?: string;
    updatedAt?: string;
}

// Developer
export interface Developer {
    _id?: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    location: string;
    yearsOfExperience: string;
    primaryExpertise: string;
    githubProfile?: string;
    portfolioWebsite?: string;
    linkedInProfile?: string;
    additionalInformation?: string;
    resume: string;
    createdAt?: string;
    updatedAt?: string;
}

// Future Goals
export interface FutureGoalMetric {
    label: string;
    value: string;
}

export interface FutureGoal {
    _id?: string;
    id?: string;
    icon: string;
    title: string;
    description: string;
    target: string;
    color: string;
    bgColor: string;
    metrics: FutureGoalMetric[];
    createdAt?: string;
    updatedAt?: string;
}

// General Settings
export interface GeneralSettings {
    _id?: string;
    headerLogo?: string;
    footerLogo?: string;
    email: string;
    phoneNumber: string[];
    location: string;
    ourLocation: string;
    createdAt?: string;
    updatedAt?: string;
}

// Got Questions
export interface GotQuestion {
    _id?: string;
    id?: string;
    question: string;
    answer: string;
    createdAt?: string;
    updatedAt?: string;
}

// Innovation Roadmap
export interface InnovationRoadmapItem {
    _id?: string;
    id?: string;
    phase: string;
    year: string;
    title: string;
    icon: string;
    color: string;
    initiatives: string[];
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

// Investor
export interface Investor {
    _id?: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    location: string;
    companyOrganization?: string;
    investmentInterest: string;
    linkedInProfile?: string;
    additionalInformation?: string;
    createdAt?: string;
    updatedAt?: string;
}

// Join Team
export interface JoinTeam {
    _id?: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    location: string;
    positionOfInterest: string;
    yearsOfExperience: string;
    linkedInProfile?: string;
    portfolioWebsite?: string;
    additionalInformation?: string;
    resume: string;
    createdAt?: string;
    updatedAt?: string;
}

// Newsletter
export interface Subscriber {
    _id?: string;
    id?: string;
    email: string;
    subscribedAt: string;
}

export interface NewsletterResponse {
    success: boolean;
    subscribers: Subscriber[];
}

// Our Journey
export interface FloatingStat {
    icon: string;
    iconBg: string;
    iconColor: string;
    title: string;
    subtitle: string;
}

export interface VisualSection {
    visualIcon: string;
    visualYears: string;
    visualSubtitle: string;
    floatingStats: FloatingStat[];
}

export interface QuoteBox {
    quoteText: string;
    quoteAuthor: string;
    quoteDesignation: string;
    quoteGradient: string;
    quoteBorderColor: string;
}

export interface Milestone {
    year: string;
    title: string;
    description: string;
    icon: string;
    colorGradient: string;
}

export interface OurJourney {
    _id?: string;
    sectionTitle: string;
    mainTitle: string;
    mainTitleGradient: string;
    subtitle: string;
    storyParagraphs: string[];
    quoteBox: QuoteBox;
    visualSection: VisualSection;
    milestones: Milestone[];
    createdAt?: string;
    updatedAt?: string;
}

// Partner
export interface Partner {
    _id?: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    location: string;
    companyName: string;
    partnershipType: string;
    companyWebsite?: string;
    linkedInProfile?: string;
    additionalInformation?: string;
    createdAt?: string;
    updatedAt?: string;
}

// Project
export interface PopulatedService {
    _id: string;
    icon: string;
    title: string;
}

export interface Project {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    tags: string[];
    images: string[];
    imageUrls?: string[];
    liveUrl?: string;
    serviceId?: string | PopulatedService;
    createdAt?: string;
    updatedAt?: string;
}

// Review
export interface Review {
    _id?: string;
    id?: string;
    product: string | { _id: string; title: string; image: string };
    user: string | { _id: string; username: string; email: string; avatar?: string };
    rating: number;
    title: string;
    comment: string;
    images?: string[];
    isVerifiedPurchase: boolean;
    helpfulCount: number;
    reportCount: number;
    isApproved: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// Service Review
export interface ServiceReview {
    _id?: string;
    id?: string;
    name: string;
    role: string;
    image: string;
    rating: number;
    text: string;
    createdAt?: string;
    updatedAt?: string;
}

// Service
export interface Service {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    icon: string;
    createdAt?: string;
    updatedAt?: string;
}

// Sustainability Commitment
export interface SustainabilityMetric {
    label: string;
    value: string;
}

export interface SustainabilityCommitment {
    _id?: string;
    id?: string;
    icon: string;
    title: string;
    description: string;
    target: string;
    progress: number;
    color: string;
    metrics: SustainabilityMetric[];
    createdAt?: string;
    updatedAt?: string;
}

// Sustainability Item (Service)
// Note: This seems redundant or similar to Commitment, but kept as per service file
export interface SustainabilityItem {
    _id?: string;
    id?: string;
    icon: string;
    title: string;
    description: string;
    target: string;
    progress: number;
    color: string;
    metrics: SustainabilityMetric[];
    createdAt?: string;
    updatedAt?: string;
}

// Testimonial
export interface Testimonial {
    _id?: string;
    id?: string;
    name: string;
    role: string;
    company?: string;
    project?: string;
    result?: string;
    image: string;
    imageUrl?: string;
    rating: number;
    text: string;
    createdAt?: string;
    updatedAt?: string;
}

// Video Testimonial
export interface VideoTestimonial {
    _id?: string;
    id?: string;
    name: string;
    role: string;
    thumbnail?: string;
    duration?: string;
    rating: number;
    title: string;
    videoUrl: string;
    createdAt?: string;
    updatedAt?: string;
}

// Why Choose Us
export interface WhyChooseUsItem {
    _id?: string;
    id?: string;
    icon: string;
    title: string;
    description: string;
    color: string;
    bgColor: string;
    delay: number;
    createdAt?: string;
    updatedAt?: string;
}
