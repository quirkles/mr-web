import React from 'react';
import { Path, useForm } from 'react-hook-form';
import { positionOptions } from '../../../../app/constants';
import { FormContainer } from '../../../../components/containers';
import { CenteredGrid, GridItem } from '../../../../components/grids';
import ControlledDateInput from '../../../../components/inputs/ControlledDateInput';
import ControlledMultiSelectInput from '../../../../components/inputs/ControlledMultiSelectInput';
import ControlledSelectInput from '../../../../components/inputs/ControlledSelectInput';
import ControlledSwitchInput from '../../../../components/inputs/ControlledSwitchInput';
import ControlledTextInput from '../../../../components/inputs/ControlledTextInput';
import { ISelectOptions } from '../../../../components/inputs/SelectInput';
import TextList from '../../../../components/lists/TextList';
import { IListItem, IPlayer } from '../../../../types';
import { getIntegers } from '../../../../utils/helpers';

interface Props {
  onSubmit: (data: Partial<IPlayer>) => void;
  defaultValues: Partial<IPlayer>;
  countryOptions: ISelectOptions[];
  seasonOptions: ISelectOptions[];
}

const PlayerForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  countryOptions,
  seasonOptions,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<Partial<IPlayer>>({
    defaultValues,
  });

  const switchComp = (name: Path<IPlayer>) => {
    return <ControlledSwitchInput control={control} name={name} />;
  };

  const seasonIds = watch('seasonIds');
  const disabled = (seasonIds?.length || 0) < 1;

  const switchList: IListItem[] = [
    {
      label: 'Is player active?',
      value: switchComp('isActive'),
    },
    {
      label: 'Is player team captain?',
      value: switchComp('isCaptain'),
    },
    {
      label: 'Is player team vice captain?',
      value: switchComp('isViceCaptain'),
    },
    {
      label: 'Is player in the hall of fame?',
      value: switchComp('isHallOfFame'),
    },
  ];

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} disabled={disabled}>
      <CenteredGrid dir="row">
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="name"
            rules={{ required: true, minLength: 2, maxLength: 50 }}
            label="Name"
            errors={errors.name ? [errors.name] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="nationality"
            label="Nationality"
            options={countryOptions}
            errors={errors.nationality ? [errors.nationality] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledDateInput
            control={control}
            name="dateOfBirth"
            label="Date of Birth"
            openTo="year"
            errors={errors.dateOfBirth ? [errors.dateOfBirth] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledDateInput
            control={control}
            name="yearJoined"
            label="Year Joined"
            view="year"
            errors={errors.yearJoined ? [errors.yearJoined] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="position"
            label="Position"
            options={positionOptions}
            errors={errors.position ? [errors.position] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="squadNumber"
            label="Squad Number"
            options={getIntegers(99)}
            errors={errors.squadNumber ? [errors.squadNumber] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledMultiSelectInput
            control={control}
            name="seasonIds"
            rules={{ required: true }}
            options={seasonOptions}
            label="Seasons Played"
            errors={
              errors.seasonIds
                ? [
                    {
                      name: 'seasonIds',
                      message:
                        (Array.isArray(errors.seasonIds)
                          ? errors.seasonIds[0]?.message
                          : errors.seasonIds?.message) || 'This field is required',
                    },
                  ]
                : []
            }
          />
        </GridItem>
      </CenteredGrid>
      <TextList data={switchList} />
    </FormContainer>
  );
};

export default PlayerForm;
