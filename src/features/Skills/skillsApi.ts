import toast from 'react-hot-toast';
import { t } from 'i18next';
import { baseApi } from '@/baseApi';
import { parseAndTransformTo } from '@/utils/http';
import { skillListResponseType, Skills, toSkillMap } from './models';

export const skillsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSkills: builder.query<Skills, void>({
      query: () => 'skills',
      providesTags: ['skills'],
      transformResponse: (response: unknown) =>
        parseAndTransformTo(
          response,
          skillListResponseType,
          { resources: [] },
          toSkillMap,
          () => toast.error('error'),
        ),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          toast('error');
        }
      },
    }),
    deleteSkill: builder.mutation<unknown, string>({
      query: skillId => ({
        url: `skills/${skillId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['skills', 'mentors'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success(t('skills:notification.success.delete'), {
            id: 'skill-delete-success',
          });
        } catch {
          toast.error(t('skills:notification.failure.delete'), {
            id: 'skill-delete-success',
          });
        }
      },
    }),
  }),
});

export const { useGetSkillsQuery, useDeleteSkillMutation } = skillsApi;
