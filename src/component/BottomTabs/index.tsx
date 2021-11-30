import React, { ReactElement, useState } from 'react';
import { Tab, TabView } from 'react-native-elements';
import { StyleProp, ViewStyle } from 'react-native';

interface IBottomTabView {
  // eslint-disable-next-line react/no-unused-prop-types
  title:
    | string
    | React.ReactElement<
        {},
        // eslint-disable-next-line no-unused-vars
        string | ((props: any) => React.ReactElement<any, any>) | { new (props: any): React.Component<any, any, any> }
      >
    | undefined;
}

interface IBottomTab {
  tabStyle?: StyleProp<ViewStyle>;
  viewStyle?: StyleProp<ViewStyle>;
}

const BottomTabView: React.FC<IBottomTabView> = ({ children }) => <>{children}</>;

const Index: React.FC<IBottomTab> = ({ children, tabStyle, viewStyle }) => {
  const [active, setActive] = useState(0);
  const tabViews = React.Children.map(children, (child) => <TabView.Item style={viewStyle}>{child}</TabView.Item>);
  const tabs = React.Children.map(children, (child) => {
    const c = child as ReactElement<IBottomTabView>;
    return <Tab.Item style={tabStyle} title={c.props.title} />;
  });
  return (
    <>
      <TabView value={active - 1}>{tabViews}</TabView>
      <Tab value={active} onChange={setActive}>
        {tabs}
      </Tab>
    </>
  );
};

export default Index;
export { BottomTabView };
