import * as React from 'react';

export interface HelloWorldProps extends React.Props<HelloWorld> {
  color: string;
}

declare class HelloWorld extends React.Component<HelloWorldProps, any> {
}

declare module 'hello-world' {
}

export default HelloWorld;
