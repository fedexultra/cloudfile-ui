/// <reference types="react" />
import * as React from 'react';
interface ErrorWidgetProps extends React.Props<void> {
    errorMessage: string;
}
declare class ErrorWidget extends React.Component<ErrorWidgetProps, void> {
    render(): JSX.Element;
}
export { ErrorWidgetProps, ErrorWidget };
