import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    StyleSheet,
    SectionList,
} from 'react-native';
import { ChannelListItem } from './ChannelListItem';
import { useWatchedChannels } from './useWatchedChannels'

export const ChannelList = ({ client, changeChannel }) => {
    const {
        activeChannelId,
        setActiveChannelId,
        unreadChannels,
        readChannels,
        oneOnOneConversations,
    } = useWatchedChannels(client, changeChannel);

    const renderChannelRow = (channel, isUnread) => {
        const isOneOnOneConversation =
            Object.keys(channel.state.members).length === 2;

        return (
            <ChannelListItem
                activeChannelId={activeChannelId}
                setActiveChannelId={setActiveChannelId}
                changeChannel={changeChannel}
                isOneOnOneConversation={isOneOnOneConversation}
                isUnread={isUnread}
                channel={channel}
                client={client}
                key={channel.id}
                currentUserId={client.user.id}
            />
        );
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TextInput
                        style={styles.inputSearchBox}
                        placeholderTextColor="grey"
                        placeholder="Jump to"
                    />
                </View>

                <SectionList
                    style={styles.sectionList}
                    sections={[
                        {
                            title: 'Unread',
                            id: 'unread',
                            data: unreadChannels || [],
                        },
                        {
                            title: 'Channels',
                            data: readChannels || [],
                        },
                        {
                            title: 'Direct Messages',
                            data: oneOnOneConversations || [],
                        },
                    ]}
                    keyExtractor={(item, index) => item.id + index}
                    renderItem={({ item, section }) => {
                        return renderChannelRow(item, section.id === 'unread');
                    }}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.groupTitleContainer}>
                            <Text style={styles.groupTitle}>{title}</Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};