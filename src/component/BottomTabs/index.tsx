import React, { ReactElement, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { Box, Center, HStack, Pressable, Text } from 'native-base';

interface IBottomTabView {
  title: any;
  icon?: any;
  iconSelected?: any;
}

interface IBottomTab {
  tabStyle?: StyleProp<ViewStyle>;
  viewStyle?: StyleProp<ViewStyle>;
}

const BottomTabView: React.FC<IBottomTabView> = ({ children }) => <>{children}</>;

const Index: React.FC<IBottomTab> = ({ children, tabStyle, viewStyle }) => {
  const [selected, setSelected] = useState(0);
  const tabViews = <Center style={viewStyle}>{React.Children.toArray(children)[selected]}</Center>;
  const tabs = React.Children.map(children, (child, index) => {
    const c = child as ReactElement<IBottomTabView>;
    return (
      <Pressable opacity={selected === index ? 1 : 0.5} flex={1} onPress={() => setSelected(index)} style={tabStyle}>
        <Center>
          {selected === index ? c.props.iconSelected : c.props.icon}
          {typeof c.props.title === 'string' ? (
            <Text color="white" fontSize="12">
              {c.props.title}
            </Text>
          ) : (
            c.props.title
          )}
        </Center>
      </Pressable>
    );
  });
  return (
    <Box flex={1} bg="white" safeAreaTop>
      <Center flex={1}>{tabViews}</Center>
      <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
        {tabs}
      </HStack>
    </Box>
  );
};

export default Index;
export { BottomTabView };
