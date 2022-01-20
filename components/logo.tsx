import React, { useState, useEffect } from "react";
import { Image, ImageSourcePropType } from "react-native";


const LogoIcon = ({ }) => {
  const [profileImageSrc, setprofileImageSrc] = useState<ImageSourcePropType>(null);
  useEffect(() => {

    async function loadStaticImages() {
      setprofileImageSrc(require('../assets/resources/images/logo.png'));
    }

    loadStaticImages();

  }, []);
  return (
    <Image
      source={profileImageSrc}
      style={{ width: '100%', height: '100%' }}
      resizeMode='contain'
    />
  );


}

const LogoWTBIcon = ({ }) => {
  const [profileImageSrc, setprofileImageSrc] = useState<ImageSourcePropType>(null);
  useEffect(() => {

    async function loadStaticImages() {
      setprofileImageSrc(require('../assets/resources/images/logo_with_text_below.png'));
    }

    loadStaticImages();

  }, []);
  return (
    <Image
      source={profileImageSrc}
      style={{ width: '100%', height: '100%' }}
      resizeMode='contain'
    />
  );


}

const LogoWTDIcon = ({ }) => {
  const [profileImageSrc, setprofileImageSrc] = useState<ImageSourcePropType>(null);
  useEffect(() => {

    async function loadStaticImages() {
      setprofileImageSrc(require('../assets/resources/images/logo_with_text_desc.png'));
    }

    loadStaticImages();

  }, []);
  return (
    <Image
      source={profileImageSrc}
      style={{ width: '100%', height: '100%' }}
      resizeMode='contain'
    />
  );


}

const LogoWTIcon = ({ }) => {
  const [profileImageSrc, setprofileImageSrc] = useState<ImageSourcePropType>(null);
  useEffect(() => {

    async function loadStaticImages() {
      setprofileImageSrc(require('../assets/resources/images/logo_with_text.png'));
    }

    loadStaticImages();

  }, []);
  return (
    <Image
      source={profileImageSrc}
      style={{ width: '100%', height: '100%' }}
      resizeMode='contain'
    />
  );


}

const SampleUsersImage = ({ }) => {
  const [profileImageSrc, setprofileImageSrc] = useState<ImageSourcePropType>(null);
  useEffect(() => {

    async function loadStaticImages() {
      setprofileImageSrc(require('../assets/resources/images/sample_users.png'));
    }

    loadStaticImages();

  }, []);
  return (
    <Image
      source={profileImageSrc}
      style={{ width: '100%', height: '100%' }}
      resizeMode='contain'
    />
  );


}

export { LogoIcon, LogoWTBIcon, LogoWTDIcon, LogoWTIcon, SampleUsersImage };
