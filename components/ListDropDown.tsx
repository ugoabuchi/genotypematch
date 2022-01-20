import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { DropdownListParamType, ListDropDownParamType, StateListDropDownParamType } from "../types";
import { AllGenderIcon, FemaleGenderIcon, MaleGenderIcon, NOGenderIcon, VIPIcon, PremiumIcon, BasicIcon, AllIcon } from "./Icon";
import ModalDropdown from 'react-native-modal-dropdown';
import { myCountryList, myCountryStatelist } from "./common";


const AccountListDropDown = ({ theme, defaultIndex = 0, language, yourCallBack }: ListDropDownParamType) => {
  const [value, setValue] = useState(language.GENERAL.ACCOUNT_LIST[defaultIndex])
  useEffect(() => {
    setValue(language.GENERAL.ACCOUNT_LIST[defaultIndex]);
  }, [defaultIndex]);

  return (
    <View style={theme.CountryPickerStyle.PickerBox.container}>
      <ModalDropdown
        style={
          value != language.GENERAL.ACCOUNT_LIST[4]
            ?
            theme.CountryPickerStyle.PickerBox.StyleContainer1
            :
            theme.CountryPickerStyle.PickerBox.StyleContainer2
        }
        showsVerticalScrollIndicator={true}
        defaultValue={value}
        textStyle={theme.CountryPickerStyle.PickerBox.TextStyle}
        dropdownStyle={value != language.GENERAL.ACCOUNT_LIST[4] ? theme.CountryPickerStyle.PickerBox.DropdownStyle1 : theme.CountryPickerStyle.PickerBox.DropdownStyle2}
        dropdownTextStyle={theme.CountryPickerStyle.PickerBox.DropdownTextStyle}
        onSelect={(index, option) => {
          yourCallBack(index)
        }
        }

        options={language.GENERAL.ACCOUNT_LIST}
      />

      {
        value != language.GENERAL.ACCOUNT_LIST[4]
        &&
        <View style={theme.CountryPickerStyle.PickerBox.IconStyle}>
          {
            (
              value == language.GENERAL.ACCOUNT_LIST[0]
                ?
                <AllIcon theme={theme} />
                :
                (
                  value == language.GENERAL.ACCOUNT_LIST[1]
                    ?
                    <BasicIcon theme={theme} />
                    :
                    (
                      value == language.GENERAL.ACCOUNT_LIST[2]
                        ?
                        <PremiumIcon theme={theme} />
                        :
                        <VIPIcon theme={theme} />
                    )
                )
            )
          }
        </View>
      }
    </View>
  );


}


const GenderListDropDown = ({ theme, defaultIndex = 0, language, yourCallBack }: ListDropDownParamType) => {
  const [value, setValue] = useState(language.GENERAL.GENDER_LIST[defaultIndex])
  useEffect(() => {
    setValue(language.GENERAL.GENDER_LIST[defaultIndex]);
  }, [defaultIndex]);

  return (
    <View style={theme.CountryPickerStyle.PickerBox.container}>
      <ModalDropdown
        style={theme.CountryPickerStyle.PickerBox.StyleContainer1}
        showsVerticalScrollIndicator={true}
        defaultValue={value}
        textStyle={theme.CountryPickerStyle.PickerBox.TextStyle}
        dropdownStyle={theme.CountryPickerStyle.PickerBox.DropdownStyle1}
        dropdownTextStyle={theme.CountryPickerStyle.PickerBox.DropdownTextStyle}
        onSelect={(index, option) => {
          yourCallBack(index)
        }
        }

        options={language.GENERAL.GENDER_LIST}
      />

      <View style={theme.CountryPickerStyle.PickerBox.IconStyle}>
        {
          (
            value == language.GENERAL.GENDER_LIST[0]
              ?
              <AllGenderIcon theme={theme} />
              :
              (
                value == language.GENERAL.GENDER_LIST[1]
                  ?
                  <MaleGenderIcon theme={theme} />
                  :
                  (
                    value == language.GENERAL.GENDER_LIST[2]
                      ?
                      <FemaleGenderIcon theme={theme} />
                      :
                      <NOGenderIcon theme={theme} />
                  )
              )
          )
        }
      </View>
    </View>
  );


}

const AgeListDropDown = ({ theme, defaultIndex = 0, language, yourCallBack }: ListDropDownParamType) => {
  const [value, setValue] = useState(language.GENERAL.AGERANGE_LIST[defaultIndex])
  useEffect(() => {
    setValue(language.GENERAL.AGERANGE_LIST[defaultIndex]);
  }, [defaultIndex]);

  return (
    <View style={theme.CountryPickerStyle.PickerBox.container}>
      <ModalDropdown
        style={theme.CountryPickerStyle.PickerBox.StyleContainer2}
        showsVerticalScrollIndicator={true}
        defaultValue={value}
        textStyle={theme.CountryPickerStyle.PickerBox.TextStyle}
        dropdownStyle={theme.CountryPickerStyle.PickerBox.DropdownStyle2}
        dropdownTextStyle={theme.CountryPickerStyle.PickerBox.DropdownTextStyle}
        onSelect={(index, option) => {
          yourCallBack(index)
        }
        }

        options={language.GENERAL.AGERANGE_LIST}
      />
    </View>
  );


}


