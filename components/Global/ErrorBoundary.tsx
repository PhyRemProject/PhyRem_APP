import React from "react";
import { Text } from "react-native";

export default class ErrorBoundary extends React.Component {
    constructor(props : any) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error : any) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error : any , errorInfo : any) {
      // You can also log the error to an error reporting service
      console.log("AN ERROR WAS CAUGHT")
      console.log(error)
    }
  
    render() {
      if ((this.state as any).hasError) {
        // You can render any custom fallback UI
        return <Text>Something went wrong.</Text>;
      }
  
      return this.props.children; 
    }
  }