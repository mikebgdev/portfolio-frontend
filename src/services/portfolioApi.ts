import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { env } from '../utils/env';
import type {
  AboutData,
  Skill,
  Project,
  Experience,
  Education,
  ContactData,
  SocialLink,
  ContactMessage,
  ContactResponse,
} from '../types/api';

export const portfolioApi = createApi({
  reducerPath: 'portfolioApi',
  baseQuery: fetchBaseQuery({
    baseUrl: env.API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const token = (getState() as RootState).auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('content-type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact', 'SocialLinks'],
  endpoints: (builder) => ({
    // About endpoints
    getAbout: builder.query<AboutData, void>({
      query: () => 'about/',
      providesTags: ['About'],
    }),
    updateAbout: builder.mutation<AboutData, Partial<AboutData>>({
      query: (data) => ({
        url: 'about',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['About'],
    }),

    // Skills endpoints
    getSkills: builder.query<Skill[], void>({
      query: () => 'skills/',
      providesTags: ['Skills'],
    }),
    createSkill: builder.mutation<Skill, Omit<Skill, 'id'>>({
      query: (skill) => ({
        url: 'skills',
        method: 'POST',
        body: skill,
      }),
      invalidatesTags: ['Skills'],
    }),
    updateSkill: builder.mutation<Skill, { id: string } & Partial<Skill>>({
      query: ({ id, ...skill }) => ({
        url: `skills/${id}`,
        method: 'PUT',
        body: skill,
      }),
      invalidatesTags: ['Skills'],
    }),
    deleteSkill: builder.mutation<void, string>({
      query: (id) => ({
        url: `skills/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Skills'],
    }),

    // Projects endpoints
    getProjects: builder.query<Project[], void>({
      query: () => 'projects/',
      providesTags: ['Projects'],
    }),
    getFeaturedProjects: builder.query<Project[], void>({
      query: () => 'projects/',
      providesTags: ['Projects'],
    }),
    createProject: builder.mutation<Project, Omit<Project, 'id'>>({
      query: (project) => ({
        url: 'projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),
    updateProject: builder.mutation<Project, { id: string } & Partial<Project>>({
      query: ({ id, ...project }) => ({
        url: `projects/${id}`,
        method: 'PUT',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects'],
    }),

    // Experience endpoints
    getExperience: builder.query<Experience[], void>({
      query: () => 'experience/',
      providesTags: ['Experience'],
    }),
    createExperience: builder.mutation<Experience, Omit<Experience, 'id'>>({
      query: (experience) => ({
        url: 'experience',
        method: 'POST',
        body: experience,
      }),
      invalidatesTags: ['Experience'],
    }),
    updateExperience: builder.mutation<Experience, { id: string } & Partial<Experience>>({
      query: ({ id, ...experience }) => ({
        url: `experience/${id}`,
        method: 'PUT',
        body: experience,
      }),
      invalidatesTags: ['Experience'],
    }),
    deleteExperience: builder.mutation<void, string>({
      query: (id) => ({
        url: `experience/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Experience'],
    }),

    // Education endpoints
    getEducation: builder.query<Education[], void>({
      query: () => 'education/',
      providesTags: ['Education'],
    }),
    createEducation: builder.mutation<Education, Omit<Education, 'id'>>({
      query: (education) => ({
        url: 'education',
        method: 'POST',
        body: education,
      }),
      invalidatesTags: ['Education'],
    }),
    updateEducation: builder.mutation<Education, { id: string } & Partial<Education>>({
      query: ({ id, ...education }) => ({
        url: `education/${id}`,
        method: 'PUT',
        body: education,
      }),
      invalidatesTags: ['Education'],
    }),
    deleteEducation: builder.mutation<void, string>({
      query: (id) => ({
        url: `education/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Education'],
    }),

    // Social Links endpoints
    getSocialLinks: builder.query<SocialLink[], void>({
      query: () => 'social-links',
      providesTags: ['SocialLinks'],
    }),
    updateSocialLinks: builder.mutation<SocialLink[], SocialLink[]>({
      query: (links) => ({
        url: 'social-links',
        method: 'PUT',
        body: links,
      }),
      invalidatesTags: ['SocialLinks'],
    }),

    // Contact endpoints
    getContact: builder.query<ContactData, void>({
      query: () => 'contact/',
      providesTags: ['Contact'],
    }),
    sendContactMessage: builder.mutation<ContactResponse, ContactMessage>({
      query: (message) => ({
        url: 'contact/',
        method: 'POST',
        body: message,
      }),
    }),

    // Health check endpoint
    healthCheck: builder.query<{ status: string; timestamp: string }, void>({
      query: () => 'health',
    }),
  }),
});

export const {
  // About
  useGetAboutQuery,
  useUpdateAboutMutation,
  
  // Skills
  useGetSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
  
  // Projects
  useGetProjectsQuery,
  useGetFeaturedProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  
  // Experience
  useGetExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  
  // Education
  useGetEducationQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  
  // Social Links
  useGetSocialLinksQuery,
  useUpdateSocialLinksMutation,
  
  // Contact
  useGetContactQuery,
  useSendContactMessageMutation,
  
  // Health
  useHealthCheckQuery,
} = portfolioApi;