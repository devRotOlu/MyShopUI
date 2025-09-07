import { z } from "zod";

import { deliveryAddressSchema, loginSchema } from "../formSchemas";

export type loginSchemaType = z.infer<typeof loginSchema>;
export type deliveryAddressSchemaType = z.infer<typeof deliveryAddressSchema>;
