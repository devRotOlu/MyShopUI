import { useState } from "react";
import { ZodObject, ZodRawShape, z } from "zod";

import { useValidationDataType } from "../types/types";

export const useValidation = <T extends ZodRawShape>(schema: ZodObject<T>): useValidationDataType<T> => {
  type SchemaType = z.infer<ZodObject<T>>;

  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof SchemaType, string>>>({});

  const testValidation = (data: unknown): data is SchemaType => {
    const result = schema.safeParse(data);

    if (result.success) {
      setValidationErrors({});
      return true;
    }

    const newErrors: Partial<Record<keyof SchemaType, string>> = {};
    result.error.issues.forEach((err) => {
      const field = err.path[0] as keyof SchemaType;
      newErrors[field] = err.message;
    });
    setValidationErrors(newErrors);
    return false;
  };

  return { validationErrors, testValidation };
};
