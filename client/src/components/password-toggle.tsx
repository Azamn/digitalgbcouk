import { Eye, EyeOff } from "lucide-react";

interface PasswordViewToggleProps {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}

const PasswordViewToggle = ({
  setShowPassword,
  showPassword,
}: PasswordViewToggleProps) => {
  return (
    <>
      {showPassword ? (
        <EyeOff
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2 h-4 w-4 cursor-pointer text-primary"
        />
      ) : (
        <Eye
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2 h-4 w-4 cursor-pointer text-primary"
        />
      )}
    </>
  );
};

export default PasswordViewToggle;