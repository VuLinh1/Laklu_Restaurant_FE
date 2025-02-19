import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPinSubmit: (pin: string) => void;
}

export function PinModal({ isOpen, onClose, onPinSubmit }: PinModalProps) {
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [pin, setPin] = useState(["", "", "", ""]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d{4}$/.test(pasteData)) return;

    setPin(pasteData.split(""));
    pasteData.split("").forEach((digit, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i]!.value = digit;
      }
    });

    inputRefs.current[3]?.focus();
  };


  const handleSubmit = () => {
        const enteredPin = pin.join("");
      onPinSubmit(enteredPin); // Call the onPinSubmit callback

    if (enteredPin === "1234") {
      router.push("/"); // Redirect to / if PIN is 1234
    } else {
      // Handle incorrect PIN (e.g., display an error message)
      alert("Mã PIN không chính xác."); // Example: Display an alert
      setPin(["", "", "", ""]); // Clear the input fields
      inputRefs.current.forEach(input => {
        if (input) {
          input.value = "";
        }
      });
      inputRefs.current[0]?.focus(); // Focus on the first input
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-1">Verification</DialogTitle>
          <DialogDescription className="text-[15px] text-slate-500">
            Enter the 4-digit PIN
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center gap-3 mb-4"> {/* Added margin-bottom */}
          {pin.map((value, index) => (
            <input
              key={index}
              // ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto"> {/* Removed mt-4 */}
          <Button onClick={handleSubmit} className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150">
            Verify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
