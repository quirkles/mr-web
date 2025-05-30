import React from 'react';
import { Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import AppIcon from '../icons/AppIcon';
import { IIconType } from '../icons/types';

const PREFIX = 'CustomIconButton';
const classes = {
  button: `${PREFIX}-button`,
};

const StyledButton = styled(Button)(({ theme }) => ({
  [`&.${classes.button}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 0,
    color: theme.palette.common.white,
  },
}));

interface Props {
  icon: IIconType;
  size?: string;
  color?: string;
  onClick: () => void;
}

const CustomIconButton: React.FC<Props> = ({ icon, size = '1rem', color, onClick }) => {
  const theme = useTheme();

  const colorToDisplay = color || theme.palette.common.white;

  return (
    <StyledButton onClick={onClick} className={classes.button}>
      <AppIcon icon={icon} size={size} color={colorToDisplay} />
    </StyledButton>
  );
};

export default CustomIconButton;