const GenotypeListDropDown = ({ theme, defaultIndex = 0, language, yourCallBack }: ListDropDownParamType) => {
  const [value, setValue] = useState(language.GENERAL.GENOTYPE_LIST[defaultIndex])
  useEffect(() => {
    setValue(language.GENERAL.GENOTYPE_LIST[defaultIndex]);
  }, [defaultIndex]);

  return (
    <View style={theme.CountryPickerStyle.PickerBox.container}>
      <ModalDropdown
        style={theme.CountryPickerStyle.PickerBox.StyleContainer2}
        showsVerticalScrollIndicator={true}
        defaultValue={value}
        textStyle={theme.CountryPickerStyle.PickerBox.TextStyle}
        dropdownStyle={theme.CountryPickerStyle.PickerBox.DropdownStyle2}
        dropdownTextStyle={theme.CountryPickerStyle.PickerBox.DropdownTextStyle}
        onSelect={(index, option) => {
          yourCallBack(index)
        }
        }

        options={language.GENERAL.GENOTYPE_LIST}
      />
    </View>
  );


}



const CountryListDropDown = ({ theme, defaultIndex = 0, yourCallBack }: ListDropDownParamType) => {
  const [value, setValue] = useState(myCountryList()[defaultIndex])
  const [countries] = useState(myCountryList())
  useEffect(() => {
    setValue(countries[defaultIndex]);
  }, [defaultIndex]);

  return (
    <View style={theme.CountryPickerStyle.PickerBox.container}>
      <ModalDropdown
        style={theme.CountryPickerStyle.PickerBox.StyleContainer2}
        showsVerticalScrollIndicator={true}
        defaultValue={value}
        textStyle={theme.CountryPickerStyle.PickerBox.TextStyle}
        dropdownStyle={theme.CountryPickerStyle.PickerBox.DropdownStyle2}
        dropdownTextStyle={theme.CountryPickerStyle.PickerBox.DropdownTextStyle}
        onSelect={(index, option) => {
          yourCallBack(index)
        }
        }
        options={countries}
      />
    </View>
  );


}



const CountryStateListDropDown = ({ theme, countryCode = 'dz', defaultIndex = 0, yourCallBack }: StateListDropDownParamType) => {
  const [value, setValue] = useState(myCountryStatelist(countryCode)[defaultIndex])
  const [countryState, setCountryState] = useState(myCountryStatelist(countryCode))
  useEffect(() => {
    setCountryState(myCountryStatelist(countryCode))
  }, [countryCode]);

  return (
    <View style={theme.CountryPickerStyle.PickerBox.container}>
      <ModalDropdown
        style={theme.CountryPickerStyle.PickerBox.StyleContainer2}
        showsVerticalScrollIndicator={true}
        defaultValue={value}
        textStyle={theme.CountryPickerStyle.PickerBox.TextStyle}
        dropdownStyle={theme.CountryPickerStyle.PickerBox.DropdownStyle2}
        dropdownTextStyle={theme.CountryPickerStyle.PickerBox.DropdownTextStyle}
        onSelect={(index, option) => {
          yourCallBack(index)
        }
        }
        options={countryState}
      />
    </View>
  );


}

const DropdownListDropDown = ({ theme, items, defaultIndex = 0, yourCallBack }: DropdownListParamType) => {
  const [value, setValue] = useState(items[defaultIndex])
  const [listItems, setlistItems] = useState(items)
  useEffect(() => {
    setlistItems(items);
  }, [items]);

  useEffect(() => {
    setValue(defaultIndex);
  }, [defaultIndex]);

  return (
    <View style={theme.CountryPickerStyle.PickerBox.container}>
      <ModalDropdown
        style={theme.CountryPickerStyle.PickerBox.StyleContainer2}
        showsVerticalScrollIndicator={true}
        defaultValue={value}
        textStyle={theme.CountryPickerStyle.PickerBox.TextStyle}
        dropdownStyle={theme.CountryPickerStyle.PickerBox.DropdownStyle2}
        dropdownTextStyle={theme.CountryPickerStyle.PickerBox.DropdownTextStyle}
        onSelect={(index, option) => {
          yourCallBack(index)
        }
        }
        options={listItems}
      />
    </View>
  );


}

export {
  DropdownListDropDown,
  AccountListDropDown,
  GenderListDropDown,
  CountryListDropDown,
  CountryStateListDropDown,
  AgeListDropDown,
  GenotypeListDropDown
};
