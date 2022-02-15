import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper'
import { changeLoginSession, changeProfileSession, changeGeneralSession } from '../redux/actions/Session';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import { NavPropsType } from '../types';
import { logOut } from '../components/common';

const MenuDrawer = ({ navigation, login_session, profile_session, general_session, login_session_action, profile_session_action, general_session_action }: NavPropsType) => {

    const [profileImageLoading, setProfileImageLoading] = useState(true);
 
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
                                }}
                                
                                style={{ backgroundColor: '#00B7EC' }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{profile_session.profile_session.name}</Title>
                                <Caption style={styles.caption}>@{profile_session.profile_session.username}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80GC - </Paragraph>
                                <Caption style={styles.caption}>Wallet</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>Premium - </Paragraph>
                                <Caption style={styles.caption}>Account</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather
                                    name="user"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={async () => {
                                navigation.navigate('AfterLogin',
                                    {
                                        screen: 'Updateprofile'
                                    })
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather
                                    name="image"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Gallery"
                            onPress={() => { navigation.navigate('Gallery') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons
                                    name="notifications-none"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Notification"
                            onPress={() => { navigation.navigate('Notification') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons
                                    name="add-shopping-cart"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Shop"
                            onPress={() => { navigation.navigate('SettingsScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons
                                    name="support-agent"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => { navigation.navigate('SupportScreen') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.preference}>
                                <Text>Hide Name</Text>
                                <View pointerEvents="none">
                                    <Switch value={false} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Drawer.Section>
                    <Drawer.Section>
                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.preference}>
                                <Text>Hide Wallet</Text>
                                <View pointerEvents="none">
                                    <Switch value={false} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons
                            name="logout"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => logOut({
                        login_session: login_session,
                        general_session: general_session,
                        login_session_action: login_session_action
                    })}
                />
            </Drawer.Section>
        </View>

    );
}




const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});



const mapStateToProps = (state: any) => ({
    login_session: state.login_session,
    profile_session: state.profile_session,
    general_session: state.general_session,
});

const mapDispatchToProps = (dispatch: any) => ({
    login_session_action: bindActionCreators(changeLoginSession, dispatch),
    profile_session_action: bindActionCreators(changeProfileSession, dispatch),
    general_session_action: bindActionCreators(changeGeneralSession, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer)