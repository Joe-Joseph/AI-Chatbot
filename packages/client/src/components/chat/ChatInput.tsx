import type { KeyboardEvent } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

export type ChatFormData = {
   prompt: string;
};

type Props = {
   onSubmit: (data: ChatFormData) => void;
};

export const ChatInput = ({ onSubmit }: Props) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

   const submit = handleSubmit((data) => {
      reset({ prompt: "" });
      onSubmit(data);
   });

   const handleOnKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault();
         submit();
      }
   };

   return (
      <form
         onSubmit={submit}
         onKeyDown={handleOnKeyDown}
         className="flex flex-col gap-2 items-end border-2 p-4 rounded-lg"
      >
         <textarea
            {...register("prompt", {
               required: true,
               validate: (data) => data.trim().length > 0,
            })}
            className="w-full border-0 focus:outline-0 resize-none cursor-pointer"
            placeholder="Ask anything"
            maxLength={1000}
            autoFocus
         />
         <Button disabled={!formState.isValid} className="w-9 h-9 rounded-full">
            <FaArrowUp />
         </Button>
      </form>
   );
};
