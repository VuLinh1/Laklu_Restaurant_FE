'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitHandler } from 'react-hook-form';
import { Credential, TokenResponse } from '@/features/auth/types';
import { useMutation } from '@tanstack/react-query';
import { createMutationFn } from '@/lib/fetchWrapper';
import { ApiResponse, ApiResponseError } from '@/types/ApiResponse';
import React, { useState } from 'react';
import { useCustomForm } from '@/hooks/useCustomForm';
import { z } from 'zod';
import { CustomFormField } from '@/components/ui/CustomFormField';
import { CustomFormProvider } from '@/components/ui/customFormProvider';
import { useToast } from '@/hooks/use-toast';
import {login} from "@/features/auth/api";
import { PinModal } from './PinModal';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function LoginFormV2({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const { toast } = useToast();
  const form = useCustomForm<typeof LoginSchema>({
    formSchema: LoginSchema,
    defaultValues: {
      email: '',
      password: '',
    },
    validationMode: 'onSubmit',
  });

  const mutate = useMutation({
    mutationFn: createMutationFn(login),
    onSuccess: (data: ApiResponse<TokenResponse>) => {
      console.log(data);
    },
    onError: (error: ApiResponseError) => {
      if (error.isValidationError()) {
        form.setErrors(error.getValidationErrors());
      } else {
        toast({
          description: error.response._messages as string,
          variant: 'destructive',
        });
      }
    },
  });

  // const onSubmit: SubmitHandler<Credential> = (data) => mutate.mutate(data);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const onSubmit: SubmitHandler<Credential> = (data) => {
    setUserEmail(data.email); // Lưu email để sử dụng sau khi nhập PIN
    if (data.email === 'namdhhe171198@example.com') { // Thay đổi email theo yêu cầu
      setIsPinModalOpen(true);
    } else {
      mutate.mutate(data);
    }
  };

  const handlePinSubmit = (pin: string) => {
    // Gọi API để xác thực mã PIN và đăng nhập
    mutate.mutate({ email: userEmail, password: pin }); // Hoặc gọi API riêng cho xác thực PIN
  };
  return (
    <CustomFormProvider {...form}>
      <form
        className={cn('flex flex-col gap-6', className)}
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Đăng nhập</h1>
          <p className="text-balance text-sm text-muted-foreground">
              Điền email bạn được cung cấp
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <CustomFormField name="email" label="Email">
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
              />
            </CustomFormField>
          </div>
          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
        </div>
      </form>
       <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onPinSubmit={handlePinSubmit}
      />
    </CustomFormProvider>
  );
}
