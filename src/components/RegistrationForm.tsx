import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Branch } from "@/types";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { registrationSchema, type RegistrationFormData } from "@/schemas/registrationSchema";
import { fetchBranches, submitRegistration } from "@/services/api";

export function RegistrationForm({ onClose }) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetchBranches()
      .then((data) => setBranches(data))
      .catch((err) => console.error(err));
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferredStore: "",
      preferredDate: "",
    },
  });

  async function onSubmit(values: RegistrationFormData) {
    await submitRegistration(values);
    setIsSubmitted(true);
  }

  return (
    <div className="relative w-full max-w-[600px] mx-auto p-[24px] border border-[#e0e0e0] rounded-[18px] bg-white text-ink">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#7a7a7a] hover:text-ink hover:bg-[#f5f5f7] rounded-full transition-colors cursor-pointer"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      <div className="mb-[24px] space-y-2">
        <h2 className="font-display text-[28px] font-semibold tracking-[0.196px]">Register</h2>
        <p className="text-[17px] text-[#7a7a7a] tracking-[-0.374px]">
          Fill in your details to secure your spot.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="John Doe" {...register("name")} />
          {errors.name && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
          {errors.email && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="08x-xxx-xxxx" {...register("phone")} />
          {errors.phone && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Preferred Store */}
        <div className="space-y-2">
          <Label htmlFor="preferredStore">Preferred Store</Label>
          <Controller
            control={control}
            name="preferredStore"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a store" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.name}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.preferredStore && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.preferredStore.message}
            </p>
          )}
        </div>

        {/* Preferred Date */}
        <div className="space-y-2">
          <Label htmlFor="preferredDate">Preferred Date</Label>
          <Input id="preferredDate" type="date" min={new Date().toISOString().split("T")[0]} {...register("preferredDate")} />
          {errors.preferredDate && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.preferredDate.message}
            </p>
          )}
        </div>

        {/* buttons */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <Button type="submit" className="w-full">
            Submit
          </Button>
          <button
            type="button"
            onClick={() => reset()}
            className="text-[15px] text-[#7a7a7a] hover:text-ink transition-colors underline-offset-4 hover:underline cursor-pointer"
          >
            Clear all fields
          </button>
        </div>
      </form>

      <Dialog open={isSubmitted} onOpenChange={(open) => {
        if (!open) {
          if (onClose) onClose();
          setTimeout(() => {
            setIsSubmitted(false);
            reset();
          }, 300);
        }
      }}>
        <DialogContent className="sm:max-w-md p-[32px] gap-6">
          <DialogHeader className="flex flex-col items-center text-center space-y-2">
            <DialogTitle className="font-display text-[28px] font-semibold text-ink">
              Registration Successful
            </DialogTitle>
            <DialogDescription className="text-center text-[#7a7a7a] text-[17px]">
              Thank you for registering. We will contact you soon.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => {
              if (onClose) onClose();
              setTimeout(() => {
                setIsSubmitted(false);
                reset();
              }, 300);
            }} className="px-8 w-full sm:w-auto">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
