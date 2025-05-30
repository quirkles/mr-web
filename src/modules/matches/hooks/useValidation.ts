import { IMatch, IPlayerInMatch } from '../../../types';
import { KeysOfType } from '../../../utils/types.ts';

export const useValidation = (match: IMatch, players: IPlayerInMatch[]) => {
  const { teamGoals, opponentGoals } = match;
  const getTotalArray = (type: KeysOfType<IPlayerInMatch, number>) => {
    return players
      .map((player): number => player[type])
      .reduce((prev: number, curr: number) => prev + curr, 0);
  };

  const getTotalTrue = (type: KeysOfType<IPlayerInMatch, boolean>) => {
    return players.filter(player => player[type]).length;
  };

  const goals = getTotalArray('goals');
  const pens = getTotalArray('pensScored');
  const assists = getTotalArray('assists');
  const conceded = getTotalArray('conceded');
  const ownGoals = getTotalArray('ownGoals');
  const mvp = getTotalTrue('mvp');
  const mins = getTotalArray('minutes');
  const totalMins = 5 * 50;
  const validationMessages = [
    {
      isInvalid: mins !== totalMins,
      message: 'Mins error',
      value: `${mins}/${totalMins}`,
    },
    {
      isInvalid: goals > teamGoals,
      message: 'Goals error',
      value: `${goals}/${teamGoals}`,
    },
    {
      isInvalid: pens > teamGoals,
      message: 'Penalties error',
      value: `${pens}/${teamGoals}`,
    },
    {
      isInvalid: assists > teamGoals,
      message: 'Assists error',
      value: `${assists}/${teamGoals}`,
    },
    {
      isInvalid: conceded !== opponentGoals,
      message: 'Conceded error',
      value: `${conceded}/${opponentGoals}`,
    },
    {
      isInvalid: ownGoals > opponentGoals,
      message: 'Own goals error',
      value: `${ownGoals}/${opponentGoals}`,
    },
    {
      isInvalid: mvp !== 1,
      message: 'MVP error',
      value: `${mvp} selected`,
    },
  ];

  const isInvalid = validationMessages.some(message => message.isInvalid);

  return { isInvalid, validationMessages };
};
