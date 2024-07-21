import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Tooltip,
} from "@chakra-ui/react";
import {
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useGeminiAIChat from "../../Store/AIStore";
import Showdown from "showdown";
import parse from "html-react-parser";

const BubbleChatAI = () => {
  const [chat, setChat] = useState("");

  const getResponseAI = useGeminiAIChat((state) => state.getResponseAI);
  const histories = useGeminiAIChat((state) => state.histories);
  const setHistories = useGeminiAIChat((state) => state.setHistories);

  const token = sessionStorage.getItem("access_token");
  const user = jwtDecode(token);
  const converter = new Showdown.Converter();

  useEffect(() => {
    const fetchGeminiChat = async () => {
      await getResponseAI(chat, (status, res) => {
        setChat("");
      });
    };

    if (chat) {
      fetchGeminiChat();
    }
  }, [chat]);

  const handleGeminiChat = (e) => {
    e.preventDefault();

    const inputChat = e.target.prompts.value;

    setHistories({
      sender: "User",
      response: inputChat,
      user: user.username,
      time: new Date().toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "numeric",
        minute: "numeric",
      }),
    });
    setChat(inputChat);
    e.target.reset();
  };

  const handleResetChat = () => {
    sessionStorage.removeItem("gemini-ai-chat");
    window.location.reload();
  };

  return (
    <section className="fixed bottom-4 right-5">
      <Popover placement="top-start">
        <PopoverTrigger>
          <button className="text-ne flex items-center gap-1 rounded-full bg-chocolate px-4 py-3 text-xs font-semibold text-white">
            <ChatBubbleLeftRightIcon className="h-4 w-4" />
            Chat With AI
          </button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            bg="#d4d4d4"
            borderColor="#d4d4d4"
            className="max-h-[70vh] w-[90vw] overflow-hidden md:min-w-[420px]"
          >
            <PopoverArrow className="text-neutral-800" />
            <PopoverHeader className="text-md font-semibold text-neutral-800">
              Hello{" "}
              <span className="font-bold uppercase leading-7">
                {user ? user.username : "You"}
              </span>
            </PopoverHeader>
            <PopoverCloseButton className="border-chocolate text-neutral-800" />
            <PopoverBody className="flex min-h-52 flex-col gap-2.5 overflow-auto">
              {histories.length === 0 ? (
                <div className="flex justify-end gap-2.5">
                  <div className="leading-1.5 flex w-fit max-w-[320px] flex-col rounded-s-xl rounded-ee-xl border-gray-700 bg-chocolate p-4 text-gray-100">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-bold tracking-wider">
                        CiniAI
                      </span>
                      <span className="text-xs font-normal text-gray-500 md:text-sm">
                        00.00
                      </span>
                    </div>
                    <p className="font-normaltext-white py-2.5 text-sm">
                      Mulai chat dengan AI...
                    </p>
                  </div>
                  <img
                    className="h-8 w-8 rounded-full bg-white p-1"
                    src="/images/logo.png"
                    alt="Jese image"
                  />
                </div>
              ) : (
                histories.map((history, index) => {
                  const text = converter.makeHtml(history.response);
                  return (
                    <div
                      className={`flex items-start gap-2.5 ${
                        history.sender === "User"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                      key={index}
                    >
                      {history.sender == null && (
                        <img
                          className="h-8 w-8 rounded-full bg-white p-1"
                          src="/images/google.webp"
                          alt="Jese image"
                        />
                      )}
                      <div
                        className={`leading-1.5 flex w-fit max-w-[320px] flex-col border p-3  ${history.sender == "User" ? "rounded-s-xl rounded-ee-xl border-gray-700 bg-chocolate text-gray-100" : "rounded-e-xl rounded-es-xl border-gray-200 bg-white text-gray-800"}`}
                      >
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-sm font-bold tracking-wider">
                            {history.user ? history.user : "CiniAI"}
                          </span>
                          <span className="text-xs font-normal text-gray-500 md:text-sm ">
                            {history.time}
                          </span>
                        </div>
                        <span className="py-2.5 text-xs font-normal tracking-wide md:text-sm ">
                          {parse(text)}
                        </span>
                      </div>
                      {history.sender === "User" && (
                        <img
                          className="h-8 w-8 rounded-full bg-white p-1"
                          src="/images/logo.png"
                          alt="Jese image"
                        />
                      )}
                    </div>
                  );
                })
              )}
            </PopoverBody>
            <PopoverFooter>
              <div className="flex w-full items-center justify-between gap-3">
                <form className="w-full" onSubmit={handleGeminiChat}>
                  <label
                    htmlFor="default-search"
                    className="sr-only mb-2 text-sm font-medium text-gray-900 "
                  >
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                      <label htmlFor="default-search">
                        <SparklesIcon
                          className="h-5 w-5 text-primary-700"
                          aria-hidden="true"
                        />
                      </label>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      name="prompts"
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-1 py-3 ps-10 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:p-3 md:ps-10 md:text-base"
                      placeholder="Cari apapun di CiniAI ^_^"
                      required
                    />
                  </div>
                </form>

                <Tooltip label="Reset Chat" hasArrow>
                  <button
                    onClick={handleResetChat}
                    disabled={histories.length === 0 && true}
                    className={`flex items-center rounded-full bg-white p-3 focus:animate-spin md:p-4 ${
                      histories.length === 0 && "opacity-65"
                    }`}
                  >
                    <ArrowPathIcon className="h-5 w-5 text-gray-800" />
                  </button>
                </Tooltip>
              </div>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </section>
  );
};

export default BubbleChatAI;
