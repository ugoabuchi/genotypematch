import { StyleSheet, Dimensions } from "react-native";
import { StyleTransparentType } from "../types";

//get screen height
const { height, width } = Dimensions.get("screen");

const LightTheme = {

    PRIMARY: "#1F3A68",
    HIGHLIGHT: "#00B7EC",
    INFORMATIVE: "#FF0808",
    COMPLIMENTARY1: "#EEEEEE",
    COMPLIMENTARY2: "#FFFFFF",
    COMPLIMENTARY3: "#000000",
    GIFT: "#C7208A",
    SUCCESS: "#3BFF03",
    ERROR: "#FF0808",
    WARNING: "#FF7003",
    VIP: "#B32624",
    PREMIUM: "#13265C",
    BLOOD: "#FF0808",
    VERIFIEDUSER: "#0FDE0B",
    VERIFIED50USER: "#D4AF37",
    VERIFIED10USER: "#FF0808",
    NOTIFICATION: "#0FDE0B",
    SUCCESSTRANSPARENT: (transparency: StyleTransparentType) => { return "#3BFF03" + transparency },
    ERRORTRANSPARENT: (transparency: StyleTransparentType) => { return "#FF0808" + transparency },
    WARNINGTRANSPARENT: (transparency: StyleTransparentType) => { return "#FF7003" + transparency },
    NORMALTRANSPARENT: (transparency: StyleTransparentType) => { return "#FFFFFF" + transparency },
    PRIMARYTRANSPARENT: (transparency: StyleTransparentType) => { return "#1F3A68" + transparency },
    HIGHLIGHTTRANSPARENT: (transparency: StyleTransparentType) => { return "#00B7EC" + transparency },
    INFORMATIVETRANSPARENT: (transparency: StyleTransparentType) => { return "#FF0800" + transparency },
    COMPLIMENTARY1TRANSPARENT: (transparency: StyleTransparentType) => { return "#EEEEEE" + transparency },
    COMPLIMENTARY2TRANSPARENT: (transparency: StyleTransparentType) => { return "#FFFFFF" + transparency },
    COMPLIMENTARY3TRANSPARENT: (transparency: StyleTransparentType) => { return "#000000" + transparency },
    FONT1: "LeagueSpartan-Bold",
    FONT2: "BakerieSmooth-Regular",
    EXTRALARGEFONTSIZE: height >= 500 ? 30 : 28,
    VERYLARGEFONTSIZE: height >= 500 ? 20 : 18,
    LARGEFONTSIZE: height >= 500 ? 16 : 15,
    MEDIUMFONTSIZE: height >= 500 ? 15 : 14,
    SMALLFONTSIZE: height >= 500 ? 14 : 12,
    EXTRASMALLFONTSIZE: height >= 500 ? 12 : 10,
    TINYFONTSIZE: 10,
    BUTTONICONSIZE1: height >= 500 ? 16 : 14,
    BUTTONICONSIZE2: height >= 500 ? 18 : 16,
    BUTTONICONSIZE3: height >= 500 ? 22 : 20,
    BUTTONICONSIZE4: height >= 500 ? 24 : 22,
    AlertICONSIZE1: height >= 500 ? 22 : 20,
    AlertICONSIZE2: height >= 500 ? 24 : 22,
    BUTTONICONSIZE5: height >= 500 ? 26 : 24

}

const DarkTheme = {

    PRIMARY: "#000000",
    HIGHLIGHT: "#FFFFFF",
    INFORMATIVE: "#FF0808",
    COMPLIMENTARY1: "#EEEEEE",
    COMPLIMENTARY2: "#00B7EC",
    COMPLIMENTARY3: "#1F3A68",
    GIFT: "#C7208A",
    SUCCESS: "#3BFF03",
    ERROR: "#FF0808",
    WARNING: "#FF7003",
    VIP: "#B32624",
    PREMIUM: "#13265C",
    BLOOD: "#FF0808",
    VERIFIEDUSER: "#0FDE0B",
    VERIFIED50USER: "#D4AF37",
    VERIFIED10USER: "#FF0808",
    NOTIFICATION: "#0FDE0B",
    SUCCESSTRANSPARENT: (transparency: StyleTransparentType) => { return "#3BFF03" + transparency },
    ERRORTRANSPARENT: (transparency: StyleTransparentType) => { return "#FF0808" + transparency },
    WARNINGTRANSPARENT: (transparency: StyleTransparentType) => { return "#FF7003" + transparency },
    NORMALTRANSPARENT: (transparency: StyleTransparentType) => { return "#FFFFFF" + transparency },
    PRIMARYTRANSPARENT: (transparency: StyleTransparentType) => { return "#000000" + transparency },
    HIGHLIGHTTRANSPARENT: (transparency: StyleTransparentType) => { return "#FFFFFF" + transparency },
    INFORMATIVETRANSPARENT: (transparency: StyleTransparentType) => { return "#FF0800" + transparency },
    COMPLIMENTARY1TRANSPARENT: (transparency: StyleTransparentType) => { return "#EEEEEE" + transparency },
    COMPLIMENTARY2TRANSPARENT: (transparency: StyleTransparentType) => { return "#00B7EC" + transparency },
    COMPLIMENTARY3TRANSPARENT: (transparency: StyleTransparentType) => { return "#1F3A68" + transparency },
    FONT1: "LeagueSpartan-Bold",
    FONT2: "BakerieSmooth-Regular",
    EXTRALARGEFONTSIZE: height >= 500 ? 30 : 28,
    VERYLARGEFONTSIZE: height >= 500 ? 20 : 18,
    LARGEFONTSIZE: height >= 500 ? 16 : 15,
    MEDIUMFONTSIZE: height >= 500 ? 15 : 14,
    SMALLFONTSIZE: height >= 500 ? 14 : 12,
    EXTRASMALLFONTSIZE: height >= 500 ? 12 : 10,
    TINYFONTSIZE: 10,
    BUTTONICONSIZE1: height >= 500 ? 16 : 14,
    BUTTONICONSIZE2: height >= 500 ? 18 : 16,
    BUTTONICONSIZE3: height >= 500 ? 22 : 20,
    BUTTONICONSIZE4: height >= 500 ? 24 : 22,
    AlertICONSIZE1: height >= 500 ? 22 : 20,
    AlertICONSIZE2: height >= 500 ? 24 : 22,
    BUTTONICONSIZE5: height >= 500 ? 26 : 24

}

