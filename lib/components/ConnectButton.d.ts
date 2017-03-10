/// <reference types="react" />
import * as React from 'react';
interface ConnectButtonProps extends React.Props<void> {
    enabled: boolean;
    onClick: () => void;
}
declare class ConnectButton extends React.Component<ConnectButtonProps, void> {
    render(): JSX.Element;
}
export { ConnectButtonProps, ConnectButton };
