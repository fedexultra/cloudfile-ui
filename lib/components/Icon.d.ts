/// <reference types="react" />
import * as React from 'react';
interface IconProps extends React.Props<void> {
    source: string;
    style: React.CSSProperties;
}
declare class Icon extends React.Component<IconProps, void> {
    render(): JSX.Element;
}
export { IconProps, Icon };
