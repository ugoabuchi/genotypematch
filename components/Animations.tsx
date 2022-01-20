import React from 'react';
import * as Animatable from 'react-native-animatable';
import { PulseAnimationType } from '../types';

export const PulseViewAnimation = ({ propData }: PulseAnimationType) => <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">{propData}</Animatable.View>
export const SlideInFromRightViewAnimation = ({ propData, viewStyle }: PulseAnimationType) => <Animatable.View animation='slideInRight' {...viewStyle}>{propData}</Animatable.View>
