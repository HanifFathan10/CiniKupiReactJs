import { create } from "zustand";
import { generateResponse } from "../services/AI.service";
import { createJSONStorage, persist } from "zustand/middleware";

interface IGeminiAIChatStore {
  histories: GeminiAIResponse[];
  setHistories: (newHistories: GeminiAIResponse) => void;
  getResponseAI: (data: GeminiAIRequest, callback: TCallback) => void;
}

const useGeminiAIChat = create<IGeminiAIChatStore>()(
  persist(
    (set) => ({
      histories: [],

      setHistories: (newHistories) => {
        set((state) => ({
          histories: [...state.histories, newHistories],
        }));
      },

      getResponseAI: async (data, callback) => {
        await generateResponse(data, (status, res) => {
          if (status === true) {
            set((state) => ({
              histories: [...state.histories, res.data],
            }));

            callback(status, res);
          } else {
            callback(status, res);
          }
        });
      },
    }),
    {
      name: "gemini-ai-chat",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        histories: state.histories,
      }),
    },
  ),
);

export default useGeminiAIChat;
