import express, { type Request, type Response } from "express";
import z from "zod";
import { chartService } from "../services/chat.service";

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, "Prompt is required.")
      .max(1000, "Prompt is too long (Max 1000 characters)"),
   conversationId: z.uuid(),
});

export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatSchema.safeParse(req.body);

      if (!parseResult.success) {
         res.status(400).json(parseResult.error.format());
         return;
      }

      try {
         const { prompt, conversationId } = req.body;

         const response = await chartService.sendMessage(
            prompt,
            conversationId
         );

         res.json({ message: response.message });
      } catch (error) {
         res.status(500).json({ message: "Failed to generate a response" });
      }
   },
};
