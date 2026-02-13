import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    GET_HERO_SECTIONS, CREATE_HERO_SECTION, UPDATE_HERO_SECTION, DELETE_HERO_SECTION,
    GET_ABOUT_CONTACTS, CREATE_ABOUT_CONTACT, UPDATE_ABOUT_CONTACT, DELETE_ABOUT_CONTACT,
    GET_CLIENT_BRANDS, CREATE_CLIENT_BRAND, UPDATE_CLIENT_BRAND, DELETE_CLIENT_BRAND,
    GET_CLIENT_STATS, CREATE_CLIENT_STAT, UPDATE_CLIENT_STAT, DELETE_CLIENT_STAT,
    GET_CONTACT_HEROES, CREATE_CONTACT_HERO, UPDATE_CONTACT_HERO, DELETE_CONTACT_HERO,
    GET_CONTACT_US_SUBMISSIONS, CREATE_CONTACT_US, UPDATE_CONTACT_US, DELETE_CONTACT_US,
    GET_CORE_VALUES, CREATE_CORE_VALUE, UPDATE_CORE_VALUE, DELETE_CORE_VALUE,
    GET_DEVELOPERS, CREATE_DEVELOPER, DELETE_DEVELOPER,
    GET_FUTURE_GOALS, CREATE_FUTURE_GOAL, UPDATE_FUTURE_GOAL, DELETE_FUTURE_GOAL,
    GET_GENERAL_SETTINGS, CREATE_GENERAL_SETTINGS, UPDATE_GENERAL_SETTINGS,
    GET_GOT_QUESTIONS, CREATE_GOT_QUESTION, UPDATE_GOT_QUESTION, DELETE_GOT_QUESTION,
    GET_INNOVATION_ROADMAP, CREATE_INNOVATION_ROADMAP, UPDATE_INNOVATION_ROADMAP, DELETE_INNOVATION_ROADMAP,
    GET_INVESTORS, CREATE_INVESTOR, DELETE_INVESTOR,
    GET_JOIN_TEAM, CREATE_JOIN_TEAM, DELETE_JOIN_TEAM,
    GET_NEWSLETTER_SUBSCRIBERS, DELETE_NEWSLETTER_SUBSCRIBER,
    GET_OUR_JOURNEY, CREATE_OUR_JOURNEY, UPDATE_OUR_JOURNEY, DELETE_OUR_JOURNEY,
    GET_PARTNERS, CREATE_PARTNER, UPDATE_PARTNER, DELETE_PARTNER,
    GET_PROJECTS, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT,
    GET_FEATURED_PRODUCTS,
    GET_REVIEWS_BY_PRODUCT, GET_MY_REVIEWS, CREATE_REVIEW, UPDATE_REVIEW_STATUS, DELETE_REVIEW,
    GET_SERVICE_REVIEWS, CREATE_SERVICE_REVIEW, UPDATE_SERVICE_REVIEW, DELETE_SERVICE_REVIEW,
    GET_SERVICES, CREATE_SERVICE, UPDATE_SERVICE, DELETE_SERVICE,
    GET_SUSTAINABILITY_COMMITMENTS, CREATE_SUSTAINABILITY_COMMITMENT, UPDATE_SUSTAINABILITY_COMMITMENT, DELETE_SUSTAINABILITY_COMMITMENT,
    GET_TESTIMONIALS, CREATE_TESTIMONIAL, UPDATE_TESTIMONIAL, DELETE_TESTIMONIAL,
    GET_VIDEO_TESTIMONIALS, CREATE_VIDEO_TESTIMONIAL, UPDATE_VIDEO_TESTIMONIAL, DELETE_VIDEO_TESTIMONIAL,
    GET_WHY_CHOOSE_US, CREATE_WHY_CHOOSE_US, UPDATE_WHY_CHOOSE_US, DELETE_WHY_CHOOSE_US
} from '../../services/ApiRoutes';
import { get, post, put, del, patch, createWithMultipart, updateWithMultipart } from '../../services/ApiService';
import {
    HeroSection, AboutContact, ClientBrand, ClientStat, ContactHero, ContactSubmission,
    CoreValue, Developer, FutureGoal, GeneralSettings, GotQuestion, InnovationRoadmapItem,
    Investor, JoinTeam, Subscriber, OurJourney, Partner, Project, Review, ServiceReview,
    Service, SustainabilityCommitment, SustainabilityItem, Testimonial, VideoTestimonial,
    WhyChooseUsItem
} from '@/types/landing';


// Generic State interface
interface SectionState<T> {
    data: T[];
    loading: boolean;
    error: string | null;
}

interface SingleSectionState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

const createInitialSectionState = <T>(): SectionState<T> => ({
    data: [],
    loading: false,
    error: null,
});

const createInitialSingleSectionState = <T>(): SingleSectionState<T> => ({
    data: null,
    loading: false,
    error: null,
});

interface LandingState {
    hero: SectionState<HeroSection>;
    aboutContact: SectionState<AboutContact>;
    clientBrands: SectionState<ClientBrand>;
    clientStats: SectionState<ClientStat>;
    contactHero: SectionState<ContactHero>;
    contactSubmissions: SectionState<ContactSubmission>;
    coreValues: SectionState<CoreValue>;
    developers: SectionState<Developer>;
    futureGoals: SectionState<FutureGoal>;
    generalSettings: SingleSectionState<GeneralSettings>;
    questions: SectionState<GotQuestion>;
    innovationRoadmap: SectionState<InnovationRoadmapItem>;
    investors: SectionState<Investor>;
    joinTeam: SectionState<JoinTeam>;
    newsletterSubscribers: SectionState<Subscriber>;
    ourJourneys: SectionState<OurJourney>;
    partners: SectionState<Partner>;
    projects: SectionState<Project>;
    featuredProducts: SectionState<any>;
    reviews: SectionState<Review>;
    serviceReviews: SectionState<ServiceReview>;
    services: SectionState<Service>;
    sustainabilityCommitments: SectionState<SustainabilityCommitment>;
    sustainabilityItems: SectionState<SustainabilityItem>;
    testimonials: SectionState<Testimonial>;
    videoTestimonials: SectionState<VideoTestimonial>;
    whyChooseUsItems: SectionState<WhyChooseUsItem>;
}

