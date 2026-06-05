import * as z from "zod";

export const registrationSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(9, {
    message: "Please enter a valid phone number.",
  }),
  preferredStore: z.string().min(1, {
    message: "Please select a preferred store.",
  }),
  preferredDate: z.string().min(1, {
    message: "Please select a preferred date.",
  }).refine((dateStr) => {
    const selectedDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, {
    message: "Please select a date from today onwards.",
  }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
