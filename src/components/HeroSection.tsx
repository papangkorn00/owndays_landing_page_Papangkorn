import { Button } from "@/components/ui/button";

export function HeroSection({ onRegisterClick }) {
  return (
    <section className="w-full min-h-[100dvh] bg-white text-ink py-[80px] flex flex-col items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center w-full">
          <div className="space-y-8 max-w-[1100px] mx-auto w-full border-y border-[#666666] py-16 px-4">
            <h1 className="font-display text-[40px] md:text-[56px] font-semibold leading-[1.07] tracking-[-0.28px]">
              Update Your Vision: Restore Your Clarity
            </h1>
            <p className="font-display text-[21px] md:text-[28px] font-normal leading-[1.14] tracking-[0.196px] text-[#7a7a7a] max-w-[700px] mx-auto">
              Get a free eye test at OWNDAYS! Register now to update your vision and see the world with absolute clarity and confidence.
            </p>
            <div className="pt-8">
              <Button
                onClick={onRegisterClick}
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
