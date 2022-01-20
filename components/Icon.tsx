import React from 'react';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { IconT, IconComponentT } from '../types';

const Icon = ({ color, name, size, style }: IconT) => (<Ionicons name={name} size={size} color={color} style={style} />);
const ButtonContinueIcon = ({ theme }: IconComponentT) => (<Icon name="chevron-forward" color={theme.GenralComponentColors.BUTTONICONCOLOR2} size={theme.GenralComponentColors.BUTTONICONSIZE2} />);
const PrimaryLoadingIndicator = ({ theme }: IconComponentT) => (<ActivityIndicator color={theme.GenralComponentColors.BUTTONICONCOLOR2} size={theme.GenralComponentColors.BUTTONICONSIZE2} />)
const LocationIcon = ({ theme }: IconComponentT) => (<Icon name="location" color={theme.GenralComponentColors.INFORMATIVE} size={theme.GenralComponentColors.BUTTONICONSIZE5} />)
const LoadIndicator = ({ theme }: IconComponentT) => (<ActivityIndicator color={theme.GenralComponentColors.BUTTONICONCOLOR1} size={theme.GenralComponentColors.BUTTONICONSIZE2} />);
const NameIcon = ({ theme }: IconComponentT) => (<Icon name="ios-text" color={theme.GenralComponentColors.BUTTONICONCOLOR2} size={theme.GenralComponentColors.BUTTONICONSIZE2} />);
const UsernameIcon = ({ theme }: IconComponentT) => (<Icon name="person-outline" color={theme.GenralComponentColors.BUTTONICONCOLOR2} size={theme.GenralComponentColors.BUTTONICONSIZE2} />);
const PasskeyIcon = ({ theme }: IconComponentT) => (<Icon name="lock-closed-outline" color={theme.GenralComponentColors.BUTTONICONCOLOR2} size={theme.GenralComponentColors.BUTTONICONSIZE2} />);
const ValidIcon = ({ theme }: IconComponentT) => (<Icon name="ios-checkmark" color={theme.GenralComponentColors.BUTTONICONCOLOR2} size={theme.GenralComponentColors.BUTTONICONSIZE2} />);
const ErrorIcon = ({ theme }: IconComponentT) => (<Icon name="ios-close" color={theme.GenralComponentColors.INFORMATIVE} size={theme.GenralComponentColors.BUTTONICONSIZE2} />);
const PassKeyVisibleIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><Icon name="ios-eye-outline" color={theme.GenralComponentColors.COMPLIMENTARY1} size={theme.GenralComponentColors.BUTTONICONSIZE2} /></TouchableOpacity>);
const PassKeyInVisibleIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><Icon name="ios-eye-off-outline" color={theme.GenralComponentColors.COMPLIMENTARY3} size={theme.GenralComponentColors.BUTTONICONSIZE2} /></TouchableOpacity>);
const RetryIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><Icon name="ios-reload" color={theme.GenralComponentColors.COMPLIMENTARY2} size={theme.GenralComponentColors.BUTTONICONSIZE2} /></TouchableOpacity>);
const AllGenderIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialCommunityIcons name="gender-male-female" color={theme.GenralComponentColors.PRIMARY} size={theme.GenralComponentColors.BUTTONICONSIZE3} /></TouchableOpacity>);
const MaleGenderIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialCommunityIcons name="gender-male" color={theme.GenralComponentColors.PRIMARY} size={theme.GenralComponentColors.BUTTONICONSIZE3} /></TouchableOpacity>);
const FemaleGenderIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialCommunityIcons name="gender-female" color={theme.GenralComponentColors.PRIMARY} size={theme.GenralComponentColors.BUTTONICONSIZE3} /></TouchableOpacity>);
const NOGenderIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialCommunityIcons name="gender-non-binary" color={theme.GenralComponentColors.PRIMARY} size={theme.GenralComponentColors.BUTTONICONSIZE3} /></TouchableOpacity>);
const VIPIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialIcons name="star" color={theme.GenralComponentColors.VIP} size={theme.GenralComponentColors.BUTTONICONSIZE3} /></TouchableOpacity>);
const PremiumIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialIcons name="star" color={theme.GenralComponentColors.PREMIUM} size={theme.GenralComponentColors.BUTTONICONSIZE3} /></TouchableOpacity>);
const BasicIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialIcons name="star" color={theme.GenralComponentColors.BASIC} size={theme.GenralComponentColors.BUTTONICONSIZE3} /></TouchableOpacity>);
const AllIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialIcons name="select-all" color={theme.GenralComponentColors.HIGHLIGHT} size={theme.GenralComponentColors.BUTTONICONSIZE3} /></TouchableOpacity>);
const NopeIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()} style={theme.Icons.Nope}><Icon name="ios-close" color={theme.GenralComponentColors.INFORMATIVE} size={theme.GenralComponentColors.BUTTONICONSIZE4} /></TouchableOpacity>);
const YupIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()} style={theme.Icons.Yup}><Icon name="ios-checkmark" color={theme.GenralComponentColors.SUCCESS} size={theme.GenralComponentColors.BUTTONICONSIZE4} /></TouchableOpacity>);
const GiftIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()} style={theme.Icons.Gift}><Icon name="gift" color={theme.GenralComponentColors.GIFT} size={theme.GenralComponentColors.BUTTONICONSIZE4} /></TouchableOpacity>);
const MaleSexIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialCommunityIcons name="gender-male" color={theme.GenralComponentColors.GICOMPLIMENTARY3} size={theme.GenralComponentColors.BUTTONICONSIZE4} /></TouchableOpacity>);
const FemaleSexIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialCommunityIcons name="gender-female" color={theme.GenralComponentColors.GICOMPLIMENTARY3} size={theme.GenralComponentColors.BUTTONICONSIZE4} /></TouchableOpacity>);
const BloodBagIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialIcons name="invert-colors" color={theme.GenralComponentColors.BLOOD} size={theme.GenralComponentColors.BUTTONICONSIZE4} /></TouchableOpacity>);
const VerifiedUser100Icon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialIcons name="verified-user" color={theme.GenralComponentColors.VERIFIEDUSER} size={theme.GenralComponentColors.BUTTONICONSIZE5} /></TouchableOpacity>);
const VerifiedUser50Icon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialIcons name="security" color={theme.GenralComponentColors.VERIFIED50USER} size={theme.GenralComponentColors.BUTTONICONSIZE5} /></TouchableOpacity>);
const VerifiedUser10Icon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><Icon name="ios-alert-circle-outline" color={theme.GenralComponentColors.VERIFIED10USER} size={theme.GenralComponentColors.BUTTONICONSIZE5} /></TouchableOpacity>);
const VIPDisplayIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialIcons name="grade" color={theme.GenralComponentColors.VIP} size={theme.GenralComponentColors.BUTTONICONSIZE5} /></TouchableOpacity>);
const PREMIUMDisplayIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialIcons name="grade" color={theme.GenralComponentColors.PREMIUM} size={theme.GenralComponentColors.BUTTONICONSIZE5} /></TouchableOpacity>);
const BASICDisplayIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialIcons name="grade" color={theme.GenralComponentColors.BASIC} size={theme.GenralComponentColors.BUTTONICONSIZE5} /></TouchableOpacity>);
const FilterIcon = ({ theme }: IconComponentT) => (<MaterialCommunityIcons name="filter-variant" color={theme.GenralComponentColors.HIGHLIGHT} size={theme.GenralComponentColors.BUTTONICONSIZE2} />);
//Header Icons with background
const MenuIcon = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity style={theme.HeaderIconWithBackground.container} onPress={() => actionPressed()}><MaterialCommunityIcons name="menu" color={theme.GenralComponentColors.COMPLIMENTARY2} size={theme.GenralComponentColors.AlertICONSIZE1} /></TouchableOpacity>);



