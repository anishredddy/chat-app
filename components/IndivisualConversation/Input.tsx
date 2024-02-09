"use client";

import useConversation from "@/hooks/use-conversation";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { FieldValues, useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi";

const Input = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const handleUpload = async (result: any) => {
    await axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div className="lg:mt-auto md:mt-auto py-4 px-4 border-t flex items-center gap-2 lg:gap-4">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="la5qcx2u"
      >
        <HiPhoto size={30} />
      </CldUploadButton>
      <form className="flex items-center gap-2 md:gap-4 lg:gap-4 w-full">
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message bro!"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-gray-100 cursor-pointer hover:bg-gray-200 transition"
        >
          <HiPaperAirplane
            size={20}
            className="text-black transform rotate-90"
          />
        </button>
      </form>
    </div>
  );
};

export default Input;