const LightMode = {

    GenralComponentColors: {

        PRIMARY: LightTheme.PRIMARY,
        HIGHLIGHT: LightTheme.HIGHLIGHT,
        INFORMATIVE: LightTheme.INFORMATIVE,
        COMPLIMENTARY1: LightTheme.COMPLIMENTARY1,
        COMPLIMENTARY2: LightTheme.COMPLIMENTARY2,
        COMPLIMENTARY3: LightTheme.COMPLIMENTARY3,
        GIFT: LightTheme.GIFT,
        SUCCESS: LightTheme.SUCCESS,
        ERROR: LightTheme.ERROR,
        WARNING: LightTheme.WARNING,
        NORMAL: LightTheme.HIGHLIGHT,
        VIP: LightTheme.VIP,
        PREMIUM: LightTheme.PREMIUM,
        BASIC: LightTheme.PRIMARY,
        BLOOD: LightTheme.BLOOD,
        VERIFIEDUSER: LightTheme.VERIFIEDUSER,
        VERIFIED50USER: LightTheme.VERIFIED50USER,
        VERIFIED10USER: LightTheme.VERIFIED10USER,
        NOTIFICATION: LightTheme.NOTIFICATION,
        SUCCESSTRANSPARENT: LightTheme.SUCCESSTRANSPARENT,
        ERRORTRANSPARENT: LightTheme.ERRORTRANSPARENT,
        WARNINGTRANSPARENT: LightTheme.WARNINGTRANSPARENT,
        NORMALTRANSPARENT: LightTheme.NORMALTRANSPARENT,
        PRIMARYTRANSPARENT: LightTheme.PRIMARYTRANSPARENT,
        HIGHLIGHTTRANSPARENT: LightTheme.HIGHLIGHTTRANSPARENT,
        INFORMATIVETRANSPARENT: LightTheme.INFORMATIVETRANSPARENT,
        COMPLIMENTARY1TRANSPARENT: LightTheme.COMPLIMENTARY1TRANSPARENT,
        COMPLIMENTARY2TRANSPARENT: LightTheme.COMPLIMENTARY2TRANSPARENT,
        COMPLIMENTARY3TRANSPARENT: LightTheme.COMPLIMENTARY3TRANSPARENT,
        FONT1: LightTheme.FONT1,
        FONT2: LightTheme.FONT2,
        EXTRALARGEFONTSIZE: LightTheme.EXTRALARGEFONTSIZE,
        VERYLARGEFONTSIZE: LightTheme.VERYLARGEFONTSIZE,
        LARGEFONTSIZE: LightTheme.LARGEFONTSIZE,
        MEDIUMFONTSIZE: LightTheme.MEDIUMFONTSIZE,
        SMALLFONTSIZE: LightTheme.SMALLFONTSIZE,
        EXTRASMALLFONTSIZE: LightTheme.EXTRASMALLFONTSIZE,
        TINYFONTSIZE: LightTheme.TINYFONTSIZE,
        BUTTONICONSIZE1: LightTheme.BUTTONICONSIZE1,
        BUTTONICONCOLOR1: LightTheme.COMPLIMENTARY2,
        BUTTONICONSIZE2: LightTheme.BUTTONICONSIZE2,
        BUTTONICONCOLOR2: LightTheme.HIGHLIGHT,
        AlertICONSIZE1: LightTheme.AlertICONSIZE1,
        AlertICONSIZE2: LightTheme.AlertICONSIZE2,
        BUTTONICONSIZE3: LightTheme.BUTTONICONSIZE3,
        BUTTONICONSIZE4: LightTheme.BUTTONICONSIZE4,
        BUTTONICONSIZE5: LightTheme.BUTTONICONSIZE5,

    },
    Icons: StyleSheet.create({

        Nope: {
            backgroundColor: LightTheme.COMPLIMENTARY2,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            elevation: 1,
            zIndex: 1,
            borderRadius: 4
        },
        Yup: {
            backgroundColor: LightTheme.COMPLIMENTARY2,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            elevation: 1,
            zIndex: 1,
            borderRadius: 4
        },
        Gift: {
            backgroundColor: LightTheme.COMPLIMENTARY2,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            elevation: 1,
            zIndex: 1,
            borderRadius: 4
        }
    }),
    HomeMatchBox: StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
        },
        header: {
            flexDirection: "row",
            width: "100%",
            height: "10%"
        },
        headerText: {
            width: "65%",
            height: "100%",
            textAlignVertical: "center",
            color: LightTheme.COMPLIMENTARY2,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.VERYLARGEFONTSIZE
        },
        headerFilterContainer: {
            flexDirection: "row",
            width: '35%',
            padding: 4,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: LightTheme.COMPLIMENTARY2,
            borderRadius: 5
        },
        headerFilterContainerText: {
            width: "50%",
            textAlignVertical: "center",
            textAlign: "right",
            color: LightTheme.COMPLIMENTARY3,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE
        },
        headerFilterContainerIconContainer: {
            width: "50%",
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        },
        body: {
            flex: 1,
            width: "100%",
            height: "90%",
            alignContent: "center",
            justifyContent: "center"
        },
        bodyContainer: {
            width: "100%",
            height: "80%",
            backgroundColor: LightTheme.COMPLIMENTARY1,
            borderRadius: 20
        },
        bodyChild1: {
            width: "100%",
            height: " 50%",
            flexDirection: "row"
        },

        bc1c1: {
            width: "22.5%",
            height: '100%',
            padding: "2%"
        },
        bc1c1child1: {
            width: "100%",
            height: "30%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
        },
        bc1c1childLoaaderContainer: {
            width: 40,
            height: 20,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
        },
        bc1c1child2: {
            width: "100%",
            textAlign: "center",
            color: LightTheme.PRIMARY,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.TINYFONTSIZE
        },
        bc1c1child3: {
            width: "100%",
            height: "30%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
        },
        bc1c2: {
            width: "55%",
            height: '100%',
            padding: "1.5%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
        },
        bc1c2child1: {
            width: '100%',
            height: '100%',
            borderRadius: 10,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: LightTheme.PRIMARY
        },
        bc1c2childContainer: {
            width: '100%',
            height: '100%',
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
        },
        bc1c2childContainerImage: {
            width: '100%',
            height: '100%',
            borderRadius: 10,
        },
        bc1c3: {
            width: "22.5%",
            height: '100%',
            padding: "2%"
        },
        bc1c3child1: {
            width: "100%",
            height: "30%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
        },
        bc1c3c1c1: {
            backgroundColor: LightTheme.NOTIFICATION,
            alignSelf: 'center'
        },
        bc1c3c1c2: {
            width: "100%",
            textAlign: "center",
            color: LightTheme.PRIMARY,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE
        },
        bc1c3child2: {
            width: "100%",
            height: "30%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
        },
        bc1c3child3: {
            width: "100%",
            height: "30%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: "10%"
        },


        bodyChild2: {
            width: "100%",
            height: " 50%",
            padding: "2%",
        },
        bc2c1: {
            width: "100%",
            height: " 45%",
        },
        bc2c1c1: {
            width: "100%",
            height: "30%",
            flexDirection: "row",

        },
        bc2c1c1child1: {
            width: "20%",
            height: "100%",
        },
        bc2c1c1child1Text: {
            width: "100%",
            height: "100%",
            textAlignVertical: "center",
            color: LightTheme.COMPLIMENTARY3,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE
        },
        b2c1c1child2: {
            width: "80%",
            height: "100%",
            backgroundColor: LightTheme.COMPLIMENTARY1,
            justifyContent: "center"
        },
        bc2c1c1child2Text: {
            width: "100%",
            textAlignVertical: "center",
            color: LightTheme.PRIMARY,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE,
            paddingLeft: 8
        },
        bc2c1c2: {
            width: "100%",
            height: "30%",
            flexDirection: "row",

        },
        bc2c1c2child1: {
            width: "20%",
            height: "100%",
        },
        bc2c1c2child1Text: {
            width: "100%",
            height: "100%",
            textAlignVertical: "center",
            color: LightTheme.COMPLIMENTARY3,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE
        },
        b2c1c2child2: {
            width: "80%",
            height: "100%",
            backgroundColor: LightTheme.COMPLIMENTARY1,
            justifyContent: "center"
        },
        bc2c1c2child2Text: {
            width: "100%",
            textAlignVertical: "center",
            color: LightTheme.PRIMARY,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE,
            paddingLeft: 8
        },
        bc2c1c3: {
            width: "100%",
            height: "30%",
            flexDirection: "row",

        },
        bc2c1c3child1: {
            width: "20%",
            height: "100%",
        },
        bc2c1c3child1Text: {
            width: "100%",
            height: "100%",
            textAlignVertical: "center",
            color: LightTheme.COMPLIMENTARY3,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE
        },
        b2c1c3child2: {
            width: "80%",
            height: "100%",
            backgroundColor: LightTheme.COMPLIMENTARY1,
            justifyContent: "center"
        },
        bc2c1c3child2Text: {
            width: "100%",
            textAlignVertical: "center",
            color: LightTheme.PRIMARY,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE,
            paddingLeft: 8
        },
        bc2c2: {
            width: "100%",
            height: "55%",
            paddingTop: "2%",
            flexDirection: "row",
        },
        bc2c2c1: {
            width: "20%",
            height: "100%",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        bc2c2c1Text: {
            width: "100%",
            textAlign: "center",
            color: LightTheme.PRIMARY,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE
        },
        bc2c2c2: {
            width: "30%",
            height: "100%",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        bc2c2c2Text: {
            width: "100%",
            textAlign: "center",
            color: LightTheme.PRIMARY,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE
        },
        bc2c2c3: {
            width: "30%",
            height: "100%",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        bc2c2c3Text: {
            width: "100%",
            textAlign: "center",
            color: LightTheme.PRIMARY,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE
        },
        bc2c2c4: {
            width: "20%",
            height: "100%",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        bc2c2c4Text: {
            width: "100%",
            textAlign: "center",
            color: LightTheme.PRIMARY,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE
        },
        loaderView: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        loaderContainer: {
            width: '15%',
            height: '15%',
            padding: 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: LightTheme.PRIMARY,
            borderRadius: 15
        },
        loaderTextContainer: {
            width: '90%',
            padding: 3,
            justifyContent: 'center',
            alignItems: 'center',
        },
        loaderText: {
            color: '#000000',
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.EXTRASMALLFONTSIZE
        },
        locationView: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        locationContainer: {
            width: '70%',
            height: '50%',
            padding: 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: LightTheme.COMPLIMENTARY2,
            borderRadius: 15,
            marginBottom: "2%"
        },
        locationContainIconBox: {
            width: "100%",
            height: "40%",
            justifyContent: 'center',
            alignItems: 'center',
        },
        locationButtonBox: {
            width: "100%",
            height: "30%",
            justifyContent: 'center',
            alignItems: 'center',
        },
        locationTextContainer: {
            width: '90%',
            padding: 3,
            justifyContent: 'center',
            alignItems: 'center',
        },
        locationText: {
            color: LightTheme.COMPLIMENTARY3,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.EXTRASMALLFONTSIZE
        },
        locationTextBlocked: {
            color: LightTheme.INFORMATIVE,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.EXTRASMALLFONTSIZE
        }



    }),
    HeaderIconWithBackground: StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: LightTheme.PRIMARY,
            paddingTop: 1,
            paddingBottom: 1,
            paddingLeft: 4,
            paddingRight: 4,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5
        }
    }),
    PopUpStyle: StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: LightTheme.COMPLIMENTARY3TRANSPARENT(94),
        },
        contentContainer: {
            backgroundColor: LightTheme.COMPLIMENTARY2,
            padding: 0,
            margin: 0,
            borderWidth: 0,
            maxWidth: '90%',
            maxHeight: '80%',
        },
        content: {
            padding: 0,
            margin: 0
        },
        actionContainer: {
            backgroundColor: LightTheme.COMPLIMENTARY3,
            marginTop: 0,
            marginBottom: 0
        }
    }),
    MyAlertStyle: {
        GENERAL: StyleSheet.create({
            container: {
                padding: 3,
                minWidth: '30%',
                minHeight: '10%'
            },
            header: {
                flexDirection: 'row',
                width: '100%',
                paddingTop: 10,
                paddingBottom: 20
            },
            headerTextBox: {
                width: '85%',
                justifyContent: 'center',
                alignItems: 'flex-end'
            },
            headerIconBox: {
                width: '15%',
                justifyContent: 'center',
                alignItems: 'flex-end'
            },
            headerText: {
                color: LightTheme.COMPLIMENTARY3,
                fontFamily: LightTheme.FONT1,
                fontSize: LightTheme.SMALLFONTSIZE

            },
            containerBody: {
                width: '100%',
                marginLeft: '10%',
                marginRight: '10%'
            },
            contentText: {
                color: LightTheme.COMPLIMENTARY3,
                fontFamily: LightTheme.FONT1,
                fontSize: LightTheme.SMALLFONTSIZE,
            },
            containerFooter: {
                width: '100%',
                flexDirection: 'row',
                paddingTop: 15,
                paddingBottom: 15,
            },
            ErrorcancelTextBoxhalf: {
                width: '45%',
                marginRight: '5%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1%',
                borderRadius: 5,
                backgroundColor: LightTheme.INFORMATIVE
            },
            ErrorcancelTextBox: {
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1%',
                borderRadius: 5,
                backgroundColor: LightTheme.INFORMATIVE
            },
            SuccesscancelTextBoxhalf: {
                width: '45%',
                marginRight: '5%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1%',
                borderRadius: 5,
                backgroundColor: LightTheme.SUCCESS
            },
            SuccesscancelTextBox: {
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1%',
                borderRadius: 5,
                backgroundColor: LightTheme.SUCCESS
            },
            WarningcancelTextBoxhalf: {
                width: '45%',
                marginRight: '5%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1%',
                borderRadius: 5,
                backgroundColor: LightTheme.WARNING
            },
            WarningcancelTextBox: {
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1%',
                borderRadius: 5,
                backgroundColor: LightTheme.WARNING
            },
            NormalcancelTextBoxhalf: {
                width: '45%',
                marginRight: '5%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1%',
                borderRadius: 5,
                backgroundColor: LightTheme.COMPLIMENTARY1
            },
            NormalcancelTextBox: {
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1%',
                borderRadius: 5,
                backgroundColor: LightTheme.COMPLIMENTARY1
            },
            cancelText: {
                color: LightTheme.COMPLIMENTARY2,
                fontFamily: LightTheme.FONT1,
                fontSize: LightTheme.SMALLFONTSIZE,
            },
            confirmTextBox: {
                width: '45%',
                marginLeft: '5%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1%',
                borderRadius: 5,
                backgroundColor: LightTheme.PRIMARY

            },
            confirmText: {
                color: LightTheme.COMPLIMENTARY2,
                fontFamily: LightTheme.FONT1,
                fontSize: LightTheme.SMALLFONTSIZE,
            }

        })
    },
    MyModalStyle: {
        GENERAL: StyleSheet.create({
            container: {
                padding: 3,
                width: '100%',
                minHeight: '30%',
                maxHeight: '90%'
            },
            header: {
                flexDirection: 'row',
                width: '100%',
                paddingBottom: 3,
                borderBottomWidth: 0.8,
                borderColor: LightTheme.COMPLIMENTARY1
            },
            headerTextBox: {
                width: '80%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 2
            },
            headerTextBox1: {
                width: '55%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 2
            },
            headerCloseBox: {
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: LightTheme.INFORMATIVE,
                padding: 2,
                alignContent: 'center',
                borderRadius: 5
            },
            headerConfirmBox: {
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: LightTheme.PRIMARY,
                padding: 2,
                alignContent: 'center',
                borderRadius: 5,
                marginRight: '5%'
            },
            headerCloseText: {
                color: LightTheme.COMPLIMENTARY2,
                fontFamily: LightTheme.FONT1,
                fontSize: LightTheme.EXTRASMALLFONTSIZE
            },
            headerConfirmText: {
                color: LightTheme.COMPLIMENTARY2,
                fontFamily: LightTheme.FONT1,
                fontSize: LightTheme.EXTRASMALLFONTSIZE
            },
            headerText: {
                color: LightTheme.COMPLIMENTARY3,
                fontFamily: LightTheme.FONT1,
                fontSize: LightTheme.SMALLFONTSIZE

            },
            containerBody: {
                width: '100%',
                paddingTop: 5,
                paddingLeft: 4,
                paddingRight: 4,
                paddingBottom: 5,
            }

        })
    },
    MyToast: {
        GENERAL: StyleSheet.create({
            containerNormal: {
                minWidth: '100%',
                padding: '2%',
                backgroundColor: LightTheme.HIGHLIGHT,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0
            },
            containerError: {
                minWidth: '100%',
                padding: '2%',
                backgroundColor: LightTheme.INFORMATIVE,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0
            },
            containerSuccess: {
                minWidth: '100%',
                padding: '2%',
                backgroundColor: LightTheme.SUCCESS,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0
            },
            containerWarning: {
                minWidth: '100%',
                padding: '2%',
                backgroundColor: LightTheme.WARNING,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0
            },
            messageBox: {
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',

            },
            messageText: {
                color: LightTheme.COMPLIMENTARY2,
                fontFamily: LightTheme.FONT1,
                fontSize: LightTheme.EXTRASMALLFONTSIZE,
            }
        })
    },
    //Button StyleSheet
    MainButtonDefaultStyle: StyleSheet.create({

        touchableOpacity: {
            flexDirection: 'row',
            width: '50%',
            height: 28,
            backgroundColor: LightTheme.COMPLIMENTARY2,
            borderRadius: 20,
            borderColor: LightTheme.COMPLIMENTARY3,
            borderWidth: 0.4
        },
        secondaryTouchableOpacity: {
            flexDirection: 'row',
            width: '100%',
            height: 28,
            backgroundColor: LightTheme.COMPLIMENTARY2,
            borderRadius: 20,
            borderColor: LightTheme.COMPLIMENTARY3,
            borderWidth: 0.4
        },
        buttonLeftViewBox: {
            width: '75%',
            height: 28,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: LightTheme.COMPLIMENTARY1,
            paddingLeft: '6%',
            paddingRight: '5%',
            paddingTop: '2%',
            paddingBottom: '2%',
            justifyContent: 'center',

        },
        buttonLeftText: {
            width: '100%',
            color: LightTheme.COMPLIMENTARY3,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE,
        },
        buttonRightViewBox: {
            width: '25%',
            height: 28,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: LightTheme.COMPLIMENTARY2,
            paddingRight: '6%',
            paddingLeft: '5%',
            justifyContent: 'center',
            alignItems: 'center'

        }


    }),

    //SplashScreen StyleSheet
    SplashScreenStyle: StyleSheet.create({

        container: {
            flex: 1,
            width: width,
            height: height,
            flexDirection: 'column',
            backgroundColor: LightTheme.COMPLIMENTARY1,
        },
        imageViewBox: {
            width: '80%',
            height: '75%',
            marginTop: '5%',
            alignSelf: 'center'
        },
    }),
    //SplashScreen StyleSheet
    StartUpScreenStyle: StyleSheet.create({

        container: {
            flex: 1,
            width: width,
            height: height,
            flexDirection: 'column',
            backgroundColor: LightTheme.COMPLIMENTARY1,
        },
        imageViewBox: {
            width: '80%',
            height: '75%',
            marginTop: '5%',
            alignSelf: 'center'
        },
        loaderViewBox: {
            width: '80%',
            height: '20%',
            marginLeft: '10%',
            marginRight: '10%',
            marginTop: '5%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            color: LightTheme.COMPLIMENTARY3,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.EXTRASMALLFONTSIZE,
            marginTop: '2%'
        }
    }),
    //Session StyleSheet
    SessionStyle: StyleSheet.create({

        container: {
            flex: 1,
            width: width,
            height: height,
            flexDirection: 'column',
            backgroundColor: LightTheme.COMPLIMENTARY3

        },
        top: {
            width: '100%',
            height: '74.5%',
            backgroundColor: LightTheme.COMPLIMENTARY1,
            marginBottom: '0.5%',
            borderBottomRightRadius: 8,
            padding: '2%'
        },
        bottom: {
            width: '100%',
            height: '25%',
            backgroundColor: LightTheme.PRIMARY,
            borderTopRightRadius: 8,
            paddingLeft: '3%',
            paddingRight: '3%',
        },
        topChildContainer: {
            width: "100%",
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        imageViewBox: {
            width: '50%',
            borderTopRightRadius: 8,
            alignSelf: 'center'
        },
        bottomChildContainer: {
            width: "100%",
            height: '100%',
        },
        bottomTextView: {
            width: '100%',
            height: '70%',
            paddingTop: 5,
            justifyContent: 'center'
        },
        bottomMainText: {
            width: '100%',
            color: LightTheme.COMPLIMENTARY2,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.EXTRALARGEFONTSIZE,
            lineHeight: 38
        },
        bottomSubText: {
            width: '100%',
            color: LightTheme.COMPLIMENTARY1,
            fontFamily: LightTheme.FONT2,
            fontSize: LightTheme.LARGEFONTSIZE,
        },
        bottomMainButtonView: {
            width: '100%',
            height: '25%',
            alignItems: 'flex-end',
            justifyContent: 'center'
        }

    }),


    //Country Picker
    CountryPickerStyle: {
        PickerBox: StyleSheet.create({
            container: {
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                paddingBottom: '1%'
            },
            StyleContainer1: {
                backgroundColor: LightTheme.COMPLIMENTARY1,
                width: '80%',
                height: '100%',
                padding: 4,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5
            },
            StyleContainer2: {
                backgroundColor: LightTheme.COMPLIMENTARY1,
                width: '100%',
                height: '100%',
                padding: 4,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5
            },
            TextStyle: {
                fontSize: LightTheme.EXTRASMALLFONTSIZE,
                width: '100%',
                height: '100%',
                paddingLeft: 4,
                fontFamily: LightTheme.FONT1,
                color: LightTheme.PRIMARY
            },

            DropdownStyle1: {
                width: '50%',
                padding: 4
            },

            DropdownStyle2: {
                width: '62%',
                padding: 4
            },

            DropdownTextStyle: {
                fontSize: LightTheme.EXTRASMALLFONTSIZE,
                fontFamily: LightTheme.FONT1,
                color: LightTheme.PRIMARY
            },
            IconStyle: {
                width: '20%',
                justifyContent: "center",
                alignItems: 'center'
            }

        }),

    },

    //FormItems

    FormItemsStyle: {

        FormBox: StyleSheet.create({

            container: {

                flexDirection: 'row',
                width: '100%',
                height: 45,
                marginTop: 10,
                marginBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: LightTheme.COMPLIMENTARY1

            },

            leftIconContainer: {

                width: '10%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'

            },

            inputContainer: {
                width: '80%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'

            },
            inputInnerDoubleContainer: {
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'

            },
            inputInnerDoubleContainerinputContainer: {
                width: '85%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'

            },
            inputInnerDoubleContainerrightIconContainer: {
                width: '15%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: '5%'

            },

            TextInput: {
                width: '100%',
                fontSize: LightTheme.SMALLFONTSIZE,
                fontFamily: LightTheme.FONT1,
                color: LightTheme.COMPLIMENTARY2,
                padding: 0,
                paddingLeft: '5%',
                paddingRight: '5%'
            },

            rightIconContainer: {

                width: '10%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'

            },
            ErrorBox: {
                width: '100%',
                height: 20,
                padding: 2,
                justifyContent: 'center',
                marginBottom: 10,
                backgroundColor: LightTheme.COMPLIMENTARY2

            },
            ErrorText: {
                width: '100%',
                color: LightTheme.INFORMATIVE,
                fontFamily: LightTheme.FONT1,
                fontSize: LightTheme.EXTRASMALLFONTSIZE,
            },
            checkingText: {
                width: '100%',
                color: LightTheme.HIGHLIGHT,
                fontFamily: LightTheme.FONT1,
                fontSize: LightTheme.EXTRASMALLFONTSIZE,
            }

        }),


    },

    //GMLogin StyleSheet
    GMLoginStyle: StyleSheet.create({

        container: {
            flex: 1,
            width: width,
            height: height,
            flexDirection: 'column',
            backgroundColor: LightTheme.COMPLIMENTARY3

        },
        top: {
            width: '100%',
            height: '30.5%',
            backgroundColor: LightTheme.COMPLIMENTARY1,
            marginBottom: '0.5%',
            borderBottomRightRadius: 8,
            padding: '2%'
        },
        bottom: {
            width: '100%',
            height: '69%',
            backgroundColor: LightTheme.PRIMARY,
            borderTopRightRadius: 8,
            paddingLeft: '3%',
            paddingRight: '3%',
        },
        topChildContainer: {
            width: "100%",
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        imageViewBox: {
            width: '80%',
            borderTopRightRadius: 8,
            alignSelf: 'center'
        },
        bottomChildContainer: {
            width: "100%",
            height: '100%',

        },
        bottomChildContainerTop: {
            width: "100%",
            height: '78%',
        },
        bottomChildContainerTopChild: {
            width: '100%',
            height: '12%',
            paddingTop: 1,
            paddingBottom: 1,
            justifyContent: 'center',
        },
        bottomChildContainerTopChildText: {
            width: '100%',
            color: LightTheme.COMPLIMENTARY2,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.SMALLFONTSIZE,
        },
        bottomChildContainerBottom: {
            width: "100%",
            height: '22%',
            paddingTop: '1%',
            paddingBottom: '3%'
        },
        bottomChildContainerBottomChild: {
            width: "100%",
            height: '88%'
        },
        bottomChildContainerBottomTextView: {
            width: '100%',
            height: '60%',
            justifyContent: 'center',

        },
        bottomChildContainerBottomMainButtonView: {
            width: '100%',
            height: '40%',
            alignItems: 'flex-end',
            justifyContent: 'center',

        },
        bottomChildContainerBottomTextViewCont1: {
            flexDirection: 'row',
            width: '100%',
            paddingBottom: '1%'

        },
        bottomChildContainerBottomTextViewCont2: {
            flexDirection: 'row',
            width: '100%',
            paddingBottom: '1%'
        },
        bottomChildContainerBottomTextViewContText1: {
            color: LightTheme.COMPLIMENTARY1,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.EXTRASMALLFONTSIZE,
        },
        bottomChildContainerBottomTextViewContText2: {
            color: LightTheme.HIGHLIGHT,
            fontFamily: LightTheme.FONT1,
            fontSize: LightTheme.EXTRASMALLFONTSIZE,
        }
    }),

    //GMHOME SCREEN
    GMHomeScreenStyle: StyleSheet.create({

        container: {
            flex: 1,
            width: width,
            height: height,
            flexDirection: 'column',
            backgroundColor: LightTheme.COMPLIMENTARY2,
        },
        header: {
            width: '100%',
            height: '8%',
            flexDirection: 'row',
            paddingTop: '1%',
            paddingBottom: '1%',
            paddingLeft: '5%',
            paddingRight: '5%',
            borderBottomWidth: 0.5,
            borderColor: LightTheme.COMPLIMENTARY3TRANSPARENT(30),
            backgroundColor: LightTheme.COMPLIMENTARY2,
            justifyContent: "center"
        },
        body: {
            width: '100%',
            height: '92%',
            flexDirection: 'column',
            paddingTop: '2%',
            paddingBottom: '2%',
            paddingLeft: '5%',
            paddingRight: '5%',
            backgroundColor: LightTheme.PRIMARY,
        },
        headerIconBox: {
            width: '15%',
            height: '80%',
            marginRight: '5%',
            alignSelf: 'center',
            paddingTop: 1,
            paddingBottom: 1,
        },

        filterIconBox: {
            width: '30%',
            height: '90%',
            marginLeft: '10%',
            alignItems: 'flex-start',
            alignSelf: 'center',

        },
        menuIconBox: {
            width: '10%',
            height: height >= 500 ? '80%' : '100%',
            marginLeft: '70%',
            alignSelf: 'center'
        },

        HomeFilterContainer: {
            width: '100%',
            flexDirection: 'row',
            marginTop: 25
        },

        HomeFilterTextBox: {
            width: '25%',
            paddingLeft: '1.5%',
            paddingRight: '1.5%',
            backgroundColor: LightTheme.COMPLIMENTARY2,
            height: 40,
            justifyContent: 'center'
        },

        HomeFilterText: {
            fontSize: LightTheme.SMALLFONTSIZE,
            width: '100%',
            fontFamily: LightTheme.FONT1,
            color: LightTheme.COMPLIMENTARY3
        },

        HomeFilterComponentBox: {
            width: '73.5%',
            marginLeft: '1.5%',
            borderColor: LightTheme.HIGHLIGHT,
            borderBottomWidth: 0.8,
            height: 40,
            justifyContent: 'center'
        }
    })

}

const DarkMode = {

    GenralComponentColors: {

        PRIMARY: DarkTheme.PRIMARY,
        HIGHLIGHT: DarkTheme.HIGHLIGHT,
        INFORMATIVE: DarkTheme.INFORMATIVE,
        COMPLIMENTARY1: DarkTheme.COMPLIMENTARY1,
        COMPLIMENTARY2: DarkTheme.COMPLIMENTARY2,
        COMPLIMENTARY3: DarkTheme.COMPLIMENTARY3,
        GIFT: DarkTheme.GIFT,
        SUCCESS: DarkTheme.SUCCESS,
        ERROR: DarkTheme.ERROR,
        WARNING: DarkTheme.WARNING,
        NORMAL: DarkTheme.HIGHLIGHT,
        VIP: DarkTheme.VIP,
        PREMIUM: DarkTheme.PREMIUM,
        BASIC: DarkTheme.COMPLIMENTARY3,
        BLOOD: DarkTheme.BLOOD,
        VERIFIEDUSER: DarkTheme.VERIFIEDUSER,
        VERIFIED50USER: DarkTheme.VERIFIED50USER,
        VERIFIED10USER: DarkTheme.VERIFIED10USER,
        NOTIFICATION: DarkTheme.NOTIFICATION,
        SUCCESSTRANSPARENT: DarkTheme.SUCCESSTRANSPARENT,
        ERRORTRANSPARENT: DarkTheme.ERRORTRANSPARENT,
        WARNINGTRANSPARENT: DarkTheme.WARNINGTRANSPARENT,
        NORMALTRANSPARENT: DarkTheme.NORMALTRANSPARENT,
        PRIMARYTRANSPARENT: DarkTheme.PRIMARYTRANSPARENT,
        HIGHLIGHTTRANSPARENT: DarkTheme.HIGHLIGHTTRANSPARENT,
        INFORMATIVETRANSPARENT: DarkTheme.INFORMATIVETRANSPARENT,
        COMPLIMENTARY1TRANSPARENT: DarkTheme.COMPLIMENTARY1TRANSPARENT,
        COMPLIMENTARY2TRANSPARENT: DarkTheme.COMPLIMENTARY2TRANSPARENT,
        COMPLIMENTARY3TRANSPARENT: DarkTheme.COMPLIMENTARY3TRANSPARENT,
        FONT1: DarkTheme.FONT1,
        FONT2: DarkTheme.FONT2,
        EXTRALARGEFONTSIZE: DarkTheme.EXTRALARGEFONTSIZE,
        LARGEFONTSIZE: DarkTheme.LARGEFONTSIZE,
        MEDIUMFONTSIZE: DarkTheme.MEDIUMFONTSIZE,
        SMALLFONTSIZE: DarkTheme.SMALLFONTSIZE,
        EXTRASMALLFONTSIZE: DarkTheme.EXTRASMALLFONTSIZE,
        TINYFONTSIZE: DarkTheme.TINYFONTSIZE,
        BUTTONICONSIZE1: DarkTheme.BUTTONICONSIZE1,
        BUTTONICONCOLOR1: DarkTheme.COMPLIMENTARY2,
        BUTTONICONSIZE2: DarkTheme.BUTTONICONSIZE2,
        BUTTONICONCOLOR2: DarkTheme.HIGHLIGHT,
        AlertICONSIZE1: DarkTheme.AlertICONSIZE1,
        AlertICONSIZE2: DarkTheme.AlertICONSIZE2,
        BUTTONICONSIZE3: DarkTheme.BUTTONICONSIZE3,
        BUTTONICONSIZE4: DarkTheme.BUTTONICONSIZE4,
        BUTTONICONSIZE5: DarkTheme.BUTTONICONSIZE5,

    },
    Icons: StyleSheet.create({

        Nope: {
            backgroundColor: DarkTheme.COMPLIMENTARY2,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            elevation: 1,
            zIndex: 1,
            borderRadius: 4
        },
        Yup: {
            backgroundColor: DarkTheme.COMPLIMENTARY2,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            elevation: 1,
            zIndex: 1,
            borderRadius: 4
        },
        Gift: {
            backgroundColor: DarkTheme.COMPLIMENTARY2,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            elevation: 1,
            zIndex: 1,
            borderRadius: 4
        }
    }),


}

export { LightMode, DarkMode }