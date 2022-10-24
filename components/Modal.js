import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  onSnapshot,
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import { EmojiHappyIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Moment from "react-moment";
import Image from "next/image";
import { async } from "@firebase/util";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function Modal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const router = useRouter();
  const [showEmojis, setShowEmojis] = useState(false);

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );
  //dont want page to refault
  const sendComment = async (e) => {
    e.preventDefault();

    //Adding into a collection
    const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
      comment: comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      id: session.user.uid,
      timestamp: serverTimestamp(),
    });

    //after addding it successfuly we want to make sure it is set to false

    setIsOpen(false);
    setComment("");

    router.push(`/${postId}`);
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(comment + emoji);
  };

  return (
    // All of this is from Headless UI
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsOpen}>
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-gray-900 rounded-2xl 
            text-left overflow-hidden shadow-xl transform transition-all 
            sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
            >
              {/* this div will be the top part of the modal */}
              <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  // we implement this so its functionality is global
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className="h-[22px] text-white" />
                </div>
              </div>
              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="text-[#6e767d] flex gap-x-3 relative">
                    <span
                      className="w-0.5 h-full z-[-1] absolute 
                        left-5 top-11 bg-gray-600"
                    />
                    <div className="relative h-11 w-11 rounded-full mr-4">
                      <Image
                        src={post?.userImg}
                        layout="fill"
                        className="rounded-full"
                        objectFit="fill"
                      />
                    </div>
                    <div>
                      <div className="inline-block group">
                        <h4
                          className="font-bold text-[15px] 
                sm:text-base text-[#d9d9d9] inline-block"
                        >
                          {post?.username}
                        </h4>
                        <span className="ml-1.5 text-sm sm:text-[15px]">
                          @{post?.tag}
                        </span>
                      </div>{" "}
                      ·{" "}
                      <span className="hover:underline text-sm sm:text-[15px]">
                        {/* time management library */}
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                      </span>
                      <p className="text-[#d9d9d9] text-[15px] sm:text-base">
                        {post?.text}
                      </p>
                    </div>
                  </div>
                  <div className="mt-7 flex space-x-3 w-full">
                    <div className="relative h-11 w-11 rounded-full mr-4">
                      {/* pfp of logged in user */}
                      <Image
                        src={session?.user?.image}
                        layout="fill"
                        className="rounded-full"
                        objectFit="fill"
                      />
                    </div>
                    {/* this will be for the text input area */}
                    <div className="flex-grow mt-2">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tweet your reply"
                        rows="2"
                        className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                      />

                      {/* Icons at the bottom of modal */}
                      <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                          {/* Adding the emoji picker to the replies */}
                          <div
                            className="icon"
                            onClick={() => setShowEmojis(!showEmojis)}
                          >
                            <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>
                          <div className="border-r-10 max-w-10 mt-0">
                            {showEmojis && (
                              
                              <Picker
                                data={data}
                                onEmojiSelect={addEmoji}
                                theme="dark"
                              />
                            )}
                          </div>
                        </div>
                        <button
                          className="bg-black text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-gray disabled:hover:bg-gray disabled:opacity-50 disabled:cursor-default"
                          type="submit"
                          onClick={sendComment}
                          disabled={!comment.trim()}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
