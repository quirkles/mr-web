import React from 'react';
import { BiLogIn, BiCog, BiArrowBack } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';
import { IoShieldSharp } from 'react-icons/io5';
import { PiTrophyBold } from 'react-icons/pi';
import { TbUsers, TbSoccerField } from 'react-icons/tb';
import { TfiMenu } from 'react-icons/tfi';
import * as icons from '.';
import { IIconType } from './types';
import { getIconColor } from './utils/getIconColor';
import { theme } from '../../theme';

interface Props {
  icon: IIconType;
  size?: string;
  color?: string;
  bold?: boolean;
}

const NavIcon: React.FC<Props> = ({ icon, size = '1rem', color = theme.palette.primary.main }) => {
  const iconColor = getIconColor(color);

  switch (icon) {
    case icons.homeIcon:
      return <HiHome size={size} color={iconColor} />;
    case icons.profileIcon:
      return <FaUserCircle size={size} color={iconColor} />;
    case icons.squadIcon:
      return <TbUsers size={size} color={iconColor} />;
    case icons.resultsIcon:
      return <TbSoccerField size={size} color={iconColor} />;
    case icons.teamIcon:
      return <IoShieldSharp size={size} color={iconColor} />;
    case icons.historyIcon:
      return <PiTrophyBold size={size} color={iconColor} />;
    case icons.signinIcon:
      return <BiLogIn size={size} color={iconColor} />;
    case icons.settingsIcon:
      return <BiCog size={size} color={iconColor} />;
    case icons.backIcon:
      return <BiArrowBack size={size} color={iconColor} />;
    case icons.menuIcon:
      return <TfiMenu size={size} color={iconColor} />;
    default:
      break;
  }
};

export default NavIcon;
