import * as React from 'react';
import { cn } from '@/lib/utils';

type IndependentScrollLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
    useFullHeightScreen?: boolean;
};

// eslint-disable-next-line react/display-name
export const FixedHeightContainer = React.forwardRef<
    HTMLDivElement,
    IndependentScrollLayoutProps
>(({ className, useFullHeightScreen, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col",
            useFullHeightScreen ? "h-screen min-h-screen" : "h-full min-h-full",
            className
        )}
        {...props}
    />
))

// eslint-disable-next-line react/display-name
export const FixedHeightContainerContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className="flex flex-1 flex-row overflow-y-hidden"
        
    >
        <main className={cn("flex-1 overflow-y-auto scrollbar", className)} {...props}>
            {props.children}
        </main>
    </div>
))

