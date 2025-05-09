import {
  Mail,
  Lock,
  Key,
  X,
  Instagram,
  UserCircle,
  Check,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppToasts } from "@/hooks/use-app-toast";
import Spinner from "@/components/ui/spinner";
import FormField from "@/components/ui/form-field";
import {
  useCreateClientMutation,
  useGetallMembersQuery,
  useGetallMembersSuggestionQuery,
} from "@/backend/participant.api";
import { createClientSchema, CreateClientType } from "./schema";
import PasswordViewToggle from "@/components/password-toggle";

interface SelectedMembersType {
  id: string;
  name: string;
}

export default function ClientCreateForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { SuccessToast, ErrorToast } = useAppToasts();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<CreateClientType>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      memberId: [],
    },
  });

  const [selectedMembers, setSelectedMembers] = useState<SelectedMembersType[]>(
    [],
  );
  const [createParticipant, { isLoading }] = useCreateClientMutation();
  const { data: Members } = useGetallMembersSuggestionQuery();
  const [showInstagramPassword, setShowInstagramPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValue(
      "memberId",
      selectedMembers.map((m) => m.id),
    );
  }, [selectedMembers, setValue]);

  const handleMemberSelect = (memberId: string) => {
    const member = Members?.result.find((m) => m.id === memberId);
    if (!member) return;

    setSelectedMembers((prev) => {
      const isSelected = prev.some((m) => m.id === memberId);
      if (isSelected) {
        return prev.filter((m) => m.id !== memberId);
      }
      return [...prev, { id: memberId, name: member.user.userName }];
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (payload: CreateClientType) => {
    const formData = new FormData();
    formData.append("userName", payload.userName);
    formData.append("email", payload.email);
    formData.append("password", payload.password);
    formData.append("instagramId", payload.instagramId);
    formData.append("instagramPassword", payload.instagramPassword);
    payload.memberId.forEach((id) => formData.append("memberId", id));
    if (payload.logo) {
      formData.append("logo", payload.logo);
    }
    try {
      const resp = await createParticipant(formData).unwrap();
      if (resp.status === "success") {
        SuccessToast({ title: resp.message });
        onSuccess();
        reset();
        setSelectedMembers([]);
      } else {
        ErrorToast({ title: resp.message });
      }
    } catch (error) {
      ErrorToast({ title: "Error creating participant" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-1 flex-col gap-6 px-4"
    >
      {/* Username */}
      <FormField label="Upload Logo">
        <div className="relative mx-auto w-fit">
          {/* Hidden File Input */}
          <Input
            type="file"
            accept="image/*"
            id="uploadLogo"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Upload Circle UI */}
          <div
            onClick={() => document.getElementById("uploadLogo")?.click()}
            className="relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-primary bg-primary/5 transition hover:bg-primary/10"
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <h5 className="text-base text-primary">Upload Logo</h5>
            )}
          </div>
        </div>
      </FormField>

      <FormField label="Username">
        <UserCircle className={`absolute left-3 top-2 h-5 w-5 text-primary`} />
        <Input
          {...register("userName")}
          placeholder="Username"
          className="text-dark placeholder:text-dark/60 rounded-full border-2 border-primary/50 bg-white pl-12 focus:border-2 focus:border-primary"
        />
        {errors.userName && (
          <p className="mt-1 text-sm text-red-500">{errors.userName.message}</p>
        )}
      </FormField>

      <div className="flex flex-1 gap-x-2">
        {/* Instagram ID */}
        <FormField className="flex-1" label="Instagram ID ">
          <Instagram className={`absolute left-3 top-2 h-5 w-5 text-primary`} />
          <Input
            {...register("instagramId")}
            placeholder="@john_instagram"
            className="text-dark placeholder:text-dark/60 rounded-full border-2 border-primary/50 bg-white pl-12 focus:border-2 focus:border-primary"
          />
          {errors.instagramId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.instagramId.message}
            </p>
          )}
        </FormField>

        {/* Instagram Password */}
        <FormField className="flex-1" label="Instagram Password">
          <Key className={`absolute left-3 top-2 h-5 w-5 text-primary`} />
          <Input
            type={showInstagramPassword ? "text" : "password"}
            {...register("instagramPassword")}
            placeholder="••••••"
            className="text-dark placeholder:text-dark/60 rounded-full border-2 border-primary/50 bg-white pl-12 focus:border-2 focus:border-primary"
          />
          <PasswordViewToggle
            setShowPassword={setShowInstagramPassword}
            showPassword={showInstagramPassword}
          />
          {errors.instagramPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.instagramPassword.message}
            </p>
          )}
        </FormField>
      </div>

      <div className="flex flex-1 gap-x-2">
        {/* Email */}
        <FormField className="flex-1" label="Email">
          <Mail className={`absolute left-3 top-2 h-5 w-5 text-primary`} />
          <Input
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            className="text-dark placeholder:text-dark/60 rounded-full border-2 border-primary/50 bg-white pl-12 focus:border-2 focus:border-primary"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </FormField>

        {/* Password */}
        <FormField className="flex-1" label="Password">
          <Lock className={`absolute left-3 top-2 h-5 w-5 text-primary`} />
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••"
            className="text-dark placeholder:text-dark/60 rounded-full border-2 border-primary/50 bg-white pl-12 focus:border-2 focus:border-primary"
          />
          <PasswordViewToggle
            setShowPassword={setShowPassword}
            showPassword={showPassword}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </FormField>
      </div>

      {/* Members */}
      <FormField label="Members">
        <User className={`absolute left-3 top-2 h-5 w-5 text-primary`} />
        <Select onValueChange={handleMemberSelect} value="">
          <SelectTrigger className="focus:border-2-primary text-dark placeholder:text-dark/60 focus:ring-dark rounded-full bg-white pl-12 focus:border-2">
            <SelectValue placeholder="Select a member to add" />
          </SelectTrigger>
          <SelectContent>
            {Members?.result
              ?.filter((m) => !selectedMembers.some((s) => s.id === m.id))
              .map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  <div className="flex items-center gap-x-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {member.user.userName.charAt(0).toUpperCase()}
                    </span>
                    {member.user.userName}
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {errors.memberId && (
          <p className="mt-1 text-sm text-red-500">{errors.memberId.message}</p>
        )}
      </FormField>

      <div className="mb-2 flex flex-wrap gap-2">
        {selectedMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-white"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-primary">
              {member.name.charAt(0).toUpperCase()}
            </span>
            <span>{member.name}</span>
            <button
              type="button"
              onClick={() => handleMemberSelect(member.id)}
              className="hover:bg-primary-dark rounded-full p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <SheetFooter className="flex justify-end gap-4 pt-6">
        <SheetClose asChild>
          <Button className="border-2-primary w-[140px] rounded-md border-2 bg-transparent px-6 py-2 text-primary">
            Cancel
          </Button>
        </SheetClose>
        <Button
          type="submit"
          className="w-[140px] rounded-md bg-primary px-6 py-2 text-white"
        >
          {isLoading ? <Spinner color="#FFF6E9" size={12} /> : "Create"}
        </Button>
      </SheetFooter>
    </form>
  );
}
