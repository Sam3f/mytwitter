import {DotsHorizontalIcon, HeartIcon } from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/solid";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../firebase";

// added this comment too

function Comment({ id, comment }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);



  useEffect(
    () =>
      onSnapshot(collection(db, "comments", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );
  // Whether setLiked should be true or false, if it is true, it will delete the doc, else it wont
  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );
  //fucntions to control the likes
  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "comments", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "comments", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };



  return (
    <div
      className="p-3 flex cursor-pointer 
    border-b border-gray-700"
    >
      <div className="relative h-11 w-11 rounded-full mr-4">
        <Image
          src={comment?.userImg}
          layout="fill"
          className="rounded-full"
          objectFit="fill"
        />
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                {comment?.username}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]">
                @{comment?.tag}{" "}
              </span>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="text-[#d9d9d9] mt-0.5 max-w-lg text-[15px] sm:text-base">
              {comment?.comment}
            </p>
          </div>
          <div className="icon group flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        <div className="text-[#6e767d] flex justify-between w-10/12">

        <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {/* if likes is greater than 0 then display likes */}
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Comment;


