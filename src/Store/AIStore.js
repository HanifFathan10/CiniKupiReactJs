import { create } from "zustand";
import { generateResponse } from "../services/AI.service";
import { createJSONStorage, persist } from "zustand/middleware";

const useGeminiAIChat = create(
  persist(
    (set) => ({
      histories: [],

      setHistories: (newHistories) => {
        set((state) => ({
          histories: [...state.histories, newHistories],
        }));
      },

      getResponseAI: async (prompt, callback) => {
        await generateResponse(prompt, (status, res) => {
          if (status === true) {
            let response = {};

            response = res.data;

            set((state) => ({
              histories: [...state.histories, response],
            }));

            callback(true, res);
          } else {
            callback(false, res);
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