const initialState: LandingState = {
    hero: createInitialSectionState(),
    aboutContact: createInitialSectionState(),
    clientBrands: createInitialSectionState(),
    clientStats: createInitialSectionState(),
    contactHero: createInitialSectionState(),
    contactSubmissions: createInitialSectionState(),
    coreValues: createInitialSectionState(),
    developers: createInitialSectionState(),
    futureGoals: createInitialSectionState(),
    generalSettings: createInitialSingleSectionState(),
    questions: createInitialSectionState(),
    innovationRoadmap: createInitialSectionState(),
    investors: createInitialSectionState(),
    joinTeam: createInitialSectionState(),
    newsletterSubscribers: createInitialSectionState(),
    ourJourneys: createInitialSectionState(),
    partners: createInitialSectionState(),
    projects: createInitialSectionState(),
    featuredProducts: createInitialSectionState(),
    reviews: createInitialSectionState(),
    serviceReviews: createInitialSectionState(),
    services: createInitialSectionState(),
    sustainabilityCommitments: createInitialSectionState(),
    sustainabilityItems: createInitialSectionState(),
    testimonials: createInitialSectionState(),
    videoTestimonials: createInitialSectionState(),
    whyChooseUsItems: createInitialSectionState(),
};

// Async Thunks for Hero Section
export const fetchHeroSections = createAsyncThunk(
    'landing/fetchHeroSections',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_HERO_SECTIONS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch hero sections');
        }
    }
);

export const createHeroSectionAction = createAsyncThunk(
    'landing/createHeroSection',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_HERO_SECTION, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create hero section');
        }
    }
);

export const updateHeroSectionAction = createAsyncThunk(
    'landing/updateHeroSection',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_HERO_SECTION(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update hero section');
        }
    }
);

export const deleteHeroSectionAction = createAsyncThunk(
    'landing/deleteHeroSection',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_HERO_SECTION(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete hero section');
        }
    }
);

// Async Thunks for About Contact
export const fetchAboutContacts = createAsyncThunk(
    'landing/fetchAboutContacts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_ABOUT_CONTACTS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch about contacts');
        }
    }
);

export const createAboutContactAction = createAsyncThunk(
    'landing/createAboutContact',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_ABOUT_CONTACT, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create about contact');
        }
    }
);

export const updateAboutContactAction = createAsyncThunk(
    'landing/updateAboutContact',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_ABOUT_CONTACT(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update about contact');
        }
    }
);

export const deleteAboutContactAction = createAsyncThunk(
    'landing/deleteAboutContact',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_ABOUT_CONTACT(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete about contact');
        }
    }
);

// Async Thunks for Client Brands
export const fetchClientBrands = createAsyncThunk(
    'landing/fetchClientBrands',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_CLIENT_BRANDS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch client brands');
        }
    }
);

export const createClientBrandAction = createAsyncThunk(
    'landing/createClientBrand',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_CLIENT_BRAND, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create client brand');
        }
    }
);

export const updateClientBrandAction = createAsyncThunk(
    'landing/updateClientBrand',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_CLIENT_BRAND(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update client brand');
        }
    }
);

export const deleteClientBrandAction = createAsyncThunk(
    'landing/deleteClientBrand',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_CLIENT_BRAND(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete client brand');
        }
    }
);

// Async Thunks for Client Stats
export const fetchClientStats = createAsyncThunk(
    'landing/fetchClientStats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_CLIENT_STATS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch client stats');
        }
    }
);

export const createClientStatAction = createAsyncThunk(
    'landing/createClientStat',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_CLIENT_STAT, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create client stat');
        }
    }
);

export const updateClientStatAction = createAsyncThunk(
    'landing/updateClientStat',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_CLIENT_STAT(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update client stat');
        }
    }
);

export const deleteClientStatAction = createAsyncThunk(
    'landing/deleteClientStat',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_CLIENT_STAT(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete client stat');
        }
    }
);

// Async Thunks for Contact Hero
export const fetchContactHeroes = createAsyncThunk(
    'landing/fetchContactHeroes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_CONTACT_HEROES);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch contact heroes');
        }
    }
);

export const createContactHeroAction = createAsyncThunk(
    'landing/createContactHero',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_CONTACT_HERO, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create contact hero');
        }
    }
);

export const updateContactHeroAction = createAsyncThunk(
    'landing/updateContactHero',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_CONTACT_HERO(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update contact hero');
        }
    }
);

export const deleteContactHeroAction = createAsyncThunk(
    'landing/deleteContactHero',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_CONTACT_HERO(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete contact hero');
        }
    }
);

// Async Thunks for Contact Submissions
export const fetchContactSubmissions = createAsyncThunk(
    'landing/fetchContactSubmissions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_CONTACT_US_SUBMISSIONS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch contact submissions');
        }
    }
);

export const deleteContactSubmissionAction = createAsyncThunk(
    'landing/deleteContactSubmission',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_CONTACT_US(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete contact submission');
        }
    }
);

export const createContactUsAction = createAsyncThunk(
    'landing/createContactUs',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_CONTACT_US, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create contact submission');
        }
    }
);

export const updateContactUsAction = createAsyncThunk(
    'landing/updateContactUs',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_CONTACT_US(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update contact submission');
        }
    }
);

// Async Thunks for Core Values
export const fetchCoreValues = createAsyncThunk(
    'landing/fetchCoreValues',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_CORE_VALUES);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch core values');
        }
    }
);

export const createCoreValueAction = createAsyncThunk(
    'landing/createCoreValue',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_CORE_VALUE, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create core value');
        }
    }
);

export const updateCoreValueAction = createAsyncThunk(
    'landing/updateCoreValue',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_CORE_VALUE(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update core value');
        }
    }
);

export const deleteCoreValueAction = createAsyncThunk(
    'landing/deleteCoreValue',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_CORE_VALUE(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete core value');
        }
    }
);

// Async Thunks for Developers
export const fetchDevelopers = createAsyncThunk(
    'landing/fetchDevelopers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_DEVELOPERS);
            // developerService.getDevelopers returns response.data.data
            // ApiService get returns response.data
            // If backend structure is { success, data: [] }, then get() returns { success, data: [] }.
            // The original service returns response.data.data ? 
            // developerService.ts: return response.data.data;
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch developers');
        }
    }
);

export const createDeveloperAction = createAsyncThunk(
    'landing/createDeveloper',
    async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await createWithMultipart(CREATE_DEVELOPER, data);
            return response.data; // developerService returns response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create developer');
        }
    }
);

