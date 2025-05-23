import { TypedDocumentNode, gql } from '@apollo/client';
import { IMatch } from '../../../types';
export const EDIT_MATCH: TypedDocumentNode<{
  match: IMatch;
}> = gql`
  mutation EditMatch(
    $matchId: String!
    $teamId: ID!
    $seasonId: ID!
    $opponentId: ID!
    $competitionId: ID!
    $opponentGoals: Float!
    $teamGoals: Float!
    $date: String!
    $isHome: Boolean!
    $isForfeit: Boolean!
    $leaguePosition: Float
    $cupRound: String
    $matchPlayers: [PlayerInMatchInput!]!
  ) {
    editMatch(
      matchId: $matchId
      data: {
        teamId: $teamId
        seasonId: $seasonId
        date: $date
        competitionId: $competitionId
        opponentId: $opponentId
        teamGoals: $teamGoals
        opponentGoals: $opponentGoals
        isHome: $isHome
        isForfeit: $isForfeit
        leaguePosition: $leaguePosition
        cupRound: $cupRound
        matchPlayers: $matchPlayers
      }
    ) {
      _id
    }
  }
`;