//Alert Icons
const SuccessAlertIcon = ({ theme }: IconComponentT) => (<Icon name="ios-checkmark-circle" color={theme.GenralComponentColors.SUCCESS} size={theme.GenralComponentColors.AlertICONSIZE1} />);
const ErrorAlertIcon = ({ theme }: IconComponentT) => (<MaterialIcons name="error" color={theme.GenralComponentColors.ERROR} size={theme.GenralComponentColors.AlertICONSIZE1} />);
const WarningAlertIcon = ({ theme }: IconComponentT) => (<Icon name="ios-warning" color={theme.GenralComponentColors.WARNING} size={theme.GenralComponentColors.AlertICONSIZE1} />);
const NormalAlertIcon = ({ theme }: IconComponentT) => (<Entypo name="notification" color={theme.GenralComponentColors.NORMAL} size={theme.GenralComponentColors.AlertICONSIZE1} />);

//MATCH Header Icons
const DropDown = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialCommunityIcons name="menu-down" color={theme.GenralComponentColors.HIGHLIGHT} size={theme.GenralComponentColors.BUTTONICONSIZE1} /></TouchableOpacity>);
const DropUp = ({ theme, actionPressed = () => { } }: IconComponentT) => (<TouchableOpacity onPress={() => actionPressed()}><MaterialCommunityIcons name="menu-up" color={theme.GenralComponentColors.HIGHLIGHT} size={theme.GenralComponentColors.BUTTONICONSIZE1} /></TouchableOpacity>);

export {
    Icon,
    LoadIndicator,
    ButtonContinueIcon,
    PrimaryLoadingIndicator,
    LocationIcon,
    NameIcon,
    UsernameIcon,
    PasskeyIcon,
    ValidIcon,
    ErrorIcon,
    PassKeyVisibleIcon,
    PassKeyInVisibleIcon,
    RetryIcon,
    SuccessAlertIcon,
    ErrorAlertIcon,
    WarningAlertIcon,
    NormalAlertIcon,
    DropDown,
    DropUp,
    FilterIcon,
    MenuIcon,
    AllGenderIcon,
    MaleGenderIcon,
    FemaleGenderIcon,
    NOGenderIcon,
    VIPIcon,
    PremiumIcon,
    BasicIcon,
    AllIcon,
    NopeIcon,
    YupIcon,
    GiftIcon,
    MaleSexIcon,
    FemaleSexIcon,
    BloodBagIcon,
    VerifiedUser100Icon,
    VerifiedUser50Icon,
    VerifiedUser10Icon,
    VIPDisplayIcon,
    PREMIUMDisplayIcon,
    BASICDisplayIcon
};
