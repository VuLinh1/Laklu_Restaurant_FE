import {Path, useForm, UseFormProps, UseFormReturn} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z, ZodType} from 'zod';
import {useToast} from "@/hooks/use-toast";

type FormData = Record<string, any>;


type UseCustomFormOptions<T extends ZodType<any, any, any>> = {
    formSchema: T;
    defaultValues?: z.infer<T>;
    validationMode?: UseFormProps['mode'];
};
type UseCustomFormReturn<T extends ZodType<any, any, any>> = UseFormReturn<z.TypeOf<T>, any, undefined> & {
    setErrors: (errors: Record<string, string[]>) => void;
}

export function useCustomForm<T extends ZodType<any, any, any>>(options: UseCustomFormOptions<T>) {
    const {
        formSchema,
        defaultValues = {} as z.infer<T>,
        validationMode = 'onSubmit',
    } = options;
    
    const methods = useForm<z.infer<T>>({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: validationMode,
    }) as UseCustomFormReturn<T>;

    methods.setErrors = (errors: Record<string, string[]>) => {
        Object.keys(errors).forEach((key) => {
            methods.setError(key as Path<z.infer<T>>, {
                type: 'server',
                message: errors[key].join('\n'),
            });
        });
    };
    return methods;
}