export const deleteDeveloperAction = createAsyncThunk(
    'landing/deleteDeveloper',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_DEVELOPER(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete developer');
        }
    }
);

// Async Thunks for Future Goals
export const fetchFutureGoals = createAsyncThunk(
    'landing/fetchFutureGoals',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_FUTURE_GOALS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch future goals');
        }
    }
);

export const createFutureGoalAction = createAsyncThunk(
    'landing/createFutureGoal',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_FUTURE_GOAL, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create future goal');
        }
    }
);

export const updateFutureGoalAction = createAsyncThunk(
    'landing/updateFutureGoal',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_FUTURE_GOAL(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update future goal');
        }
    }
);

export const deleteFutureGoalAction = createAsyncThunk(
    'landing/deleteFutureGoal',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_FUTURE_GOAL(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete future goal');
        }
    }
);

// Async Thunks for General Settings
export const fetchGeneralSettings = createAsyncThunk(
    'landing/fetchGeneralSettings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_GENERAL_SETTINGS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch general settings');
        }
    }
);

export const createGeneralSettingsAction = createAsyncThunk(
    'landing/createGeneralSettings',
    async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await createWithMultipart(CREATE_GENERAL_SETTINGS, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create general settings');
        }
    }
);

export const updateGeneralSettingsAction = createAsyncThunk(
    'landing/updateGeneralSettings',
    async (data: FormData, { rejectWithValue }) => {
        try {
            // General Settings uses PATCH
            const response = await patch(UPDATE_GENERAL_SETTINGS, data, { isMultipart: true });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update general settings');
        }
    }
);

// Async Thunks for Questions
export const fetchQuestions = createAsyncThunk(
    'landing/fetchQuestions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_GOT_QUESTIONS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch questions');
        }
    }
);

export const createQuestionAction = createAsyncThunk(
    'landing/createQuestion',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_GOT_QUESTION, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create question');
        }
    }
);

export const updateQuestionAction = createAsyncThunk(
    'landing/updateQuestion',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_GOT_QUESTION(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update question');
        }
    }
);

export const deleteQuestionAction = createAsyncThunk(
    'landing/deleteQuestion',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_GOT_QUESTION(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete question');
        }
    }
);

// Async Thunks for Innovation Roadmap
export const fetchInnovationRoadmap = createAsyncThunk(
    'landing/fetchInnovationRoadmap',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_INNOVATION_ROADMAP);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch innovation roadmap');
        }
    }
);

export const createInnovationRoadmapAction = createAsyncThunk(
    'landing/createInnovationRoadmap',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_INNOVATION_ROADMAP, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create innovation roadmap entry');
        }
    }
);

export const updateInnovationRoadmapAction = createAsyncThunk(
    'landing/updateInnovationRoadmap',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_INNOVATION_ROADMAP(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update innovation roadmap entry');
        }
    }
);

export const deleteInnovationRoadmapAction = createAsyncThunk(
    'landing/deleteInnovationRoadmap',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_INNOVATION_ROADMAP(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete innovation roadmap entry');
        }
    }
);

// Async Thunks for Investors
export const fetchInvestors = createAsyncThunk(
    'landing/fetchInvestors',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_INVESTORS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch investors');
        }
    }
);

export const createInvestorAction = createAsyncThunk(
    'landing/createInvestor',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_INVESTOR, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create investor');
        }
    }
);

export const deleteInvestorAction = createAsyncThunk(
    'landing/deleteInvestor',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_INVESTOR(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete investor');
        }
    }
);

// Async Thunks for Join Team
export const fetchJoinTeam = createAsyncThunk(
    'landing/fetchJoinTeam',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_JOIN_TEAM);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch join team entries');
        }
    }
);

export const createJoinTeamAction = createAsyncThunk(
    'landing/createJoinTeam',
    async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await createWithMultipart(CREATE_JOIN_TEAM, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create join team entry');
        }
    }
);

export const deleteJoinTeamAction = createAsyncThunk(
    'landing/deleteJoinTeam',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_JOIN_TEAM(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete join team entry');
        }
    }
);

// Async Thunks for Newsletter Subscribers
export const fetchSubscribers = createAsyncThunk(
    'landing/fetchSubscribers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_NEWSLETTER_SUBSCRIBERS);
            return response.subscribers || []; // API returns { success: true, subscribers: [] }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch subscribers');
        }
    }
);

export const deleteSubscriberAction = createAsyncThunk(
    'landing/deleteSubscriber',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_NEWSLETTER_SUBSCRIBER(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete subscriber');
        }
    }
);

// Async Thunks for Our Journey
export const fetchOurJourneys = createAsyncThunk(
    'landing/fetchOurJourneys',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_OUR_JOURNEY);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch our journey entries');
        }
    }
);

export const createOurJourneyAction = createAsyncThunk(
    'landing/createOurJourney',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_OUR_JOURNEY, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create our journey entry');
        }
    }
);

export const updateOurJourneyAction = createAsyncThunk(
    'landing/updateOurJourney',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_OUR_JOURNEY(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update our journey entry');
        }
    }
);

export const deleteOurJourneyAction = createAsyncThunk(
    'landing/deleteOurJourney',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_OUR_JOURNEY(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete our journey entry');
        }
    }
);

// Async Thunks for Partners
export const fetchPartners = createAsyncThunk(
    'landing/fetchPartners',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_PARTNERS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch partner entries');
        }
    }
);

export const createPartnerAction = createAsyncThunk(
    'landing/createPartner',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_PARTNER, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create partner entry');
        }
    }
);

export const updatePartnerAction = createAsyncThunk(
    'landing/updatePartner',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_PARTNER(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update partner entry');
        }
    }
);

export const deletePartnerAction = createAsyncThunk(
    'landing/deletePartner',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_PARTNER(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete partner entry');
        }
    }
);

// Async Thunks for Projects
export const fetchProjects = createAsyncThunk(
    'landing/fetchProjects',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_PROJECTS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch project entries');
        }
    }
);

export const createProjectAction = createAsyncThunk(
    'landing/createProject',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_PROJECT, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create project entry');
        }
    }
);

export const updateProjectAction = createAsyncThunk(
    'landing/updateProject',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_PROJECT(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update project entry');
        }
    }
);

export const deleteProjectAction = createAsyncThunk(
    'landing/deleteProject',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_PROJECT(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete project entry');
        }
    }
);

