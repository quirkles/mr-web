import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import { PageHeader } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { GET_TEAMS_BY_USER_ID } from '../../profile/graphql';
import { PROFILE } from '../../../router/paths';
import RouteGuard from '../../../router/RouteGuard';
import { PAGES } from '../constants';
import DeleteTeamForm from '../forms/DeleteTeamForm';
import { DELETE_TEAM, GET_TEAM } from '../graphql';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';

const DeleteTeam: React.FC = () => {
  const { teamId } = useCustomParams();
  const { refetch } = useQuery(GET_TEAMS_BY_USER_ID);
  const { loading, error, data } = useQuery(GET_TEAM, {
    variables: { teamId },
    notifyOnNetworkStatusChange: true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteTeam, { loading: deleteLoading }] = useMutation(DELETE_TEAM);

  const onDelete = () => {
    return deleteTeam({ variables: { teamId } })
      .then(() => {
        refetch();
        dispatch(showAlert({ text: 'Team deleted', type: 'success' }));
        navigate(PROFILE.PROFILE);
      })
      .catch(() => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  if (error) return <ErrorGraphql error={error} />;

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.DELETE_TEAM} />
      {!loading && !deleteLoading && data ? (
        <DeleteTeamForm
          onSubmit={onDelete}
          defaultValues={undefined}
          teamName={data.team.teamName}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default DeleteTeam;
