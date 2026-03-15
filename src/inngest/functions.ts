import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // Fetch the video
    await step.sleep("fetching-video", "5s");

    // Transcribe the video
    await step.sleep("transcribing-video", "5s");

    // Send the transcription to LLM
    await step.sleep("sending-to-llm", "5s");

    await step.run("create-workflow", async () => {
      return prisma.workflow.create({
        data: {
          name: "New Workflow from ingest",
        },
      });
    });

    return { message: `Hello ${event.data.email}!` };
  },
);
