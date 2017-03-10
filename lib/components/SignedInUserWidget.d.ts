/// <reference types="react" />
import * as React from 'react';
interface SignedInUserWidgetProps extends React.Props<void> {
    email: string;
}
declare class SignedInUserWidget extends React.Component<SignedInUserWidgetProps, void> {
    render(): JSX.Element;
}
export { SignedInUserWidgetProps, SignedInUserWidget };