export const fetchFeaturedProducts = createAsyncThunk(
    'landing/fetchFeaturedProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_FEATURED_PRODUCTS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured products');
        }
    }
);

// Async Thunks for Reviews
export const fetchReviews = createAsyncThunk(
    'landing/fetchReviews',
    async (_, { rejectWithValue }) => {
        try {
            // reviewsService.getAllReviews used CREATE_REVIEW as GET
            const response = await get(CREATE_REVIEW); // This is /api/reviews
            return response.data || response.reviews || [];
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch review entries');
        }
    }
);

export const createReviewAction = createAsyncThunk(
    'landing/createReview',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_REVIEW, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create review entry');
        }
    }
);

export const updateReviewStatusAction = createAsyncThunk(
    'landing/updateReviewStatus',
    async ({ id, isApproved }: { id: string; isApproved: boolean }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_REVIEW_STATUS(id), { isApproved });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update review status');
        }
    }
);

export const deleteReviewAction = createAsyncThunk(
    'landing/deleteReview',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_REVIEW(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete review entry');
        }
    }
);

// Async Thunks for Service Reviews
export const fetchServiceReviews = createAsyncThunk(
    'landing/fetchServiceReviews',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_SERVICE_REVIEWS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch service review entries');
        }
    }
);

export const createServiceReviewAction = createAsyncThunk(
    'landing/createServiceReview',
    async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await createWithMultipart(CREATE_SERVICE_REVIEW, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create service review');
        }
    }
);

export const updateServiceReviewAction = createAsyncThunk(
    'landing/updateServiceReview',
    async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
        try {
            const response = await updateWithMultipart(UPDATE_SERVICE_REVIEW(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update service review');
        }
    }
);

export const deleteServiceReviewAction = createAsyncThunk(
    'landing/deleteServiceReview',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_SERVICE_REVIEW(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete service review');
        }
    }
);

// Async Thunks for Services
export const fetchServices = createAsyncThunk(
    'landing/fetchServices',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_SERVICES);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch service entries');
        }
    }
);

export const createServiceAction = createAsyncThunk(
    'landing/createService',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_SERVICE, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create service entry');
        }
    }
);

export const updateServiceAction = createAsyncThunk(
    'landing/updateService',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_SERVICE(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update service entry');
        }
    }
);

export const deleteServiceAction = createAsyncThunk(
    'landing/deleteService',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_SERVICE(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete service entry');
        }
    }
);

// Async Thunks for Sustainability Commitments
export const fetchSustainabilityCommitments = createAsyncThunk(
    'landing/fetchSustainabilityCommitments',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_SUSTAINABILITY_COMMITMENTS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch sustainability commitments');
        }
    }
);

export const createSustainabilityCommitmentAction = createAsyncThunk(
    'landing/createSustainabilityCommitment',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_SUSTAINABILITY_COMMITMENT, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create sustainability commitment');
        }
    }
);

export const updateSustainabilityCommitmentAction = createAsyncThunk(
    'landing/updateSustainabilityCommitment',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_SUSTAINABILITY_COMMITMENT(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update sustainability commitment');
        }
    }
);

export const deleteSustainabilityCommitmentAction = createAsyncThunk(
    'landing/deleteSustainabilityCommitment',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_SUSTAINABILITY_COMMITMENT(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete sustainability commitment');
        }
    }
);

// Async Thunks for Sustainability Items
export const fetchSustainabilityItems = createAsyncThunk(
    'landing/fetchSustainabilityItems',
    async (_, { rejectWithValue }) => {
        try {
            // Note: sustainabilityService also used GET_SUSTAINABILITY_COMMITMENTS, assuming correct behavior
            const response = await get(GET_SUSTAINABILITY_COMMITMENTS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch sustainability items');
        }
    }
);

export const createSustainabilityItemAction = createAsyncThunk(
    'landing/createSustainabilityItem',
    async (data: any, { rejectWithValue }) => {
        try {
            // sustainabilityService used CREATE_SUSTAINABILITY_COMMITMENT
            const response = await post(CREATE_SUSTAINABILITY_COMMITMENT, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create sustainability item');
        }
    }
);

export const updateSustainabilityItemAction = createAsyncThunk(
    'landing/updateSustainabilityItem',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            // sustainabilityService used UPDATE_SUSTAINABILITY_COMMITMENT
            const response = await put(UPDATE_SUSTAINABILITY_COMMITMENT(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update sustainability item');
        }
    }
);

export const deleteSustainabilityItemAction = createAsyncThunk(
    'landing/deleteSustainabilityItem',
    async (id: string, { rejectWithValue }) => {
        try {
            // sustainabilityService used DELETE_SUSTAINABILITY_COMMITMENT
            await del(DELETE_SUSTAINABILITY_COMMITMENT(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete sustainability item');
        }
    }
);

// Async Thunks for Testimonials
export const fetchTestimonials = createAsyncThunk(
    'landing/fetchTestimonials',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_TESTIMONIALS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch testimonials');
        }
    }
);

export const createTestimonialAction = createAsyncThunk(
    'landing/createTestimonial',
    async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await createWithMultipart(CREATE_TESTIMONIAL, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create testimonial');
        }
    }
);

export const updateTestimonialAction = createAsyncThunk(
    'landing/updateTestimonial',
    async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
        try {
            const response = await updateWithMultipart(UPDATE_TESTIMONIAL(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update testimonial');
        }
    }
);

export const deleteTestimonialAction = createAsyncThunk(
    'landing/deleteTestimonial',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_TESTIMONIAL(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete testimonial');
        }
    }
);

// Async Thunks for Video Testimonials
export const fetchVideoTestimonials = createAsyncThunk(
    'landing/fetchVideoTestimonials',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_VIDEO_TESTIMONIALS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch video testimonials');
        }
    }
);

export const createVideoTestimonialAction = createAsyncThunk(
    'landing/createVideoTestimonial',
    async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await createWithMultipart(CREATE_VIDEO_TESTIMONIAL, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create video testimonial');
        }
    }
);

export const updateVideoTestimonialAction = createAsyncThunk(
    'landing/updateVideoTestimonial',
    async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
        try {
            const response = await updateWithMultipart(UPDATE_VIDEO_TESTIMONIAL(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update video testimonial');
        }
    }
);

export const deleteVideoTestimonialAction = createAsyncThunk(
    'landing/deleteVideoTestimonial',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_VIDEO_TESTIMONIAL(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete video testimonial');
        }
    }
);

