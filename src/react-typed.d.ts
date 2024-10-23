declare module 'react-typed' {
    import * as React from 'react';
  
    interface TypedProps {
      strings: string[];
      typeSpeed?: number;
      backSpeed?: number;
      backDelay?: number;
      startDelay?: number;
      loop?: boolean;
      showCursor?: boolean;
      onComplete?: () => void;
      onTypingPaused?: () => void;
      onTypingResumed?: () => void;
    }
  
    export default class Typed extends React.Component<TypedProps> {}
  }
  