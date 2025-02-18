import React from 'react';
import { Controller, useFormContext, FieldValues } from 'react-hook-form';
import {FormDescription, FormLabel} from "@/components/ui/customFormProvider";

type FormFieldProps = {
    name: string;
    label?: string | React.ReactNode;
    textHelper?: string;
    textError?: string;
    children: React.ReactElement;
};

export function CustomFormField({ name, label, textHelper, textError, children }: FormFieldProps) {
    const { control, formState: { errors } } = useFormContext();
    const errorMessage = errors[name]?.message?.toString() || textError;
    return (
        <>
            {label &&  <FormLabel>{label}</FormLabel>}
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => {
                    return React.cloneElement(children, {
                        ...field,
                        // @ts-ignore
                        ...children.props,
                    });
                }}
            />
            {textHelper && <FormDescription>
                {textHelper}
            </FormDescription>}
            {errorMessage && (
                <p
                    className={"text-[0.8rem] font-medium text-destructive"}
                >
                    {errorMessage}
                </p>
            )}
        </>
    );
}