// Async Thunks for Why Choose Us
export const fetchWhyChooseUsItems = createAsyncThunk(
    'landing/fetchWhyChooseUsItems',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_WHY_CHOOSE_US);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch why choose us items');
        }
    }
);

export const createWhyChooseUsItemAction = createAsyncThunk(
    'landing/createWhyChooseUsItem',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_WHY_CHOOSE_US, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create why choose us item');
        }
    }
);

export const updateWhyChooseUsItemAction = createAsyncThunk(
    'landing/updateWhyChooseUsItem',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_WHY_CHOOSE_US(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update why choose us item');
        }
    }
);

export const deleteWhyChooseUsItemAction = createAsyncThunk(
    'landing/deleteWhyChooseUsItem',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_WHY_CHOOSE_US(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete why choose us item');
        }
    }
);

const landingSlice = createSlice({
    name: 'landing',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Hero Section
        builder
            .addCase(fetchHeroSections.pending, (state) => {
                state.hero.loading = true;
                state.hero.error = null;
            })
            .addCase(fetchHeroSections.fulfilled, (state, action) => {
                state.hero.loading = false;
                state.hero.data = action.payload;
            })
            .addCase(fetchHeroSections.rejected, (state, action) => {
                state.hero.loading = false;
                state.hero.error = action.payload as string;
            })
            .addCase(createHeroSectionAction.fulfilled, (state, action: PayloadAction<any>) => {
                state.hero.data.push(action.payload);
            })
            .addCase(updateHeroSectionAction.fulfilled, (state, action: PayloadAction<any>) => {
                const index = state.hero.data.findIndex((h) => h._id === action.payload._id || h.id === action.payload.id);
                if (index !== -1) {
                    state.hero.data[index] = action.payload;
                }
            })
            .addCase(deleteHeroSectionAction.fulfilled, (state, action: PayloadAction<string>) => {
                state.hero.data = state.hero.data.filter((h) => h._id !== action.payload && h.id !== action.payload);
            });

        // About Contact
        builder
            .addCase(fetchAboutContacts.pending, (state) => {
                state.aboutContact.loading = true;
                state.aboutContact.error = null;
            })
            .addCase(fetchAboutContacts.fulfilled, (state, action) => {
                state.aboutContact.loading = false;
                state.aboutContact.data = action.payload;
            })
            .addCase(fetchAboutContacts.rejected, (state, action) => {
                state.aboutContact.loading = false;
                state.aboutContact.error = action.payload as string;
            })
            .addCase(createAboutContactAction.fulfilled, (state, action) => {
                state.aboutContact.data.push(action.payload);
            })
            .addCase(updateAboutContactAction.fulfilled, (state, action) => {
                const index = state.aboutContact.data.findIndex((item) => item._id === action.payload._id || item.id === action.payload.id);
                if (index !== -1) {
                    state.aboutContact.data[index] = action.payload;
                }
            })
            .addCase(deleteAboutContactAction.fulfilled, (state, action) => {
                state.aboutContact.data = state.aboutContact.data.filter((item) => item._id !== action.payload && item.id !== action.payload);
            });

        // Client Brands
        builder
            .addCase(fetchClientBrands.pending, (state) => {
                state.clientBrands.loading = true;
                state.clientBrands.error = null;
            })
            .addCase(fetchClientBrands.fulfilled, (state, action) => {
                state.clientBrands.loading = false;
                state.clientBrands.data = action.payload;
            })
            .addCase(fetchClientBrands.rejected, (state, action) => {
                state.clientBrands.loading = false;
                state.clientBrands.error = action.payload as string;
            })
            .addCase(createClientBrandAction.fulfilled, (state, action) => {
                state.clientBrands.data.push(action.payload);
            })
            .addCase(updateClientBrandAction.fulfilled, (state, action) => {
                const index = state.clientBrands.data.findIndex((item) => item._id === action.payload._id || item.id === action.payload.id);
                if (index !== -1) {
                    state.clientBrands.data[index] = action.payload;
                }
            })
            .addCase(deleteClientBrandAction.fulfilled, (state, action) => {
                state.clientBrands.data = state.clientBrands.data.filter((item) => item._id !== action.payload && item.id !== action.payload);
            });

        // Client Stats
        builder
            .addCase(fetchClientStats.pending, (state) => {
                state.clientStats.loading = true;
                state.clientStats.error = null;
            })
            .addCase(fetchClientStats.fulfilled, (state, action) => {
                state.clientStats.loading = false;
                state.clientStats.data = action.payload;
            })
            .addCase(fetchClientStats.rejected, (state, action) => {
                state.clientStats.loading = false;
                state.clientStats.error = action.payload as string;
            })
            .addCase(createClientStatAction.fulfilled, (state, action) => {
                state.clientStats.data.push(action.payload);
            })
            .addCase(updateClientStatAction.fulfilled, (state, action) => {
                const index = state.clientStats.data.findIndex((item) => item._id === action.payload._id || item.id === action.payload.id);
                if (index !== -1) {
                    state.clientStats.data[index] = action.payload;
                }
            })
            .addCase(deleteClientStatAction.fulfilled, (state, action) => {
                state.clientStats.data = state.clientStats.data.filter((item) => item._id !== action.payload && item.id !== action.payload);
            });

        // Contact Hero
        builder
            .addCase(fetchContactHeroes.pending, (state) => {
                state.contactHero.loading = true;
                state.contactHero.error = null;
            })
            .addCase(fetchContactHeroes.fulfilled, (state, action) => {
                state.contactHero.loading = false;
                state.contactHero.data = action.payload;
            })
            .addCase(fetchContactHeroes.rejected, (state, action) => {
                state.contactHero.loading = false;
                state.contactHero.error = action.payload as string;
            })
            .addCase(createContactHeroAction.fulfilled, (state, action) => {
                state.contactHero.data.push(action.payload);
            })
            .addCase(updateContactHeroAction.fulfilled, (state, action) => {
                const index = state.contactHero.data.findIndex((item) => item._id === action.payload._id || item.id === action.payload.id);
                if (index !== -1) {
                    state.contactHero.data[index] = action.payload;
                }
            })
            .addCase(deleteContactHeroAction.fulfilled, (state, action) => {
                state.contactHero.data = state.contactHero.data.filter((item) => item._id !== action.payload && item.id !== action.payload);
            });

        // Contact Submissions
        builder
            .addCase(fetchContactSubmissions.pending, (state) => {
                state.contactSubmissions.loading = true;
                state.contactSubmissions.error = null;
            })
            .addCase(fetchContactSubmissions.fulfilled, (state, action) => {
                state.contactSubmissions.loading = false;
                state.contactSubmissions.data = action.payload;
            })
            .addCase(fetchContactSubmissions.rejected, (state, action) => {
                state.contactSubmissions.loading = false;
                state.contactSubmissions.error = action.payload as string;
            })
            .addCase(deleteContactSubmissionAction.fulfilled, (state, action) => {
                state.contactSubmissions.data = state.contactSubmissions.data.filter((item) => item._id !== action.payload && item.id !== action.payload);
            })
            .addCase(createContactUsAction.fulfilled, (state, action) => {
                state.contactSubmissions.data.push(action.payload);
            })
            .addCase(updateContactUsAction.fulfilled, (state, action) => {
                const index = state.contactSubmissions.data.findIndex((item) => item._id === action.payload._id || item.id === action.payload.id);
                if (index !== -1) {
                    state.contactSubmissions.data[index] = action.payload;
                }
            });

        // Core Values
        builder
            .addCase(fetchCoreValues.pending, (state) => {
                state.coreValues.loading = true;
                state.coreValues.error = null;
            })
            .addCase(fetchCoreValues.fulfilled, (state, action) => {
                state.coreValues.loading = false;
                state.coreValues.data = action.payload;
            })
            .addCase(fetchCoreValues.rejected, (state, action) => {
                state.coreValues.loading = false;
                state.coreValues.error = action.payload as string;
            })
            .addCase(createCoreValueAction.fulfilled, (state, action) => {
                state.coreValues.data.push(action.payload);
            })
            .addCase(updateCoreValueAction.fulfilled, (state, action) => {
                const index = state.coreValues.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.coreValues.data[index] = action.payload;
                }
            })
            .addCase(deleteCoreValueAction.fulfilled, (state, action) => {
                state.coreValues.data = state.coreValues.data.filter((item) => item._id !== action.payload);
            });

        // Developers
        builder
            .addCase(fetchDevelopers.pending, (state) => {
                state.developers.loading = true;
                state.developers.error = null;
            })
            .addCase(fetchDevelopers.fulfilled, (state, action) => {
                state.developers.loading = false;
                state.developers.data = action.payload;
            })
            .addCase(fetchDevelopers.rejected, (state, action) => {
                state.developers.loading = false;
                state.developers.error = action.payload as string;
            })
            .addCase(createDeveloperAction.fulfilled, (state, action) => {
                state.developers.data.push(action.payload);
            })
            .addCase(deleteDeveloperAction.fulfilled, (state, action) => {
                state.developers.data = state.developers.data.filter((item) => item._id !== action.payload);
            });

        // Future Goals
        builder
            .addCase(fetchFutureGoals.pending, (state) => {
                state.futureGoals.loading = true;
                state.futureGoals.error = null;
            })
            .addCase(fetchFutureGoals.fulfilled, (state, action) => {
                state.futureGoals.loading = false;
                state.futureGoals.data = action.payload;
            })
            .addCase(fetchFutureGoals.rejected, (state, action) => {
                state.futureGoals.loading = false;
                state.futureGoals.error = action.payload as string;
            })
            .addCase(createFutureGoalAction.fulfilled, (state, action) => {
                state.futureGoals.data.push(action.payload);
            })
            .addCase(updateFutureGoalAction.fulfilled, (state, action) => {
                const index = state.futureGoals.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.futureGoals.data[index] = action.payload;
                }
            })
            .addCase(deleteFutureGoalAction.fulfilled, (state, action) => {
                state.futureGoals.data = state.futureGoals.data.filter((item) => item._id !== action.payload);
            });

        // General Settings
        builder
            .addCase(fetchGeneralSettings.pending, (state) => {
                state.generalSettings.loading = true;
                state.generalSettings.error = null;
            })
            .addCase(fetchGeneralSettings.fulfilled, (state, action) => {
                state.generalSettings.loading = false;
                state.generalSettings.data = action.payload;
            })
            .addCase(fetchGeneralSettings.rejected, (state, action) => {
                state.generalSettings.loading = false;
                state.generalSettings.error = action.payload as string;
            })
            .addCase(createGeneralSettingsAction.fulfilled, (state, action) => {
                state.generalSettings.data = action.payload;
            })
            .addCase(updateGeneralSettingsAction.fulfilled, (state, action) => {
                state.generalSettings.data = action.payload;
            });

        // Questions
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.questions.loading = true;
                state.questions.error = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.questions.loading = false;
                state.questions.data = action.payload;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.questions.loading = false;
                state.questions.error = action.payload as string;
            })
            .addCase(createQuestionAction.fulfilled, (state, action) => {
                state.questions.data.push(action.payload);
            })
            .addCase(updateQuestionAction.fulfilled, (state, action) => {
                const index = state.questions.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.questions.data[index] = action.payload;
                }
            })
            .addCase(deleteQuestionAction.fulfilled, (state, action) => {
                state.questions.data = state.questions.data.filter((item) => item._id !== action.payload);
            });

        // Innovation Roadmap
        builder
            .addCase(fetchInnovationRoadmap.pending, (state) => {
                state.innovationRoadmap.loading = true;
                state.innovationRoadmap.error = null;
            })
            .addCase(fetchInnovationRoadmap.fulfilled, (state, action) => {
                state.innovationRoadmap.loading = false;
                state.innovationRoadmap.data = action.payload;
            })
            .addCase(fetchInnovationRoadmap.rejected, (state, action) => {
                state.innovationRoadmap.loading = false;
                state.innovationRoadmap.error = action.payload as string;
            })
            .addCase(createInnovationRoadmapAction.fulfilled, (state, action) => {
                state.innovationRoadmap.data.push(action.payload);
            })
            .addCase(updateInnovationRoadmapAction.fulfilled, (state, action) => {
                const index = state.innovationRoadmap.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.innovationRoadmap.data[index] = action.payload;
                }
            })
            .addCase(deleteInnovationRoadmapAction.fulfilled, (state, action) => {
                state.innovationRoadmap.data = state.innovationRoadmap.data.filter((item) => item._id !== action.payload);
            });

        // Investors
        builder
            .addCase(fetchInvestors.pending, (state) => {
                state.investors.loading = true;
                state.investors.error = null;
            })
            .addCase(fetchInvestors.fulfilled, (state, action) => {
                state.investors.loading = false;
                state.investors.data = action.payload;
            })
            .addCase(fetchInvestors.rejected, (state, action) => {
                state.investors.loading = false;
                state.investors.error = action.payload as string;
            })
            .addCase(createInvestorAction.fulfilled, (state, action) => {
                state.investors.data.push(action.payload);
            })
            .addCase(deleteInvestorAction.fulfilled, (state, action) => {
                state.investors.data = state.investors.data.filter((item) => item._id !== action.payload);
            });

        // Join Team
        builder
            .addCase(fetchJoinTeam.pending, (state) => {
                state.joinTeam.loading = true;
                state.joinTeam.error = null;
            })
            .addCase(fetchJoinTeam.fulfilled, (state, action) => {
                state.joinTeam.loading = false;
                state.joinTeam.data = action.payload;
            })
            .addCase(fetchJoinTeam.rejected, (state, action) => {
                state.joinTeam.loading = false;
                state.joinTeam.error = action.payload as string;
            })
            .addCase(createJoinTeamAction.fulfilled, (state, action) => {
                state.joinTeam.data.push(action.payload);
            })
            .addCase(deleteJoinTeamAction.fulfilled, (state, action) => {
                state.joinTeam.data = state.joinTeam.data.filter((item) => item._id !== action.payload);
            });

        // Newsletter Subscribers
        builder
            .addCase(fetchSubscribers.pending, (state) => {
                state.newsletterSubscribers.loading = true;
                state.newsletterSubscribers.error = null;
            })
            .addCase(fetchSubscribers.fulfilled, (state, action) => {
                state.newsletterSubscribers.loading = false;
                state.newsletterSubscribers.data = action.payload;
            })
            .addCase(fetchSubscribers.rejected, (state, action) => {
                state.newsletterSubscribers.loading = false;
                state.newsletterSubscribers.error = action.payload as string;
            })
            .addCase(deleteSubscriberAction.fulfilled, (state, action) => {
                state.newsletterSubscribers.data = state.newsletterSubscribers.data.filter((item) => item._id !== action.payload);
            });

        // Our Journey
        builder
            .addCase(fetchOurJourneys.pending, (state) => {
                state.ourJourneys.loading = true;
                state.ourJourneys.error = null;
            })
            .addCase(fetchOurJourneys.fulfilled, (state, action) => {
                state.ourJourneys.loading = false;
                state.ourJourneys.data = action.payload;
            })
            .addCase(fetchOurJourneys.rejected, (state, action) => {
                state.ourJourneys.loading = false;
                state.ourJourneys.error = action.payload as string;
            })
            .addCase(createOurJourneyAction.fulfilled, (state, action) => {
                state.ourJourneys.data.push(action.payload);
            })
            .addCase(updateOurJourneyAction.fulfilled, (state, action) => {
                const index = state.ourJourneys.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.ourJourneys.data[index] = action.payload;
                }
            })
            .addCase(deleteOurJourneyAction.fulfilled, (state, action) => {
                state.ourJourneys.data = state.ourJourneys.data.filter((item) => item._id !== action.payload);
            });

        // Partners
        builder
            .addCase(fetchPartners.pending, (state) => {
                state.partners.loading = true;
                state.partners.error = null;
            })
            .addCase(fetchPartners.fulfilled, (state, action) => {
                state.partners.loading = false;
                state.partners.data = action.payload;
            })
            .addCase(fetchPartners.rejected, (state, action) => {
                state.partners.loading = false;
                state.partners.error = action.payload as string;
            })
            .addCase(createPartnerAction.fulfilled, (state, action) => {
                state.partners.data.push(action.payload);
            })
            .addCase(deletePartnerAction.fulfilled, (state, action) => {
                state.partners.data = state.partners.data.filter((item) => item._id !== action.payload);
            })
            .addCase(updatePartnerAction.fulfilled, (state, action) => {
                const index = state.partners.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.partners.data[index] = action.payload;
                }
            });

        // Projects
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.projects.loading = true;
                state.projects.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projects.loading = false;
                state.projects.data = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.projects.loading = false;
                state.projects.error = action.payload as string;
            })
            .addCase(createProjectAction.fulfilled, (state, action) => {
                state.projects.data.push(action.payload);
            })
            .addCase(updateProjectAction.fulfilled, (state, action) => {
                const index = state.projects.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.projects.data[index] = action.payload;
                }
            })
            .addCase(deleteProjectAction.fulfilled, (state, action) => {
                state.projects.data = state.projects.data.filter((item) => item._id !== action.payload);
            })
            // Featured Products
            .addCase(fetchFeaturedProducts.pending, (state) => {
                state.featuredProducts.loading = true;
                state.featuredProducts.error = null;
            })
            .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
                state.featuredProducts.loading = false;
                state.featuredProducts.data = action.payload;
            })
            .addCase(fetchFeaturedProducts.rejected, (state, action) => {
                state.featuredProducts.loading = false;
                state.featuredProducts.error = action.payload as string;
            })
            // Reviews
            .addCase(fetchReviews.pending, (state) => {
                state.reviews.loading = true;
                state.reviews.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviews.loading = false;
                state.reviews.data = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.reviews.loading = false;
                state.reviews.error = action.payload as string;
            })
            .addCase(updateReviewStatusAction.fulfilled, (state, action) => {
                const index = state.reviews.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.reviews.data[index] = action.payload;
                }
            })
            .addCase(deleteReviewAction.fulfilled, (state, action) => {
                state.reviews.data = state.reviews.data.filter((item) => item._id !== action.payload);
            })
            // Service Reviews
            .addCase(fetchServiceReviews.pending, (state) => {
                state.serviceReviews.loading = true;
                state.serviceReviews.error = null;
            })
            .addCase(fetchServiceReviews.fulfilled, (state, action) => {
                state.serviceReviews.loading = false;
                state.serviceReviews.data = action.payload;
            })
            .addCase(fetchServiceReviews.rejected, (state, action) => {
                state.serviceReviews.loading = false;
                state.serviceReviews.error = action.payload as string;
            })
            .addCase(createServiceReviewAction.fulfilled, (state, action) => {
                state.serviceReviews.data.push(action.payload);
            })
            .addCase(updateServiceReviewAction.fulfilled, (state, action) => {
                const index = state.serviceReviews.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.serviceReviews.data[index] = action.payload;
                }
            })
            .addCase(deleteServiceReviewAction.fulfilled, (state, action) => {
                state.serviceReviews.data = state.serviceReviews.data.filter((item) => item._id !== action.payload);
            })
            // Services
            .addCase(fetchServices.pending, (state) => {
                state.services.loading = true;
                state.services.error = null;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.services.loading = false;
                state.services.data = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.services.loading = false;
                state.services.error = action.payload as string;
            })
            .addCase(createServiceAction.fulfilled, (state, action) => {
                state.services.data.push(action.payload);
            })
            .addCase(updateServiceAction.fulfilled, (state, action) => {
                const index = state.services.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.services.data[index] = action.payload;
                }
            })
            .addCase(deleteServiceAction.fulfilled, (state, action) => {
                state.services.data = state.services.data.filter((item) => item._id !== action.payload);
            })
            // Sustainability Commitments
            .addCase(fetchSustainabilityCommitments.pending, (state) => {
                state.sustainabilityCommitments.loading = true;
                state.sustainabilityCommitments.error = null;
            })
            .addCase(fetchSustainabilityCommitments.fulfilled, (state, action) => {
                state.sustainabilityCommitments.loading = false;
                state.sustainabilityCommitments.data = action.payload;
            })
            .addCase(fetchSustainabilityCommitments.rejected, (state, action) => {
                state.sustainabilityCommitments.loading = false;
                state.sustainabilityCommitments.error = action.payload as string;
            })
            .addCase(createSustainabilityCommitmentAction.fulfilled, (state, action) => {
                state.sustainabilityCommitments.data.push(action.payload);
            })
            .addCase(updateSustainabilityCommitmentAction.fulfilled, (state, action) => {
                const index = state.sustainabilityCommitments.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.sustainabilityCommitments.data[index] = action.payload;
                }
            })
            .addCase(deleteSustainabilityCommitmentAction.fulfilled, (state, action) => {
                state.sustainabilityCommitments.data = state.sustainabilityCommitments.data.filter((item) => item._id !== action.payload);
            })
            // Sustainability Items
            .addCase(fetchSustainabilityItems.pending, (state) => {
                state.sustainabilityItems.loading = true;
                state.sustainabilityItems.error = null;
            })
            .addCase(fetchSustainabilityItems.fulfilled, (state, action) => {
                state.sustainabilityItems.loading = false;
                state.sustainabilityItems.data = action.payload;
            })
            .addCase(fetchSustainabilityItems.rejected, (state, action) => {
                state.sustainabilityItems.loading = false;
                state.sustainabilityItems.error = action.payload as string;
            })
            .addCase(createSustainabilityItemAction.fulfilled, (state, action) => {
                state.sustainabilityItems.data.push(action.payload);
            })
            .addCase(updateSustainabilityItemAction.fulfilled, (state, action) => {
                const index = state.sustainabilityItems.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.sustainabilityItems.data[index] = action.payload;
                }
            })
            .addCase(deleteSustainabilityItemAction.fulfilled, (state, action) => {
                state.sustainabilityItems.data = state.sustainabilityItems.data.filter((item) => item._id !== action.payload);
            })
            // Testimonials
            .addCase(fetchTestimonials.pending, (state) => {
                state.testimonials.loading = true;
                state.testimonials.error = null;
            })
            .addCase(fetchTestimonials.fulfilled, (state, action) => {
                state.testimonials.loading = false;
                state.testimonials.data = action.payload;
            })
            .addCase(fetchTestimonials.rejected, (state, action) => {
                state.testimonials.loading = false;
                state.testimonials.error = action.payload as string;
            })
            .addCase(createTestimonialAction.fulfilled, (state, action) => {
                state.testimonials.data.push(action.payload);
            })
            .addCase(updateTestimonialAction.fulfilled, (state, action) => {
                const index = state.testimonials.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.testimonials.data[index] = action.payload;
                }
            })
            .addCase(deleteTestimonialAction.fulfilled, (state, action) => {
                state.testimonials.data = state.testimonials.data.filter((item) => item._id !== action.payload);
            })
            // Video Testimonials
            .addCase(fetchVideoTestimonials.pending, (state) => {
                state.videoTestimonials.loading = true;
                state.videoTestimonials.error = null;
            })
            .addCase(fetchVideoTestimonials.fulfilled, (state, action) => {
                state.videoTestimonials.loading = false;
                state.videoTestimonials.data = action.payload;
            })
            .addCase(fetchVideoTestimonials.rejected, (state, action) => {
                state.videoTestimonials.loading = false;
                state.videoTestimonials.error = action.payload as string;
            })
            .addCase(createVideoTestimonialAction.fulfilled, (state, action) => {
                state.videoTestimonials.data.push(action.payload);
            })
            .addCase(updateVideoTestimonialAction.fulfilled, (state, action) => {
                const index = state.videoTestimonials.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.videoTestimonials.data[index] = action.payload;
                }
            })
            .addCase(deleteVideoTestimonialAction.fulfilled, (state, action) => {
                state.videoTestimonials.data = state.videoTestimonials.data.filter((item) => item._id !== action.payload);
            })
            // Why Choose Us
            .addCase(fetchWhyChooseUsItems.pending, (state) => {
                state.whyChooseUsItems.loading = true;
                state.whyChooseUsItems.error = null;
            })
            .addCase(fetchWhyChooseUsItems.fulfilled, (state, action) => {
                state.whyChooseUsItems.loading = false;
                state.whyChooseUsItems.data = action.payload;
            })
            .addCase(fetchWhyChooseUsItems.rejected, (state, action) => {
                state.whyChooseUsItems.loading = false;
                state.whyChooseUsItems.error = action.payload as string;
            })
            .addCase(createWhyChooseUsItemAction.fulfilled, (state, action) => {
                state.whyChooseUsItems.data.push(action.payload);
            })
            .addCase(updateWhyChooseUsItemAction.fulfilled, (state, action) => {
                const index = state.whyChooseUsItems.data.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) {
                    state.whyChooseUsItems.data[index] = action.payload;
                }
            })
            .addCase(deleteWhyChooseUsItemAction.fulfilled, (state, action) => {
                state.whyChooseUsItems.data = state.whyChooseUsItems.data.filter((item) => item._id !== action.payload);
            });
    },
});

export default landingSlice.reducer;
