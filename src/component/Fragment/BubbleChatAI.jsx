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
  PhotoIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useGeminiAIChat from "../../Store/AIStore";
import Showdown from "showdown";
import parse from "html-react-parser";
import { convertToBase64 } from "../../utils/convertToBase64";
import PreviewImg from "../Elements/Modal/PreviewImg";

const BubbleChatAI = () => {
  const [chat, setChat] = useState(null);
  const [image, setImage] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [previewData, setPreviewData] = useState({});

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
        setMimeType("");
      });
    };

    if (chat) {
      fetchGeminiChat();
    }
  }, [chat]);

  const handleGeminiChat = (e) => {
    e.preventDefault();

    const inputChat = e.target.prompts.value;

    if (inputChat.trim() === "" || inputChat.length < 3) return;

    setHistories({
      sender: "User",
      response: inputChat,
      image,
      user: user.username,
      time: new Date().toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "numeric",
        minute: "numeric",
      }),
    });
    setChat({
      prompt: inputChat,
      image,
      mimeType,
    });

    setImage("");
    e.target.reset();
  };

  const handleUploadImage = (e) => {
    setMimeType(e.target.files[0].type);
    convertToBase64(e, setImage);
  };

  const handleResetChat = () => {
    sessionStorage.removeItem("gemini-ai-chat");
    window.location.reload();
  };

  return (
    <>
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
              className="max-h-[76vh] w-[90vw] overflow-hidden md:min-w-[420px]"
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
                          You
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
                          className={`leading-1.5 flex w-fit max-w-[320px] flex-col border p-3 ${history.sender == "User" ? "rounded-s-xl rounded-ee-xl border-gray-700 bg-chocolate text-gray-100" : "rounded-e-xl rounded-es-xl border-gray-200 bg-white text-gray-800"}`}
                        >
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-bold tracking-wider">
                              {history.user ? history.user : "CiniAI"}
                            </span>
                            <span className="text-xs font-normal text-gray-500 md:text-sm ">
                              {history.time}
                            </span>
                          </div>
                          <span className="max-w-xs py-2.5 text-xs font-normal tracking-wide md:text-sm">
                            {parse(text)}
                          </span>
                          {history.image && (
                            <button
                              onClick={() => setPreviewData(history)}
                              className="w-fit"
                            >
                              <img
                                src={history.image}
                                className="h-16 w-16 rounded bg-center bg-no-repeat object-center"
                                alt="image"
                                width={300}
                                height={300}
                                loading="lazy"
                              />
                            </button>
                          )}
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
                  <form
                    className="w-full"
                    method="POST"
                    onSubmit={handleGeminiChat}
                  >
                    <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 ">
                      <div className="relative rounded-t-lg bg-white px-4 py-2">
                        <label htmlFor="comment" className="sr-only">
                          Your comment
                        </label>
                        <textarea
                          id="comment"
                          rows="2"
                          name="prompts"
                          className={`${image ? "max-w-[80%]" : "w-full"} w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0`}
                          placeholder="Cari apapun di CiniAI ^_^"
                          required
                        ></textarea>
                        {image && (
                          <span className="absolute bottom-4 right-4 rounded bg-gray-300 p-1">
                            <img
                              src={image}
                              alt="Preview"
                              className=" h-11 w-11"
                            />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between border-t px-3 py-2 ">
                        <Tooltip label="Send Message" hasArrow fontSize={11}>
                          <button
                            type="submit"
                            className="flex items-center gap-1 rounded-md bg-neutral-200 px-4 py-2.5 font-medium"
                          >
                            <SparklesIcon className="h-5 w-5 text-primary-700" />
                            Go
                          </button>
                        </Tooltip>
                        <div className="flex space-x-1 ps-0 sm:ps-2 rtl:space-x-reverse">
                          <Tooltip label="Reset Chat" hasArrow fontSize={11}>
                            <button
                              onClick={handleResetChat}
                              disabled={histories.length === 0 && true}
                              className={`flex items-center rounded bg-white p-3 hover:bg-gray-100 hover:text-gray-900 focus:animate-spin md:p-4 ${
                                histories.length === 0 && "opacity-65"
                              }`}
                            >
                              <ArrowPathIcon className="h-5 w-5 text-gray-800 focus:animate-spin" />
                            </button>
                          </Tooltip>
                          <Tooltip label="Upload Image" hasArrow fontSize={11}>
                            <label
                              htmlFor="image"
                              className="inline-flex cursor-pointer items-center justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            >
                              <PhotoIcon className="h-5 w-5" />
                              <input
                                type="file"
                                id="image"
                                hidden
                                name="image"
                                onChange={handleUploadImage}
                                className="sr-only"
                              />
                            </label>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </Popover>
      </section>
      <PreviewImg previewData={previewData} setPreviewData={setPreviewData} />
    </>
  );
};

export default BubbleChatAI;
